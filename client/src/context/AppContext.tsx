import { Ticket, User } from '@acme/shared-models';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import apiClient from '../api/apiConfig';
import ticketApi from '../api/ticket';
import userApi from '../api/user';
import axios, { AxiosResponse } from 'axios';

type Error = null | string;
enum ApiStatus {
    SUCCESS = 'Success',
    FAILURE = 'Failure',
    NONE = 'None',
}
interface AppContextType {
    tickets: Ticket[];
    setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
    updateTicket: (ticketId: number, field: keyof Ticket, value: Ticket[keyof Ticket]) => void;
    createTicket: (ticket: Ticket) => void;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    isLoading: boolean;
    status: ApiStatus;
    apiRequest: (request: Promise<AxiosResponse<any, any>>) => Promise<any>;

}

const AppContext = createContext<AppContextType>({
    tickets: [],
    setTickets: () => { },
    updateTicket: () => { },
    createTicket: () => { },
    users: [],
    setUsers: () => { },
    isLoading: false,
    status: ApiStatus.NONE,
    apiRequest: () => new Promise((resolve) => resolve(null)),
});

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<ApiStatus>(ApiStatus.NONE);

    const updateTicket = (ticketId: number, field: keyof Ticket, value: Ticket[keyof Ticket]) => {
        const localTickets = [...tickets];
        const index = tickets.findIndex((ticket) => ticket.id === ticketId);
        localTickets[index] = { ...localTickets[index], [field]: value };
        setTickets(localTickets)
    }

    const createTicket = (ticket: Ticket) => {
        setTickets(tickets.concat(ticket));
    }

    const apiRequest = async (request: Promise<AxiosResponse<any, any>>) => {
        return new Promise(async (resolve, reject) => {
            setIsLoading(true);
            try {
                const response = await request;
                resolve(response.data);
            } catch (error) {
                reject(error);
            } finally {
                setIsLoading(false);
            }
        })
    };

    useEffect(() => {
        const responseInterceptor = // Intercepting responses
            apiClient.interceptors.response.use(
                (response) => {
                    return response;
                },
                (error) => {
                    setStatus(ApiStatus.FAILURE);
                    setTimeout(() => setStatus(ApiStatus.NONE), 3000)
                    // Handle response errors globally
                    if (error.response) {
                        // Server responded with a status code other than 2xx
                        console.error('Response error:', error.response.status, error.response.data);
                        if (error.response.status === 401) {
                            // Handle unauthorized errors (e.g., redirect to login)
                        } else if (error.response.status === 500) {
                            // Handle server errors
                        }
                    } else if (error.request) {
                        // No response was received from server
                        console.error('No response received:', error.request);
                    } else {
                        // Other errors (e.g., configuration)
                        console.error('Error:', error.message);
                    }

                    return Promise.reject(error);
                })

        return () => {
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const tickets = await apiRequest(ticketApi.getList());
                setTickets(tickets as Ticket[]);
                const users = await apiRequest(userApi.getList());
                setUsers(users as User[]);
            } catch (error) {
                console.error(error)
            }
        })()
    }, []);


    return (
        <AppContext.Provider value={{ tickets, setTickets, updateTicket, createTicket, users, setUsers, isLoading, status, apiRequest }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};

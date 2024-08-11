import apiClient from "./apiConfig";

async function getList() {
    return apiClient.get('/tickets');
}

async function create(description: string) {
    return apiClient.post('/tickets', {
        description: description
    })
}

async function setComplete(ticketId: number) {
    return apiClient.put(`/tickets/${ticketId}/complete`)
}

async function setIncomplete(ticketId: number) {
    return apiClient.delete(`/tickets/${ticketId}/complete`)
}

async function assignUser(ticketId: number, assigneeId: number) {
    return apiClient.put(`/tickets/${ticketId}/assign/${assigneeId}`);
}
async function unassignUser(ticketId: number) {
    return apiClient.put(`/tickets/${ticketId}/unassign`);
}
const ticketApi = { getList, create, setComplete, setIncomplete, assignUser, unassignUser };

export default ticketApi;
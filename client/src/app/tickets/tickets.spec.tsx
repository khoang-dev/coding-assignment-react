import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Tickets from './Tickets';
import { useAppContext } from 'client/src/context/AppContext';
import { Ticket, User } from '@acme/shared-models';
import userEvent from '@testing-library/user-event';

// Mock the useAppContext hook
jest.mock('client/src/context/AppContext', () => ({
  useAppContext: jest.fn(),
}));

const mockTickets: Ticket[] = [
  { id: 1, description: 'Ticket 1', completed: false, assigneeId: 1 },
  { id: 2, description: 'Ticket 2', completed: true, assigneeId: null },
];

const mockUsers: User[] = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

describe('Tickets Component', () => {
  const apiRequestMock = jest.fn();
  const updateTicketMock = jest.fn();
  const createTicketMock = jest.fn();

  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      tickets: mockTickets,
      users: mockUsers,
      apiRequest: apiRequestMock,
      updateTicket: updateTicketMock,
      createTicket: createTicketMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Tickets component correctly', () => {
    render(<Tickets />);
    expect(screen.getByText(/Tickets/i)).toBeInTheDocument();
    expect(screen.getByText(/Ticket 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Ticket 2/i)).toBeInTheDocument();
  });


  test('changes ticket status correctly', async () => {
    render(<Tickets />);

    fireEvent.click(screen.getByRole('button', { name: /Not complete/i }));

    await waitFor(() => expect(apiRequestMock).toHaveBeenCalledWith(expect.any(Promise)));
    expect(updateTicketMock).toHaveBeenCalledWith(1, 'completed', true);
  });


  test('creates a new ticket correctly', async () => {
    render(<Tickets />);

    userEvent.type(screen.getByLabelText(/Please entry a new ticket/i), 'New Ticket');

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => expect(apiRequestMock).toHaveBeenCalledWith(expect.any(Promise)));
    expect(createTicketMock).toHaveBeenCalled();
  });
});

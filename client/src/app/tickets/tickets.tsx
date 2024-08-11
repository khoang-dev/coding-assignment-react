import { Option, Ticket, User } from '@acme/shared-models';
import styles from './tickets.module.css';
import SelectSmall from './select/SelectSmall';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppContext } from 'client/src/context/AppContext';
import Status from './status/Status';
import ticketApi from 'client/src/api/ticket';

export interface TicketsProps {
  tickets: Ticket[];
}
export const UNASSIGNED: User = Object.freeze({
  id: -1,
  name: 'Unassigned',
});
const FILTER_OPTIONS = Object.freeze([
  { id: 0, name: 'Not complete' },
  { id: 1, name: 'Completed' },
  { id: 2, name: 'All' },
]);

export function Tickets() {
  const [filterOption, setFilterOption] = useState<Option>(FILTER_OPTIONS[2]);
  const [showTickets, setShowTickets] = useState<Ticket[]>();
  const [inputValue, setInputValue] = useState<string>('');
  const { tickets, users, apiRequest, updateTicket, createTicket } = useAppContext()

  useEffect(() => {
    if (filterOption.id === FILTER_OPTIONS[2].id)
      setShowTickets(tickets)
    else {
      setShowTickets(tickets.filter((ticket) => ticket.completed === (filterOption.id === FILTER_OPTIONS[1].id)))
    }
  }, [filterOption, tickets])

  async function changeStatus(ticketId: number, completed: boolean) {
    try {
      if (!completed)
        await apiRequest(ticketApi.setComplete(ticketId));
      else await apiRequest(ticketApi.setIncomplete(ticketId));
      updateTicket(ticketId, 'completed', !completed)
    } catch (error) {
      console.error(error)
    }

  }

  async function changeAssignee(ticketId: number, assigneeId: number) {
    try {
      if (assigneeId === UNASSIGNED.id) {
        await apiRequest(ticketApi.unassignUser(ticketId));
        updateTicket(ticketId, 'assigneeId', null)
      }
      else {
        await apiRequest(ticketApi.assignUser(ticketId, assigneeId));
        updateTicket(ticketId, 'assigneeId', assigneeId)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function createNewTicket(description: string) {
    try {
      const ticket = await apiRequest(ticketApi.create(description));
      createTicket(ticket);
    } catch (error) {
      console.error(error)
    }
  }
  const ticketList = useMemo(() => {
    return <React.Fragment>
      {showTickets?.length && <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {showTickets.map((ticket, index) => (
          <React.Fragment key={ticket.id}>
            <ListItem
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Link href={`/${ticket.id}`}>
                {ticket.id}: {ticket.description}
              </Link>
              <Status completed={ticket.completed} onChange={() => changeStatus(ticket.id, ticket.completed)}></Status>
              <SelectSmall
                label="Assignee"
                value={
                  users.find(
                    ({ id }) => id === ticket.assigneeId
                  ) || UNASSIGNED
                }
                list={[UNASSIGNED].concat(users)}
                onChange={(data) => changeAssignee(ticket.id, Number(data.id))}
              />
            </ListItem>
            {index !== tickets.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List> || <div style={{ textAlign: 'center' }}>No Data</div>}
    </React.Fragment>

  }, [users, showTickets])
  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      <React.Fragment>
        <div className={styles['bar']}>
          <SelectSmall
            label="Filter"
            value={filterOption}
            list={[...FILTER_OPTIONS]}
            onChange={setFilterOption}
          />
          <div>
            <TextField
              id="filled-multiline-flexible"
              label="Please entry a new ticket"
              maxRows={4}
              size="small"
              className=''
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => createNewTicket(inputValue)}>
              <SendIcon />
            </IconButton>
          </div>

        </div>
        {ticketList}
      </React.Fragment>
    </div>
  );
}

export default Tickets;

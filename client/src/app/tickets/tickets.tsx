import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';
import SelectSmall, { Option } from './select/SelectSmall';
import React, { useState } from 'react';
import {
  Chip,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export interface TicketsProps {
  tickets: Ticket[];
}
const FILTER_OPTIONS = [
  { id: '0', name: 'Not complete' },
  { id: '1', name: 'Completed' },
  { id: '2', name: 'All' },
];
const list: Option[] = [
  {
    id: 'none',
    name: 'None',
  },
  {
    id: '1',
    name: 'Alice',
  },
  {
    id: '2',
    name: 'Bob',
  },
  {
    id: '3',
    name: 'Chris',
  },
  {
    id: '4',
    name: 'Daisy',
  },
  {
    id: '5',
    name: 'Ed',
  },
];
export function Tickets(props: TicketsProps) {
  const [assignee, setAssignee] = useState<Option>(list[0]);
  const [filterOption, setFilterOption] = useState<Option>(FILTER_OPTIONS[2]);
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      {props.tickets ? (
        <React.Fragment>
          <div className={styles['bar']}>
            <SelectSmall
              label="Filter"
              value={filterOption}
              list={FILTER_OPTIONS}
              onChange={setFilterOption}
            />
            <div>
              <TextField
                id="filled-multiline-flexible"
                label="Please entry a new ticket"
                maxRows={4}
                // variant="filled"
                size="small"
                className=''
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SendIcon />
              </IconButton>
            </div>

          </div>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {props.tickets.map((ticket, index) => (
              <React.Fragment>
                <ListItem
                  alignItems="center"
                  key={ticket.id}
                  sx={{ width: '100%' }}
                >
                  <Link href={`/${ticket.id}`}>
                    {ticket.id}: {ticket.description}
                  </Link>
                  <Chip
                    style={{ marginLeft: 'auto' }}
                    {...(ticket.completed
                      ? { color: 'success', label: 'Completed' }
                      : { color: 'secondary', label: 'Not complete' })}
                      onClick={console.log} 
                  />
                  <SelectSmall
                    label="Assignee"
                    value={
                      list.find(
                        ({ id }) => id === ticket.assigneeId?.toString()
                      ) || list[0]
                    }
                    list={list}
                    onChange={setAssignee}
                  />
                </ListItem>
                {index !== props.tickets.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </React.Fragment>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;

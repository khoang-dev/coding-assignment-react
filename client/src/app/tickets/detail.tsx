import { Ticket } from '@acme/shared-models';
import { List, ListItem } from '@mui/material';
import { useAppContext } from 'client/src/context/AppContext';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { UNASSIGNED } from './tickets';
import Status from './status/Status';

export interface Option {
  id: string;
  name: string;
}
interface Props {
  label: string;
  value: Option;
  list: Option[];
  onChange: (data: Option) => void;
}


export default function Detail({ }) {
  //   const [age, setAge] = React.useState('');
  const { id } = useParams<{ id: string }>();
  const { tickets, users } = useAppContext()
  return (
    (() => {
      const ticket = tickets.find((ticket) => String(ticket.id) === id);
      return <React.Fragment>
        {ticket &&
          <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
            <ListItem alignItems="center" key="id" sx={{ width: '100%', justifyContent: 'space-between' }}>
              <div> Id </div> <div> {ticket.id}</div>
            </ListItem>
            <ListItem alignItems="center" key="description" sx={{ width: '100%', justifyContent: 'space-between' }}>
              <div> Description </div> <div> {ticket.description}</div>
            </ListItem>
            <ListItem alignItems="center" key="status" sx={{ width: '100%', justifyContent: 'space-between' }}>
              <div> Status </div> <div> <Status completed={ticket.completed} ></Status></div>
            </ListItem>
            <ListItem alignItems="center" key="assignee" sx={{ width: '100%', justifyContent: 'space-between' }}>
              <div> Assignee </div> <div> {users.find((user) => user.id === ticket.assigneeId)?.name || UNASSIGNED.name}</div>
            </ListItem>
          </List> || <div style={{ textAlign: 'center' }}>No Data</div>}
      </React.Fragment>
    })()

  );
}

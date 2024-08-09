import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { List, ListItem } from '@mui/material';

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


export default function Detail({}) {
  //   const [age, setAge] = React.useState('');


  return (
    <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
      <ListItem alignItems="center" key="id" sx={{ width: '100%', justifyContent: 'space-between' }}>
        <div> id </div> <div> 1</div>
      </ListItem>
      <ListItem alignItems="center" key="id" sx={{ width: '100%', justifyContent: 'space-between' }}>
        <div> id </div> <div> 1</div>
      </ListItem>
      <ListItem alignItems="center" key="id" sx={{ width: '100%', justifyContent: 'space-between' }}>
        <div> id </div> <div> 1</div>
      </ListItem>
      <ListItem alignItems="center" key="id" sx={{ width: '100%', justifyContent: 'space-between' }}>
        <div> id </div> <div> 1</div>
      </ListItem>
    </List>
  );
}

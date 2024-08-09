import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

export default function SelectSmall({ label, value, list, onChange }: Props) {
  //   const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    onChange(list.find(({id})=> id === event.target.value) as Option);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value.id}
        label={label}
        onChange={handleChange}
      >
        {list.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

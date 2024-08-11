import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Option } from '@acme/shared-models';

interface Props {
  label: string;
  value: Option;
  list: Option[];
  onChange: (data: Option) => void;
}

export default function SelectSmall({ label, value, list, onChange }: Props) {
  //   const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    onChange(list.find(({id})=> id === Number(event.target.value)) as Option);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={String(value.id)}
        label={label}
        onChange={handleChange}
      >
        {list.map(({ id, name }) => (
          <MenuItem key={id} value={String(id)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

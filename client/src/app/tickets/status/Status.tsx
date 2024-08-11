import React from 'react';
import styles from './NewComponent.module.css'; // Nếu bạn sử dụng CSS module
import { Chip } from '@mui/material';

interface Props {
    completed: boolean,
    onChange?: ()=> void; 
}
const Status: React.FC<Props> = ({completed, onChange}) => {
  return (
    <Chip
    style={{ marginLeft: 'auto' }}
    {...(completed
      ? { color: 'success', label: 'Completed' }
      : { color: 'secondary', label: 'Not complete' })}
    onClick={onChange}
  />
  );
};

export default Status;

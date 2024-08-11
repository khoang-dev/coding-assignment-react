import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { useAppContext } from 'client/src/context/AppContext';
import React from 'react';

enum ApiStatus {
  SUCCESS = 'Success',
  FAILURE = 'Failure',
  NONE = 'None',
}
export const ApiHandler: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const {status, isLoading} = useAppContext();

    return (<div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      {
        status === ApiStatus.SUCCESS &&
        <Alert severity="success" style={{ position: 'absolute' }}>
          <AlertTitle>Success</AlertTitle>
          Request Done
        </Alert>
      }
      {
        status === ApiStatus.FAILURE &&
        <Alert severity="error" style={{ position: 'absolute' }}>
          <AlertTitle>Failure</AlertTitle>
          Request Failed
        </Alert>
      }
      {isLoading && <CircularProgress color="inherit" style={{ position: 'absolute' }}/>}
      </div>
      {children}</div>)
  }
  
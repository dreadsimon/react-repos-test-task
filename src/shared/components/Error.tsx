import React, { FC } from 'react';
import { Alert, Box } from '@mui/material';
import { ErrorAlertProps } from '../models/ui';

export const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => (
  <Box>
    <Alert severity="error">
      {error.name}: {error.message}
    </Alert>
  </Box>
);

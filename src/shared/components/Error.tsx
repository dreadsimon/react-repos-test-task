import React, { FC } from 'react';
import { Alert, Box } from '@mui/material';
import { ErrorAlertProps } from '../models/ui';

export const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => (
  <Box>
    <Alert severity="error" data-test-id="error-message">
      {error.name}: {error.message}
    </Alert>
  </Box>
);

import React, { FC } from 'react';
import { Backdrop, CircularProgress, Theme } from '@mui/material';
import { LoaderProps } from '..';

export const Loader: FC<LoaderProps> = ({ isLoading }) => (
  <Backdrop
    sx={{
      zIndex: (theme: Theme) => theme.zIndex.drawer + 1
    }}
    open={isLoading}
  >
    <CircularProgress
      color="inherit"
      role="alert"
      aria-busy="true"
      data-testid="loading-progress"
    />
  </Backdrop>
);

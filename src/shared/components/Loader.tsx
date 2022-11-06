import React, { FC } from 'react';
import { Backdrop, CircularProgress, Theme } from '@mui/material';
import { LoaderProps } from '..';

export const Loader: FC<LoaderProps> = ({ isLoading }) => (
  <Backdrop
    sx={{
      color: '#fff',
      zIndex: (theme: Theme) => theme.zIndex.drawer + 1
    }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { GET_REPOSITORIES } from '../services/queries';
import { DEFAULT_GET_REPOSITORIES_VARIABLES } from '../services/constants';
import { Loader } from '../../shared';

export const Repos: FC = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: { ...DEFAULT_GET_REPOSITORIES_VARIABLES }
  });
  console.log({ data });
  return (
    <Box>
      <Loader isLoading={loading} />
    </Box>
  );
};

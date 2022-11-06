import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { GET_REPOSITORIES } from '../services/queries';
import {
  DEFAULT_GET_REPOSITORIES_VARIABLES,
  DEFAULT_SEARCH_QUERY,
  PUBLIC_REPO_PREFIX
} from '../services/constants';
import { Loader } from '../../shared';
import { List } from './List';
import { PaginationQuery, UpdateParams } from '../models/query';
import { ReposList } from '../models';

export const Repos: FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { loading, data, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { ...DEFAULT_GET_REPOSITORIES_VARIABLES }
  });

  const updateQuery = (
    previousResult: ReposList,
    config: { fetchMoreResult: ReposList }
  ): ReposList => {
    setIsUpdating(false);
    if (!config.fetchMoreResult) {
      return previousResult;
    }

    return { ...config.fetchMoreResult };
  };

  const handleUpdate = (params: Partial<UpdateParams>) => {
    setIsUpdating(true);
    return fetchMore({
      updateQuery,
      variables: {
        ...DEFAULT_GET_REPOSITORIES_VARIABLES,
        search: `${PUBLIC_REPO_PREFIX} ${DEFAULT_SEARCH_QUERY}`,
        ...params
      }
    });
  };

  const handlePagination = (paginationQuery: PaginationQuery) => {
    handleUpdate(paginationQuery);
  };

  return (
    <Box>
      <Loader isLoading={loading || isUpdating} />
      {data && <List data={data} onPaginationChange={handlePagination} />}
    </Box>
  );
};

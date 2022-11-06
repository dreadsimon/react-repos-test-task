import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import {
  GET_REPOSITORIES,
  DEFAULT_GET_REPOSITORIES_VARIABLES,
  DEFAULT_SEARCH_QUERY,
  PUBLIC_REPO_PREFIX
} from '../services';
import { Loader } from '../../shared';
import { List } from './List';
import { ReposList, PaginationQuery, UpdateParams, SearchQuery } from '../models';
import Search from './Search';

export const Repos: FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [shouldResetPage, setShouldResetPage] = useState(false);
  const [searchphrase, setSearchphrase] = useState(DEFAULT_SEARCH_QUERY);

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
        search: `${PUBLIC_REPO_PREFIX} ${searchphrase}`,
        ...params
      }
    });
  };

  const handleSearch = (searchQuery: SearchQuery) => {
    setSearchphrase(searchQuery.search);
    setShouldResetPage(true);
    handleUpdate(searchQuery);
  };

  const handlePagination = (paginationQuery: PaginationQuery) => {
    setShouldResetPage(false);
    handleUpdate(paginationQuery);
  };

  return (
    <Box>
      <Loader isLoading={loading || isUpdating} />
      <Search onSearchChange={handleSearch} />
      {data && (
        <List data={data} shouldResetPage={shouldResetPage} onPaginationChange={handlePagination} />
      )}
    </Box>
  );
};

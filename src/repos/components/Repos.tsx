import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import {
  GET_REPOSITORIES,
  DEFAULT_GET_REPOSITORIES_VARIABLES,
  DEFAULT_SEARCH_QUERY,
  PUBLIC_REPO_PREFIX,
  DEFAULT_ROWS_PER_PAGE
} from '../services';
import { ReposList, UpdateParams, SearchQuery } from '../models';
import { Loader, ErrorAlert } from '../../shared';
import { MemoizedList } from './List';
import { Search } from './Search';

export const Repos: FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [searchphrase, setSearchphrase] = useState(DEFAULT_SEARCH_QUERY);

  const { loading, data, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
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
    fetchMore({
      updateQuery,
      variables: {
        ...DEFAULT_GET_REPOSITORIES_VARIABLES,
        search: `${PUBLIC_REPO_PREFIX} ${searchphrase}`,
        ...params
      }
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nonEmptyPhrase = event.target.value || DEFAULT_SEARCH_QUERY;
    const searchQuery: SearchQuery = {
      search: `${PUBLIC_REPO_PREFIX}${nonEmptyPhrase}`
    };
    setSearchphrase(searchQuery.search);
    setPage(0);
    handleUpdate(searchQuery);
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const { startCursor, endCursor } = data.search.pageInfo;
    const paginationQuery =
      newPage > page
        ? { after: endCursor, last: pageSize }
        : { before: startCursor, last: pageSize };
    handleUpdate(paginationQuery);
    setPage(newPage);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setPageSize(newRowsPerPage);
    setPage(0);
    handleUpdate({
      after: null,
      before: null,
      last: newRowsPerPage
    });
  };

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <Box>
      <Loader isLoading={loading || isUpdating} />
      <Search onSearchChange={handleSearch} />
      {data && (
        <MemoizedList
          data={data}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </Box>
  );
};

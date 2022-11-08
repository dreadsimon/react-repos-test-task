import React, { FC, useMemo } from 'react';
import { debounce, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchProps } from '../models';

export const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const debouncedChangeHandler = useMemo(() => debounce(onSearchChange, 500), [onSearchChange]);

  return (
    <TextField
      data-testid="search-field"
      label="Search for"
      variant="outlined"
      margin="normal"
      onChange={debouncedChangeHandler}
      InputProps={{
        startAdornment: <SearchIcon />
      }}
    />
  );
};

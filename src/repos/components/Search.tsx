import React, { FC, useCallback, useEffect, useState } from 'react';
import { debounce, IconButton, InputAdornment, TextField } from '@mui/material';
import { Clear } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { DEFAULT_SEARCH_QUERY, PUBLIC_REPO_PREFIX } from '../services/constants';
import { SearchProps, SearchQuery } from '../models';

export const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const [searchphrase, setSearchphrase] = useState('');

  const update = (phrase: string) => {
    const nonEmptyPhrase = phrase || DEFAULT_SEARCH_QUERY;
    const searchQuery: SearchQuery = {
      search: `${PUBLIC_REPO_PREFIX} ${nonEmptyPhrase} `
    };
    onSearchChange(searchQuery);
  };

  const debouncedResults = useCallback(debounce(update, 500), []);

  useEffect(() => {
    debouncedResults(searchphrase);
    return () => {
      debouncedResults.clear();
    };
  }, [searchphrase, debouncedResults]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchphrase(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchphrase('');
  };

  return (
    <TextField
      data-testid="search-field"
      label="Search for"
      variant="outlined"
      margin="normal"
      value={searchphrase}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: <SearchIcon />,
        endAdornment: searchphrase && (
          <InputAdornment position="end">
            <IconButton aria-label="Clear search results" onClick={handleClearSearch} edge="end">
              <Clear />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

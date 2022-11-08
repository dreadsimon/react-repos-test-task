export const PUBLIC_REPO_PREFIX = 'is:public ';
export const DEFAULT_SEARCH_QUERY = 'react';
export const DEFAULT_ROWS_PER_PAGE = 10;

export const DEFAULT_GET_REPOSITORIES_VARIABLES = {
  before: null,
  after: null,
  last: 10,
  search: `${PUBLIC_REPO_PREFIX}${DEFAULT_SEARCH_QUERY}`
};

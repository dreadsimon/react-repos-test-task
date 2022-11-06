/* eslint-disable no-unused-vars */
import { PaginationQuery, SearchQuery } from './query';
import { ReposList } from './repos-list';

export interface ListProps {
  data: ReposList;
  shouldResetPage: boolean;
  onPaginationChange: (arg: PaginationQuery) => void;
}

export interface SearchProps {
  onSearchChange: (arg: SearchQuery) => void;
}

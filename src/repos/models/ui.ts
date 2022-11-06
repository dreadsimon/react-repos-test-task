/* eslint-disable no-unused-vars */
import { PaginationQuery } from './query';
import { ReposList } from './repos-list';

export interface ListProps {
  data: ReposList;
  onPaginationChange: (arg: PaginationQuery) => void;
}

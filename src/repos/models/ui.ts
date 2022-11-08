import React from 'react';
import { ReposList } from './repos-list';

export interface ListProps {
  data: ReposList;
  page: number;
  pageSize: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onPageSizeChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface SearchProps {
  onSearchChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
}

export type PaginationQuery = {
  last: number;
  after?: string | null;
  before?: string | null;
};

export type SearchQuery = {
  search: string;
};

export type UpdateParams = SearchQuery & PaginationQuery;

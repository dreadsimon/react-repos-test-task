export type Repo = {
  id: number;
  name: string;
  forkCount: number;
  stargazerCount: number;
  url: string;
};

export type Page = {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
};

export type ReposList = {
  search: {
    nodes: Repo[];
    pageInfo: Page;
  };
};

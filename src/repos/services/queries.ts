import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepos($after: String, $before: String, $last: Int = 10, $search: String!) {
    search(query: $search, type: REPOSITORY, last: $last, before: $before, after: $after) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          forkCount
          stargazerCount
          url
        }
      }
      pageInfo {
        endCursor
        startCursor
      }
    }
  }
`;

import { GraphQLError } from 'graphql';
import { GET_REPOSITORIES } from '../repos';

export const reposResEmptyMock = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: { last: 10, before: null, after: null, search: 'is:public  react' }
    },
    result: {
      data: {
        search: {
          pageInfo: {
            endCursor: null,
            startCursor: null
          },
          nodes: [],
          repositoryCount: 0
        }
      }
    }
  }
];

export const reposResMock = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: { last: 10, before: null, after: null, search: 'is:public  react' }
    },
    result: {
      data: {
        search: {
          pageInfo: {
            endCursor: 'Y3Vyc29yOjUw',
            startCursor: 'Y3Vyc29yOjE='
          },
          nodes: [
            {
              id: 'abcd',
              name: 'test1',
              forkCount: 30,
              stargazerCount: 456,
              url: 'https://github.com/test1'
            },
            {
              id: 'edfg',
              name: 'test2',
              forkCount: 20,
              stargazerCount: 789,
              url: 'https://github.com/test2'
            },
            {
              id: 'hijk',
              name: 'test3',
              forkCount: 10,
              stargazerCount: 123,
              url: 'https://github.com/test3'
            }
          ],
          repositoryCount: 3
        }
      }
    }
  }
];

export const reposErrorMock = {
  request: {
    query: GET_REPOSITORIES,
    variables: { last: 10, before: null, after: null, search: 'is:public  react' }
  },
  result: {
    errors: [new GraphQLError('ERROR!')]
  }
};

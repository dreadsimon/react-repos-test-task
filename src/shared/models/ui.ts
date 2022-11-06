import { ApolloError } from '@apollo/client';

export interface LoaderProps {
  isLoading: boolean;
}

export interface ErrorAlertProps {
  error: ApolloError | Error;
}

import React, { FC, useEffect } from 'react';
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import { Repo } from '..';
import { DEFAULT_ROWS_PER_PAGE } from '../services';
import { ListProps } from '../models';
import {
  ListStyled,
  TableHeaderCellStyled,
  TableRowStyled,
  VerticalCenter
} from './StyledComponents';
import { NoResults } from './NoResults';

export const List: FC<ListProps> = ({ data, shouldResetPage, onPaginationChange }) => {
  const { nodes } = data.search;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    if (shouldResetPage) {
      setPage(0);
      setRowsPerPage(DEFAULT_ROWS_PER_PAGE);
    }
  }, [shouldResetPage]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const { startCursor, endCursor } = data.search.pageInfo;
    const paginationQuery =
      newPage > page
        ? { after: endCursor, last: rowsPerPage }
        : { before: startCursor, last: rowsPerPage };
    setPage(newPage);

    if (!paginationQuery) {
      return;
    }

    onPaginationChange(paginationQuery);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    onPaginationChange({
      after: null,
      before: null,
      last: newRowsPerPage
    });
  };

  const renderRow = (rowData: Repo) => (
    <TableRowStyled key={rowData.id}>
      <TableCell align="left">
        <Link href={rowData.url} target="_blank" rel="noopener">
          {rowData.name}
        </Link>
      </TableCell>
      <TableCell align="left">
        <VerticalCenter>
          <ForkRightIcon /> {rowData.forkCount}
        </VerticalCenter>
      </TableCell>
      <TableCell align="left">
        <VerticalCenter>
          <StarIcon /> {rowData.stargazerCount}
        </VerticalCenter>
      </TableCell>
    </TableRowStyled>
  );

  if (!nodes.length) {
    return <NoResults />;
  }

  return (
    <ListStyled>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableHeaderCellStyled>Repository</TableHeaderCellStyled>
              <TableHeaderCellStyled>Forked</TableHeaderCellStyled>
              <TableHeaderCellStyled>Stars</TableHeaderCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>{nodes.map(renderRow)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.search.repositoryCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ListStyled>
  );
};

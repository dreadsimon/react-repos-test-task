import React, { FC } from 'react';
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
import { DEFAULT_ROWS_PER_PAGE } from '../services/constants';
import { ListProps } from '../models/ui';
import { ListStyled, TableHeaderCellStyled, TableRowStyled } from './StyledComponents';

export const List: FC<ListProps> = ({ data, onPaginationChange }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  const renderRow = (rowData: Repo) => (
    <TableRowStyled key={rowData.id}>
      <TableCell align="left">
        <Link href={rowData.url} target="_blank" rel="noopener">
          {rowData.name}
        </Link>
      </TableCell>
      <TableCell align="left">
        <ForkRightIcon /> {rowData.forkCount}
      </TableCell>
      <TableCell align="left">
        <StarIcon /> {rowData.stargazerCount}
      </TableCell>
    </TableRowStyled>
  );

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
          <TableBody>{data.search.nodes.map(renderRow)}</TableBody>
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

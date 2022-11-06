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

const List: FC<ListProps> = ({ data, shouldResetPage, onPaginationChange }) => {
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
    <TableRowStyled role="row" key={`TableRow-${rowData.id}`}>
      <TableCell align="left" role="cell" key={`TableCell1-${rowData.id}`}>
        <Link href={rowData.url} target="_blank" rel="noopener">
          {rowData.name}
        </Link>
      </TableCell>
      <TableCell align="left" role="cell" key={`TableCell2-${rowData.id}`}>
        <VerticalCenter>
          <ForkRightIcon /> {rowData.forkCount}
        </VerticalCenter>
      </TableCell>
      <TableCell align="left" role="cell" key={`TableCell3-${rowData.id}`}>
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
        <Table
          aria-label="A table with the repositories list"
          role="table"
          aria-rowcount={rowsPerPage}
        >
          <TableHead>
            <TableRow key="TableRowHead">
              <TableHeaderCellStyled role="columnheader" key="HeadCell1">
                Repository
              </TableHeaderCellStyled>
              <TableHeaderCellStyled role="columnheader" key="HeadCell2">
                Forked
              </TableHeaderCellStyled>
              <TableHeaderCellStyled role="columnheader" key="HeadCell3">
                Stars
              </TableHeaderCellStyled>
            </TableRow>
          </TableHead>
          <TableBody key="TableBodyNodes">{nodes.map(renderRow)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.search.repositoryCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        role="navigation"
        data-testid="table-pagination"
        aria-label="Pagination Navigation"
      />
    </ListStyled>
  );
};

export const MemoizedList = React.memo(List);

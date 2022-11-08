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
import { ListProps } from '../models';
import {
  ListStyled,
  TableHeaderCellStyled,
  TableRowStyled,
  VerticalCenter
} from './StyledComponents';
import { NoResults } from './NoResults';

const List: FC<ListProps> = ({ data, page, pageSize, onPageChange, onPageSizeChange }) => {
  const { nodes } = data.search;

  const renderRow = (rowData: Repo) => {
    return (
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
  };

  if (!nodes.length) {
    return <NoResults />;
  }

  return (
    <ListStyled>
      <TableContainer component={Paper}>
        <Table
          aria-label="A table with the repositories list"
          role="table"
          aria-rowcount={pageSize}
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
        onPageChange={onPageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={onPageSizeChange}
        role="navigation"
        data-testid="table-pagination"
        aria-label="Pagination Navigation"
      />
    </ListStyled>
  );
};

export const MemoizedList = React.memo(List);

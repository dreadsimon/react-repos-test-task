import styled from '@emotion/styled';
import { List, TableCell, TableRow } from '@mui/material';

export const ListStyled = styled(List)`
  min-width: 350px;
`;

export const TableRowStyled = styled(TableRow)`
  &:last-child td, &:last-child th': { border: 0 } }}
`;

export const TableHeaderCellStyled = styled(TableCell)`
  font-weight: bold;
`;

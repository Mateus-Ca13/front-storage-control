import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useRef } from 'react'
import type { ColumnConfig } from '../../types/columnConfig';
import { theme } from '../../../theme/theme';



type ListingTableProps<T> = {
    items: T[];
    total: number;
    columns: ColumnConfig<T>[];
    rowKey: (row: T) => string | number;
    onRowClick?: (...args: any[]) => void;
    page: number;
    setPage: (number: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (number: number) => void
    height?: number | string;
    noPagination?: boolean;
}

export default function ListingTable<T>({items, total, columns, onRowClick, rowKey, page, setPage, rowsPerPage, setRowsPerPage, height, noPagination }: ListingTableProps<T>) {

    const rowsPerPageOptions = useRef([rowsPerPage, rowsPerPage * 2, rowsPerPage * 5, rowsPerPage * 10]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
      <TableContainer sx={{ height: height?? 610 /* Altura Padrão */ }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ?
             items.map((row) => {
                return (
                  <TableRow sx={{':hover': {cursor: 'pointer'}}} onClick={(e)=>onRowClick!(row)} hover role="checkbox" tabIndex={-1} key={rowKey(row)}>
                    {columns.map((column) => {
                      const value = row[column.key as keyof T];
                      return (
                        <TableCell key={String(column.key)} align={column.align}>
                          {column.format ? column.format(value, row) : (value as React.ReactNode)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }):
              <TableRow>
                <TableCell color='grey.300' colSpan={columns.length} align="center">
                  <em>Sem registros encontrados.</em>
                </TableCell>
              </TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
      {!noPagination ? <TablePagination sx={{ borderTop: `1px solid ${theme.palette.grey[300]}`}}
        labelRowsPerPage="Itens por página"
       labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
        }
        rowsPerPageOptions={rowsPerPageOptions.current}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> : <Box sx={{height: 48, borderTop: 1, borderColor: 'grey.300'}}/>
      }
    </Paper>

  )
}
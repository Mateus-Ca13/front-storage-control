import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React from 'react'
import type { ColumnConfig } from '../../types/columnConfig';



type ListingTableProps<T> = {
    items: T[];
    total: number;
    columns: ColumnConfig<T>[];
    rowKey: (row: T) => string | number; // 🔑 agora é função
    onRowClick?: (...args: any[]) => void;
    page: number;
    setPage: (number: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (number: number) => void
}

export default function ListingTable<T>({items, total, columns, onRowClick, rowKey, page, setPage, rowsPerPage, setRowsPerPage }: ListingTableProps<T>) {

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow onClick={(e )=>onRowClick!(row)} hover role="checkbox" tabIndex={-1} key={rowKey(row)}>
                    {columns.map((column) => {
                      const value = row[column.key];
                      return (
                        <TableCell key={String(column.key)} align={column.align}>
                          {column.format ? column.format(value, row) : (value as React.ReactNode)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Itens por página"
       labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
        }
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

  )
}
import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import type { ColumnConfig } from '../../types/columnConfig';
import { useSettingsStore } from '../../../features/settings/stores/SettingsStore';



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
    noRowsText?: string
    biggerText?: boolean;
    autoRoll?: boolean;
}

export default function ListingTable<T>({items, total, columns, onRowClick, rowKey, page, setPage, rowsPerPage, setRowsPerPage, height, autoRoll = false, noPagination, noRowsText, biggerText }: ListingTableProps<T>) {
    
    const theme = useTheme()
    const densetable = useSettingsStore((state) => state.denseTables);
    const rowsPerPageOptions = useRef([10, 20, 50, 100]);
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
      if (autoRoll && items.length > 0) {
        const tableContainer = tableContainerRef.current;
        if (tableContainer) {
          tableContainer.scrollTo({
            top: tableContainer.scrollHeight,
            behavior: 'smooth',
          });
        }
      }
    }, [items, autoRoll]);
             

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer ref={tableContainerRef} sx={{ height: height?? 600 /* Altura Padrão */ }}>
        <Table stickyHeader size={densetable? 'small' : 'medium'} aria-label="sticky table ">
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
                  <TableRow  sx={{':hover': {cursor: 'pointer',}}} onDoubleClick={(e)=>onRowClick!(row)} hover role="checkbox" tabIndex={-1} key={rowKey(row)}>
                    {columns.map((column) => {
                      const value = row[column.key as keyof T ];
                      return (
                        <TableCell sx={{ fontSize: biggerText? 22 : 15}} key={String(column.key)} align={column.align}>
                          {column.format ? column.format(value, row) : (value as React.ReactNode)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }):
              <TableRow>
                <TableCell sx={{ fontSize: biggerText? 22 : 15}} color='grey.300' colSpan={columns.length} align="center">
                  <em>{noRowsText?? 'Sem registros encontrados.'}</em>
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
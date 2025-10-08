
export interface ColumnConfig<T> {
  key: keyof T | string;
  header: string;
  align: 'left' | 'right' | 'center';
  minWidth?: number;
  format?: (value: T[keyof T], row?: T) => React.ReactNode;
}


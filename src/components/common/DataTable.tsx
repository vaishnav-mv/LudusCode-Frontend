import React from 'react';

export interface Column<T = any> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  keyExtractor?: (row: T) => string | number;
}

/**
 * Reusable data table component
 * Eliminates duplication across UsersList, PendingGroups, and MyGroups
 */
function DataTable<T = any>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  keyExtractor,
}: DataTableProps<T>) {
  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  };

  const getRowKey = (row: T, index: number): string | number => {
    if (keyExtractor) {
      return keyExtractor(row);
    }
    return (row as any).id || index;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-secondary">
        <thead className="bg-accent">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`text-left py-3 px-4 uppercase font-semibold text-sm ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-text-secondary">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-text-secondary"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                className="border-b border-gray-700 hover:bg-accent"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-3 px-4 ${column.className || ''}`}
                  >
                    {getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;

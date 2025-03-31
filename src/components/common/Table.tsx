import {
  Table as LibTable,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow
} from '@heroui/table'

const Table = (props: TableProps) => (
  <LibTable
    removeWrapper
    classNames={{
      th: 'text-base text-black'
    }}
    {...props}
  />
)

export { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow }

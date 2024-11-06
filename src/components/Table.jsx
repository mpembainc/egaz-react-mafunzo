import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const Table = ({ columns, data }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className='w-full border-collapse'>
      <thead className='text-left'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className='border-b' key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th className='py-3' key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className='border-b last:border-none' key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='py-3'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

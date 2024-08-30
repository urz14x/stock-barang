import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';
import { Button } from './ui/button';
import { Pencil, Trash } from 'lucide-react';
import { formatDate } from 'date-fns';
import { router } from '@inertiajs/react';
import Container from './Container';

export default function TableKeluar({ stockouts, params, setParams }) {
    console.log('stockouts ', stockouts)
  const deleteStockOut = (id) => {
    router.delete(`/stock-out/${id}`);
  };
  return (
    <>
    <Table className="border text-xs">
      <TableHeader className="bg-clr-secondary">
        <TableRow>
          <TableHead className="w-[100px]">Tanggal</TableHead>
          <TableHead>Nama barang</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Pelanggan</TableHead>
          <TableHead className="text-left">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stockouts.data.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell className="font-medium">
              {formatDate(new Date(stock.created_at), 'MM-dd-yyyy')}
            </TableCell>
            <TableCell>{stock.stocks_name}</TableCell>
            <TableCell>{stock.quantity}</TableCell>
            <TableCell>{stock.customer}</TableCell>
            <TableCell className="flex items-center gap-4">
              <Button className="flex items-center gap-2">
                <span>
                  <Pencil width={16} height={16} />
                </span>
                <span>Edit</span>
              </Button>
              <Button
                onClick={() => deleteStockOut(stock.id)}
                variant="ghost"
                className="flex items-center gap-2 text-red-500">
                <span>
                  <Trash width={16} height={16} />
                </span>
                <span>Hapus</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Container className=" relative bottom-0 flex flex-wrap items-center gap-2 w-full">
        {stockouts.meta.links.map((item) => (
          <Button
            variant="ghost"
            className={`${
              item.url == null
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-slate-800'
            } w-auto p-2 h-9 flex justify-center items-center border hover:bg-clr-primary transition-all rounded bg-white`}
            onClick={() =>
              setParams({
                ...params,
                page: new URL(item.url).searchParams.get('page'),
              })
            }>
            <span dangerouslySetInnerHTML={{ __html: item.label }} />
          </Button>
        ))}
      </Container>
    </>
  );
}

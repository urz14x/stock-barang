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

export default function TableKeluar({ stocks }) {
   const deleteStockOut = (id) => {
    router.delete(`/stock-out/${id}`);
   }
  return (
    <Table className="border ">
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
        {stocks.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell className="font-medium" >{formatDate(new Date(stock.created_at), "MM/dd/yyyy")}</TableCell>
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
  );
}

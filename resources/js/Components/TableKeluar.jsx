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
import { ArrowLeft, Pencil, Trash } from 'lucide-react';
import { formatDate } from 'date-fns';
import { router } from '@inertiajs/react';
import Container from './Container';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import SimplePagination from '@/Components/ui/pagination.jsx';

export default function TableKeluar({ stockouts, links, meta, params, setParams, }) {
  const deleteStockOut = (id) => {
    location.href = `/stock-out?start_date=${params.start_date}&end_date=${params.end_date}`;
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
        {stockouts.map((stock) => (
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
              <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-red-500">
                      <span>
                        <Trash width={16} height={16} />
                      </span>
                      <span>Hapus</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Apakah anda benar-benar ingin Menghapus stock
                        {stock.name}?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        <Button variant="ghost" className="w-full">
                          <div className="flex items-center gap-2 ">
                            <span>
                              <ArrowLeft width={17} height={17} />
                            </span>
                            <span>Kembali</span>
                          </div>
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          <Button
                            variant="ghost"
                            onClick={() => deleteStockOut(stock.id)}
                            className="flex items-center gap-2 text-red-500">
                            <span>
                              <Trash width={16} height={16} />
                            </span>
                            <span>Hapus saja</span>
                          </Button>
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        <Container>
            <SimplePagination links={links} meta={meta} />
        </Container>
    </>
  );
}

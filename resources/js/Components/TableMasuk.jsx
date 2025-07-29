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
import { ArrowLeft, PencilIcon, Trash } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import Container from './Container';
import { format, formatDate } from 'date-fns';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import SimplePagination from './ui/pagination';
export default function TableMasuk({
  stockins,
  links,
  meta,
  params,
  setParams,
}) {
  const deleteStockIn = (id) => {
    location.href = `/stock-in?start_date=${params.start_date}&end_date=${params.end_date}`;
    router.delete(`/stock-in/${id}`, {
        preserveScroll: true,
      });
  };
  return (
    <>
      <Table className="border text-xs">
        <TableHeader className="bg-clr-secondary">
          <TableRow>
            <TableHead className="w-[150px]">Tanggal Dibuat</TableHead>
            <TableHead>Tanggal Masuk</TableHead>
            <TableHead>Nama barang</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Sisa</TableHead>
            <TableHead className="text-left">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockins.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell className="font-medium">
                {formatDate(new Date(stock.created_at), 'MM/dd/yyyy')}
              </TableCell>
              <TableCell>
                {stock.input_date && !isNaN(new Date(stock.input_date))
                  ? format(new Date(stock.input_date), 'dd MMM yyyy')
                  : 'Tanggal tidak valid'}
              </TableCell>
              <TableCell>{stock.stocks_name}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell>{stock.remaining_quantity}</TableCell>
              <TableCell className="flex items-center gap-4">
                <Link href={`/stock-in-edit/${stock.id}`}>
                  <Button className="flex items-center gap-1">
                    <span>
                      <PencilIcon width={16} height={16} />
                    </span>
                    <span>Edit</span>
                  </Button>
                </Link>

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
                            onClick={() => deleteStockIn(stock.id)}
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
        {stockins.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center py-4 text-gray-500">
              Tidak ada data ditemukan.
            </td>
          </tr>
        )}
      </Table>

      <div className="flex justify-between w-full items-center px-4 py-2 font-semibold">
        <div>
          Halaman {meta?.current_page ?? 1} dari {meta?.last_page ?? 1}
        </div>
        <div className="flex gap-2">
          <Container>
            <SimplePagination links={links} meta={meta} />
          </Container>
        </div>
      </div>
    </>
  );
}

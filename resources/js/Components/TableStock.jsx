import React, { useEffect, useState } from 'react';
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
import { Link, router } from '@inertiajs/react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import Container from './Container';
import { formatDate } from 'date-fns';

export default function TableStock({ stocks, params, setParams }) {
  const deletePost = (id) => {
    router.delete(`/stock/${id}`);
  };
  return (
    <>
      <Table className="border bg-red-500h h-1/2 text-xs">
        <TableHeader className="bg-clr-secondary">
          <TableRow>
            <TableHead className="w-[100px]">Tanggal</TableHead>
            <TableHead>Nama barang</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-left">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.data.map((stock, i) => (
            <TableRow key={i+1}>
              <TableCell className="font-medium">{formatDate(new Date(stock.created_at), 'MM/dd/yyyy')}</TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell className="font-bold">{stock.stock}</TableCell>
              <TableCell className="flex items-center gap-4">
                <Link href={route('dashboard.edit', stock.id)}>
                  <Button className="flex items-center gap-2">
                    <span>
                      <Pencil width={16} height={16} />
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
                            onClick={() => deletePost(stock.id)}
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
      <Container className=" relative bottom-0 flex flex-wrap items-center gap-2 w-full">
        {stocks.meta.links.map((item) => (
          // <Link
          //     disabled={item.url === null ? true : false}
          //     as="button"
          //     className={`${
          //         item.url == null
          //             ? "text-gray-300 cursor-not-allowed"
          //             : "text-slate-800"
          //     } w-auto p-2 h-9 flex justify-center items-center border hover:bg-clr-primary transition-all rounded bg-white`}
          //     href={item.url || ""}
          //     dangerouslySetInnerHTML={{ __html: item.label }}
          // />
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
                <span dangerouslySetInnerHTML={{ __html:   item.label }} />

          </Button>
        ))}
      </Container>
    </>
  );
}

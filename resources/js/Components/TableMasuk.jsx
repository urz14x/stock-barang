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
import { PencilIcon, Trash } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import Container from './Container';
import { formatDate } from 'date-fns';
export default function TableMasuk({ stocks, params }) {
  console.table('test nya ', stocks);

  const deleteStockIn = (id) => {
    location.href = `/stock-in?start_date=${params.start_date}&end_date=${params.end_date}`;
    router.delete(`/stock-in/${id}`);
  };
  return (
    <>
      
      <Table className="border">
        <TableHeader className="bg-clr-secondary">
          <TableRow>
            <TableHead className="w-[150px]">Tanggal</TableHead>
            <TableHead>Nama barang</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead className="text-left">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell className="font-medium">
                {formatDate(new Date(stock.created_at), 'MM/dd/yyyy')}
              </TableCell>
              <TableCell>{stock.stocks_name}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell className="flex items-center gap-4">
                <Link href={`/stock-in-edit/${stock.id}`}>
                  <Button className="flex items-center gap-1">
                    <span>
                      <PencilIcon width={16} height={16} />
                    </span>
                    <span>Edit</span>
                  </Button>
                </Link>

                <Button
                  onClick={() => deleteStockIn(stock.id)}
                  variant="ghost"
                  className="flex items-center gap-1 text-red-500">
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
      {/* <Container className=" relative bottom-0 flex flex-wrap items-center gap-2 w-full">
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
            <span dangerouslySetInnerHTML={{ __html: item.label }} />
          </Button>
        ))}
      </Container> */}
    </>
  );
}

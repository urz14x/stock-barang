import React, { useState } from 'react';
import { Table, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Container from './Container';
import SimplePagination from './ui/pagination';
import { format } from 'date-fns';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog';
import { Trash, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function TableKeluar({
  stockouts,
  meta,
  links,
  params,
  setParams,
}) {
  const [detailModal, setDetailModal] = useState(false);
  const [stockOutDetails, setStockOutDetails] = useState([]);
  const [stockOutId, setStockOutId] = useState(null);

  const handleShowDetail = async (id) => {
    try {
      const response = await axios.get(`/stock-out/${id}`);
      setStockOutDetails(response.data.details);
      setStockOutId(id);
      setDetailModal(true);
    } catch (error) {
      console.error('Gagal memuat detail:', error);
    }
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      router.delete(`/stock-out/${id}`, {
        preserveScroll: true,
      });
    }
  };
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <Table className="border text-xs">
        <TableHeader className="bg-clr-secondary">
          <TableRow>
            <TableHead className="px-4 py-2 text-left">
              Tanggal Dibuat
            </TableHead>
            <TableHead className="px-4 py-2 text-left">
              Tanggal Keluar
            </TableHead>
            <TableHead className="px-4 py-2 text-left">Nama Barang</TableHead>
            <TableHead className="px-4 py-2 text-left">Jumlah Keluar</TableHead>
            <TableHead className="px-4 py-2 text-left">Pelanggan</TableHead>
            <TableHead className="px-4 py-2 text-left">Aksi</TableHead>
            <TableHead className="px-4 py-2 text-left">Detail</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {stockouts?.length === 0 && (
            <TableRow>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Tidak ada data ditemukan.
              </td>
            </TableRow>
          )}
          <Dialog open={detailModal} onOpenChange={setDetailModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detail FIFO Barang Keluar</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                {stockOutDetails.length === 0 ? (
                  <p className="text-muted-foreground">
                    Tidak ada detail ditemukan.
                  </p>
                ) : (
                  stockOutDetails.map((detail, index) => (
                    <div key={index} className="flex flex-col space-y-3.5">
                      <p>
                        <strong>Diambil dari barang masuk:</strong>{' '}
                        {detail.stock_in?.input_date ?? '-'}
                      </p>
                      <p>
                        <strong>Jumlah:</strong> {detail.quantity}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
          {stockouts?.map((stockout, index) => (
            <TableRow key={stockout.id} className="border-t">
              <TableCell className="px-4 py-2">
                {new Date(stockout.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {stockout.output_date && !isNaN(new Date(stockout.output_date))
                  ? format(new Date(stockout.output_date), 'dd MMM yyyy')
                  : 'Tanggal tidak valid'}
              </TableCell>
              <TableCell>{stockout.stocks_name ?? '-'}</TableCell>
              <TableCell>{stockout.quantity}</TableCell>
              <TableCell>{stockout.customer}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(stockout.id)}
                  className="flex items-center gap-2 text-red-500">
                  <span>
                    <Trash width={16} height={16} />
                  </span>
                  <span>Hapus</span>
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="link"
                  onClick={() => handleShowDetail(stockout.id)}>
                  Lihat Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Pagination jika diperlukan */}
      <div className="flex justify-between items-center px-4 py-2 font-semibold">
        <div>
          Halaman {meta?.current_page ?? 1} dari {meta?.last_page ?? 1}
        </div>
        <div className="flex gap-2">
          <Container>
            <SimplePagination links={links} meta={meta} />
          </Container>
        </div>
      </div>
    </div>
  );
}

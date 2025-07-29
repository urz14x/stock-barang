import React, { useEffect, useState } from 'react';
import App from '@/Layouts/App';
import Navbar from '@/Layouts/Navbar';
import { Head, useForm } from '@inertiajs/react';
import Container from '@/Components/Container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { SaveIcon, CalendarIcon } from 'lucide-react';
import { toast } from '@/Components/ui/use-toast';
import { ToastAction } from '@/Components/ui/toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/Components/ui/popover';
import { Calendar } from '@/Components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function EditStockMasuk({ stockin: stockinWrapper, stocks }) {
  const stockin = stockinWrapper.data;
  const [calendarDate, setCalendarDate] = useState(
    stockin?.input_date ? new Date(stockin.input_date) : null
  );
  console.log('stock name ', stockin.stocks_name);
  const { data, setData, patch, errors } = useForm({
    stock_id: stockin?.stock_id?.toString() ?? '', // ⬅️ HARUS toString()
    quantity: stockin?.quantity ?? '',
    input_date: stockin?.input_date ?? '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    patch(`/stock-in/${stockin.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: 'Berhasil mengedit data',
          description: `Data barang masuk berhasil diperbarui.`,
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      },
      onError: () => {
        toast({
          title: 'Terjadi kesalahan',
          description: `Isi form dengan benar.`,
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      },
    });
  };
  console.log('data.stock_id:', data.stock_id);
  console.log('stockin:', stockin);
  console.log('stocks.data:', stocks.data);
  useEffect(() => {
    if (stockin?.stock_id) {
      setData({
        stock_id: stockin.stock_id,
        quantity: stockin.quantity,
        input_date: stockin.input_date,
      });
      setCalendarDate(new Date(stockin.input_date));
    }
  }, [stockin]);
  return (
    <>
      <Head title="Edit Barang Masuk" />
      <Navbar>Edit Barang Masuk</Navbar>
      <Container className="flex flex-col items-start gap-5">
        <h2 className="text-xl font-semibold">Edit Barang Masuk</h2>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Form Edit</CardTitle>
            <CardDescription>Silakan ubah data barang masuk.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <Label htmlFor="stock_id" className="w-32">
                  Nama Barang
                </Label>
                <Select value={String(data.stock_id)} disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Barang" />
                  </SelectTrigger>
                  <SelectContent>
                    {stocks?.data?.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="quantity" className="w-32">
                  Jumlah
                </Label>
                <Input
                  type="number"
                  id="quantity"
                  value={data.quantity}
                  onChange={(e) => setData('quantity', e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="input_date" className="w-32">
                  Tanggal Masuk
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !calendarDate && 'text-muted-foreground'
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {calendarDate ? (
                        format(calendarDate, 'dd MMMM yyyy')
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={calendarDate}
                      onSelect={(date) => {
                        setCalendarDate(date);
                        setData('input_date', format(date, 'yyyy-MM-dd'));
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <SaveIcon className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

EditStockMasuk.layout = (page) => <App children={page} />;

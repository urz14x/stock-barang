import { useState, useEffect, useCallback } from 'react';
import Container from '@/Components/Container';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import App from '@/Layouts/App';
import { cn } from '@/lib/utils';
import { Head, router, useForm } from '@inertiajs/react';
import { CalendarIcon, FileText, PlusCircle, Search } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog';
import { Label } from '@/Components/ui/label';
import TableKeluar from '@/Components/TableKeluar';
import Navbar from '@/Layouts/Navbar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';
import { ToastAction } from '@/Components/ui/toast';
import { toast } from '@/Components/ui/use-toast';
import { useFilter } from '@/hooks/useFilter.js';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/Components/ui/popover';
import { Calendar } from '@/Components/ui/calendar';
import { format } from 'date-fns';

export default function Keluar(props) {
  const [params, setParams] = useState(props.state);
  const { data: stockouts, meta, links } = props.stockouts;
  const [selectedStock, setSelectedStock] = useState(null);
  const stocks = props.stocks;
  console.log('stockoutsss ', stockouts);
  const [outputDate, setOutputDate] = useState(null);
  const [startDate, setStartDate] = useState(
    params?.start_date ? new Date(params.start_date) : null
  );
  const [endDate, setEndDate] = useState(
    params?.end_date ? new Date(params.end_date) : null
  );
  const { post, data, setData, reset } = useForm({
    stock_id: 0,
    quantity: 0,
    customer: '',
    output_date: null,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const available = selectedStock?.available_stock ?? 0;
    const requestedQty = parseInt(data.quantity);

    if (requestedQty > available) {
      toast({
        title: 'Stok tidak mencukupi',
        description: `Stok tersedia hanya ${available}, sedangkan kamu ingin mengeluarkan ${requestedQty}`,
        variant: 'destructive',
      });
      return;
    }

    post(route('stock.out.store'), {
      preserveScroll: true,
      onError: () =>
        toast({
          title: 'Terjadi kesalahan',
          description: `Isi form dengan benar`,
        }),
      onSuccess: () =>
        toast({
          title: 'Berhasil',
          description: `Data barang keluar berhasil disimpan.`,
        }),
    });

    reset('stock_id', 'quantity', 'customer', 'output_date');
    setOutputDate(null);
    setSelectedStock(null);
  };
  const convertToLocalDateString = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const formatted = format(date, 'yyyy-MM-dd'); // ✅ lokal format
      setData('output_date', formatted);
    } else {
      setData('output_date', null);
    }
  };
  const handleExportPDF = () => {
    window.location.href = `/export-pdf-stock-out?start_date=${params?.start_date}&end_date=${params?.end_date}`;
  };

  const handleStockName = (val) => {
    const found = stocks.data.find((item) => item.id === parseInt(val));
    setSelectedStock(found);
    setData('stock_id', val);
  };
  useFilter({
    route: route('stock.out'),
    values: params,
    only: ['stockouts'],
  });
  return (
    <>
      <Head title="Barang Keluar" />
      <Navbar>Barang Keluar</Navbar>
      <Container className="flex flex-col items-start gap-5">
        <div>
          <h2 className="text-xl font-semibold">Barang Keluar</h2>
          <p className="text-xs text-foreground/50">
            Berikut stok barang yang Keluar. Mesin.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between px-2 gap-4 w-full">
          {/* Search Input */}
          <div className="flex items-center w-full bg-background border border-input rounded-md px-2">
            <Search width={17} height={17} />
            <Input
              type="text"
              name="search"
              value={params?.search}
              className="w-[200px]"
              onChange={(e) =>
                setParams((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              placeholder="Cari Mesin"
            />
          </div>

          {/* Date & Actions */}
          <div className="flex  gap-4 w-full md:w-auto">
            <form className="flex flex-col sm:flex-row gap-2 w-full">
              {/* Start Date */}
              <div className="flex items-center w-full sm:w-auto">
                <label className='w-full'>Start date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full sm:w-[180px] justify-start text-left font-normal',
                        !startDate && 'text-muted-foreground'
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, 'dd MMMM yyyy')
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date);
                        setParams((prev) => ({
                          ...prev,
                          start_date: date ? format(date, 'yyyy-MM-dd') : null,
                        }));
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date */}
              <div className="flex items-center w-full sm:w-auto">
                <label  className='w-full'>End date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full sm:w-[180px] justify-start text-left font-normal',
                        !endDate && 'text-muted-foreground'
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, 'dd MMMM yyyy')
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}

                      onSelect={(date) => {
                        setEndDate(date);
                        setParams((prev) => ({
                          ...prev,
                          end_date: date ? format(date, 'yyyy-MM-dd') : null,
                        }));
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </form>

            {/* Button Group */}
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 text-xs w-full sm:w-auto">
                    <PlusCircle width={17} height={17} />
                    <span>Barang Keluar</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Tambah barang Keluar</DialogTitle>
                    <DialogDescription>
                      Form Pengisian barang Keluar
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nama
                        </Label>
                        <Select
                          className="w-full"
                          onValueChange={handleStockName}>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Pilih Nama Barang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Barang</SelectLabel>
                              {/* Use map to loop over the dynamic list */}
                              {stocks.data.map((data) => (
                                // Make sure to set a unique key for each SelectItem
                                <SelectItem key={data.id} value={`${data.id}`}>
                                  {data.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                          Kuantitas
                        </Label>
                        <Input
                          type="number"
                          id="stock"
                          value={data.quantity}
                          onChange={(e) => setData('quantity', e.target.value)}
                          className="col-span-3 border"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                          Pelanggan
                        </Label>
                        <Input
                          type="text"
                          id="stock"
                          value={data.customer}
                          onChange={(e) => setData('customer', e.target.value)}
                          className="col-span-3 border"
                        />
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <Label htmlFor="output_date" className="w-1/2">
                          Tanggal Keluar (opsional)
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-1/2 justify-start text-left font-normal',
                                !outputDate && 'text-muted-foreground'
                              )}>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {outputDate instanceof Date && !isNaN(outputDate)
                                ? format(outputDate, 'dd MMMM yyyy')
                                : 'Pilih tanggal'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={outputDate}
                              onSelect={(date) => {
                                setOutputDate(date);
                                convertToLocalDateString(date);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit">Simpan</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                  <DialogFooter>
                    {selectedStock && (
                      <p className="text-sm text-muted-foreground mt-1 ml-[112px]">
                        Stok tersedia dari data masuk:
                        {selectedStock.available_stock === 0
                          ? ' Habis'
                          : selectedStock.available_stock}
                        {/* <strong>{selectedStock.available_stock}</strong> */}
                      </p>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                className="flex items-center gap-2 text-xs w-full sm:w-auto"
                disabled={params?.start_date && params?.end_date ? false : true}
                onClick={handleExportPDF}>
                <FileText width={17} height={17} />
                <span>Export data</span>
              </Button>
            </div>
          </div>
        </div>

        <TableKeluar
          stockouts={stockouts}
          links={links}
          meta={meta}
          params={params}
          setParams={setParams}
        />
      </Container>
    </>
  );
}

Keluar.layout = (page) => <App children={page} />;

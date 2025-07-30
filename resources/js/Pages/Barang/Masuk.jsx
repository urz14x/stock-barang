import { useCallback, useEffect, useState } from 'react';
import App from '@/Layouts/App';
import Container from '@/Components/Container';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
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
import TableMasuk from '@/Components/TableMasuk';
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
import { cn } from '@/lib/utils';
import { toast } from '@/Components/ui/use-toast';
import { ToastAction } from '@/Components/ui/toast';
import { useFilter } from '@/hooks/useFilter';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/Components/ui/popover.jsx';
import { format, isValid } from 'date-fns';
import { Calendar } from '@/Components/ui/calendar.jsx';

export default function Masuk(props) {
  const [params, setParams] = useState(props.state);
  const [startDate, setStartDate] = useState(
    params?.start_date ? new Date(params.start_date) : null
  );
  const [endDate, setEndDate] = useState(
    params?.end_date ? new Date(params.end_date) : null
  );
  const [date, setDate] = useState(null);

  const { data: stockins, meta, links } = props.stockins;
  const stocks = props.stocks;

  const { data, setData, post, reset } = useForm({
    stock_id: 0,
    quantity: 0,
    input_date: undefined,
  });

  const handleExportPDF = () => {
    window.location.href = `/export-pdf${
      params?.start_date && params?.end_date
        ? `?start_date=${params.start_date}&end_date=${params.end_date}`
        : ''
    }`;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (date) {
      const isoDate = new Date(date).toISOString();
      setData('input_date', isoDate);
    }
    post(route('stock.in.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: 'Berhasil membuat data',
          description: `Data berhasil dimasukkan!`,
          action: <ToastAction altText="Okay">Okay!</ToastAction>,
        });
        reset();
        setDate(null);
      },
      onError: () =>
        toast({
          title: 'Terjadi kesalahan',
          description: `Isi form dengan benar`,
          action: <ToastAction altText="Isi form dengan benar">Okay!</ToastAction>,
        }),
    });
    reset('name', 'stock');
  };

  const handleStockName = (val) => {
    setData('stock_id', val);
  };

  useFilter({
    route: route('stock.in'),
    values: params,
    only: ['stockins'],
  });

  return (
    <>
      <Head title="Barang Masuk" />
      <Navbar>Barang Masuk</Navbar>
      <Container className="flex flex-col items-start gap-5 text-xs">
        <div>
          <h2 className="text-xl font-semibold">Barang Masuk</h2>
          <p className="text-xs text-foreground/50">
            Berikut stok barang yang Masuk. Mesin.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-3 px-2 w-full">
        <div className="flex items-center bg-background w-full md:w-[250px] border border-input rounded-md px-2">

            <Search width={17} height={17} />
            <Input
              type="text"
              name="search"
              value={params?.search || ''}
              onChange={(e) =>
                setParams((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              placeholder="Cari Mesin"
            />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
          <form className={cn('flex flex-col md:flex-row gap-5 w-full')}>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <label className="w-28">Start date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[180px] justify-start text-left font-normal',
                          !startDate && 'text-muted-foreground'
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate && isValid(startDate) ? (
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
                <div className="flex items-center gap-2">
                  <label className="w-28">End date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[180px] justify-start text-left font-normal',
                          !endDate && 'text-muted-foreground'
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate && isValid(endDate) ? (
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
              </div>
            </form>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 text-xs">
                  <PlusCircle width={17} height={17} />
                  <span>Barang Masuk</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tambah barang masuk</DialogTitle>
                  <DialogDescription>Form Pengisian barang masuk</DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
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
                            {stocks.data.map((stock) => (
                              <SelectItem key={stock.id} value={`${stock.id}`}>
                                {stock.name}
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
                        id="stock"
                        onChange={(e) => setData('quantity', e.target.value)}
                        type="number"
                        value={data.quantity}
                        className="col-span-3 border"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="stock" className="text-right">
                        Tanggal Masuk (opsional)
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[280px] justify-start text-left font-normal',
                              !date && 'text-muted-foreground'
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, 'dd MMMM yyyy')
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              setDate(selectedDate);
                              if (selectedDate) {
                                const formatted = format(selectedDate, 'yyyy-MM-dd');
                                setData('input_date', formatted);
                              }
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
              </DialogContent>
            </Dialog>
            <Button
              disabled={params?.start_date && params?.end_date ? false : true}
              onClick={handleExportPDF}
              className="flex items-center gap-2 text-xs">
              <FileText width={17} height={17} />
              <span>Export data</span>
            </Button>
          </div>
        </div>
        <TableMasuk
          stockins={stockins}
          links={links}
          meta={meta}
          params={params}
          setParams={setParams}
        />
      </Container>
    </>
  );
}

Masuk.layout = (page) => <App children={page} />;

import { useState, useEffect, useCallback } from 'react';
import Container from '@/Components/Container';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import App from '@/Layouts/App';
import { cn } from '@/lib/utils';
import { Head, router, useForm } from '@inertiajs/react';
import { FileText, PlusCircle, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog';
import { Label } from '@/Components/ui/label';
import { debounce, pickBy } from 'lodash';
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

export default function Keluar({ stockout }) {
  const { stocks } = stockout;

  const [params, setParams] = useState(stockout.filtered);
  const { post, data, setData } = useForm({
    stock_id: 0,
    quantity: 0,
    customer: '',
  });
  const submitHandler = (e) => {
    e.preventDefault();
    post(route('stock.out.store'), {
      preserveScroll: true,
      onError: () =>
        toast({
          title: 'Terjadi kesalahan',
          description: `Isi form dengan benar`,
          action: (
            <ToastAction altText="Goto schedule to undo">Okay!</ToastAction>
          ),
        }),
      onSuccess: () =>
        toast({
          title: 'Berhasil membuat data barang keluar',
          description: `Data berhasil di masukan!`,
          action: (
            <ToastAction altText="Goto schedule to undo">Okay!</ToastAction>
          ),
        }),
    });
    reset('name', 'stock');
  };
  const handleExportPDF = () => {
    window.location.href = `/export-pdf-stock-out?start_date=${params.start_date}&end_date=${params.end_date}`;
  };

  const handleStockName = (val) => {
    setData('stock_id', val);
  };

  const reload = useCallback(
    debounce((query) => {
      router.get(route('stock.out'), pickBy(query), {
        preserveState: true,
      });
    }, 150),
    []
  );
  const onChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };
  useEffect(() => reload(params), [params]);
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
        <div className="flex items-center justify-between px-2 w-full">
          <div className="flex items-center bg-background border border-input rounded-md px-2">
            <Search width={17} height={17} />
            <Input
              type="text"
              name="q"
              value={params.q}
              onChange={onChange}
              placeholder="Cari by pelanggan..."
            />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <form className={cn('flex items-center gap-5')}>
                <div className="flex items-center">
                  <label className="w-28">Start date</label>
                  <Input
                    type="date"
                    name="start_date"
                    value={params.start_date}
                    onChange={onChange}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-28">End date </label>
                  <Input
                    type="date"
                    name="end_date"
                    value={params.end_date}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 text-xs">
                  <span>
                    <PlusCircle width={17} height={17} />
                  </span>
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
                            {stocks.map((data) => (
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
                  </div>
                  <DialogFooter>
                    <Button type="submit">Simpan</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              onClick={handleExportPDF}
              className="flex items-center gap-2 text-xs">
              <span>
                <FileText width={17} height={17} />
              </span>
              <span>Export data</span>
            </Button>
          </div>
        </div>

        {stockout.data.length > 0 ? (
          <TableKeluar stockouts={stockout} params={params} setParams={setParams} />
        ) : (
          <div className="p-2 border-2 w-full border-dashed">
            <h1 className="text-sm font-bold flex justify-center items-center w-full h-[300px]">
              Tidak ada data
            </h1>
          </div>
        )}
      </Container>
    </>
  );
}

Keluar.layout = (page) => <App children={page} />;

import { useCallback, useEffect, useState } from 'react';
import App from '@/Layouts/App';
import Container from '@/Components/Container';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Head, router, useForm } from '@inertiajs/react';
import { FileText, PlusCircle, Search } from 'lucide-react';
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
import { debounce, pickBy } from 'lodash';
import { cn } from '@/lib/utils';
import { toast } from '@/Components/ui/use-toast';
import { ToastAction } from '@/Components/ui/toast';

export default function Masuk({ stockin }) {
  const { data: stockins, stocks } = stockin;
    console.log(stockins)
  const [params, setParams] = useState(stockin.filtered);
  const { data, setData, post, reset } = useForm({
    stock_id: 0,
    quantity: 0,
  });
  //   const [date_start, setDateStart] = useState();
  //   const [date_end, setDateEnd] = useState();
  console.log(
    `/export-pdf?start_date=${params.start_date}&end_date=${params.end_date}`
  );
  const handleExportPDF = () => {
    window.location.href = `/export-pdf?start_date=${params.start_date}&end_date=${params.end_date}`;
  };
  const submitHandler = (e) => {
    e.preventDefault();

    post(route('stock.in.store'), {
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
          title: 'Berhasil membuat data',
          description: `Data berhasil di masukan!`,
          action: (
            <ToastAction altText="Goto schedule to undo">Okay!</ToastAction>
          ),
        }),
    });
    reset('name', 'stock');
    location.reload()
  };
  const handleStockName = (val) => {
    setData('stock_id', val);
  };
  const reload = useCallback(
    debounce((query) => {
      router.get(route('stock.in'), {...pickBy(query), page: query.q ? 1 : query.page}, {
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
      <Head title="Barang Masuk" />
      <Navbar>Barang Masuk</Navbar>
      <Container className="flex flex-col items-start gap-5">
        <div>
          <h2 className="text-xl font-semibold">Barang Masuk</h2>
          <p className="text-xs text-foreground/50">
            Berikut stok barang yang Masuk. Mesin.
          </p>
        </div>
        <div className="flex justify-between px-2 w-full">
          <div className="flex items-center bg-background w-[250px] border border-input rounded-md px-2">
            <Search width={17} height={17} />
            <Input
              type="text"
              name="q"
              value={params.q}
              onChange={onChange}
              placeholder="Cari Mesin"
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
                  <span>Barang Masuk</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tambah barang masuk</DialogTitle>
                  <DialogDescription>
                    Form Pengisian barang masuk
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      {/* <select
                        name="name"
                        onChange={(e) => setData('stock_id', e.target.value)}
                        id="name">
                        <option value="">Pilih Barang</option>
                        {stockins.map((data) => (
                          <option value={data.id}>{data.name}</option>
                        ))}
                      </select> */}
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
                            {stockins.map((data) => (
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
                        id="stock"
                        onChange={(e) => setData('quantity', e.target.value)}
                        type="number"
                        value={data.quantity}
                        className="col-span-3 border"
                      />
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
              onClick={handleExportPDF}
              className="flex items-center gap-2 text-xs">
              <span>
                <FileText width={17} height={17} />
              </span>
              <span>Export data</span>
            </Button>
          </div>
        </div>
        <TableMasuk stocks={stocks} params={params} />
      </Container>
    </>
  );
}

Masuk.layout = (page) => <App children={page} />;

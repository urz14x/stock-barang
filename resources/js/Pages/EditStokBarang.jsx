import React from 'react';
import App from '@/Layouts/App';
import Navbar from '@/Layouts/Navbar';
import { Head, router, useForm } from '@inertiajs/react';
import Container from '@/Components/Container';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { SaveIcon } from 'lucide-react';
import { toast } from '@/Components/ui/use-toast';
import { ToastAction } from '@/Components/ui/toast';

export default function EditStokBarang({ stock }) {
  const { data, setData, patch, errors } = useForm({
    name: '',
    stock: 0,
  });
  const editSubmitHandler = (e) => {
    e.preventDefault();
    patch(`/stock/${stock.id}`, {
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
          title: 'Berhasil mengedit data',
          description: `Data berhasil di update!`,
          action: (
            <ToastAction altText="Goto schedule to undo">Okay!</ToastAction>
          ),
        }),
    });
  };
  return (
    <>
      <Head title="Barang Masuk" />
      <Navbar>Edit barang</Navbar>
      <Container className="flex flex-col items-start gap-5">
        <h2 className="text-xl font-semibold">Edit barang</h2>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Form edit barang</CardTitle>
            <CardDescription>
              Silahkan ubah atau edit data barang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={editSubmitHandler}
              className="flex flex-col space-y-4"
            >
              <div className="flex items-center gap-3">
                <Label htmlFor="name" className="text-right">
                  Nama
                </Label>
                <Input
                  placeholder={stock.name}
                  type="text"
                  values={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  id="name"
                  className="col-span-3 border"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input
                  placeholder={stock.stock}
                  type="number"
                  values={data.stock}
                  onChange={(e) => setData('stock', e.target.value)}
                  id="stock"
                  className="col-span-3 border"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <span>
                    <SaveIcon width={17} height={17} />
                  </span>
                  <span>Simpan perubahan</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
EditStokBarang.layout = (page) => <App children={page} />;

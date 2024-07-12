import Container from "@/Components/Container";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import App from "@/Layouts/App";

import { Head, useForm } from "@inertiajs/react";
import { FileText, PlusCircle, Search } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import TableMasuk from "@/Components/TableMasuk";
import Navbar from "@/Layouts/Navbar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function Masuk({ stockin }) {
    // console.log(stockin);
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        quantity: "",
    });
    console.log(data);
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
                <div className="flex items-center justify-between px-2 w-full">
                    <div className="flex items-center bg-background border border-input rounded-md px-2">
                        <Search width={17} height={17} />
                        <Input type="text" placeholder="Cari Mesin" />
                    </div>
                    <div className="flex items-center gap-4">
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
                                    <DialogTitle>
                                        Tambah barang masuk
                                    </DialogTitle>
                                    <DialogDescription>
                                        Form Pengisian barang masuk
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="name"
                                            className="text-right"
                                        >
                                            Name
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setData("name", value)
                                            }
                                            id="name"
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Nama barang" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {stockin.data.map((data) => {
                                                    return (
                                                        <SelectItem
                                                            key={data.stock.id}
                                                            value={
                                                                data.stock.id
                                                            }
                                                        >
                                                            {data.stock.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="stock"
                                            className="text-right"
                                        >
                                            Kuantitas
                                        </Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            className="col-span-3 border"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button className="flex items-center gap-2 text-xs">
                            <span>
                                <FileText width={17} height={17} />
                            </span>
                            <span>Export data</span>
                        </Button>
                    </div>
                </div>
                <TableMasuk />
            </Container>
        </>
    );
}

Masuk.layout = (page) => <App children={page} />;

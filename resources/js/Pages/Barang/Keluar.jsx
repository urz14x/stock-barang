import Container from "@/Components/Container";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import App from "@/Layouts/App";

import { Head } from "@inertiajs/react";
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

import TableKeluar from "@/Components/TableKeluar";
import Navbar from "@/Layouts/Navbar";

export default function Keluar() {
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
                        <Input type="text" placeholder="Cari Mesin" />
                    </div>
                    <div className="flex items-center gap-4">
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
                                    <DialogTitle>
                                        Tambah barang Keluar
                                    </DialogTitle>
                                    <DialogDescription>
                                        Form Pengisian barang Keluar
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="name"
                                            className="text-right"
                                        >
                                            Nama
                                        </Label>
                                        <Input
                                            id="name"
                                            className="col-span-3 border"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="stock"
                                            className="text-right"
                                        >
                                            Kuantitas
                                        </Label>
                                        <Input
                                            type="number"
                                            id="stock"
                                            className="col-span-3 border"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="stock"
                                            className="text-right"
                                        >
                                            Pelanggan
                                        </Label>
                                        <Input
                                            type="text"
                                            id="stock"
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
                <TableKeluar />
            </Container>
        </>
    );
}

Keluar.layout = (page) => <App children={page} />;

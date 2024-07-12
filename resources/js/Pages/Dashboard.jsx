import { useState } from "react";
import Container from "@/Components/Container";
import TableStock from "@/Components/TableStock";
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
import Navbar from "@/Layouts/Navbar";
import { toast } from "@/Components/ui/use-toast";
import { ToastAction } from "@/Components/ui/toast";
import jsPDF from "jspdf";

export default function Dashboard({ stocks }) {
    console.log(stocks);
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        stock: "",
    });
    const exportStockPdf = async () => {
        const doc = new jsPDF({ orientation: "landscape" });
        doc.html("#title");
        doc.save("stocks.pdf");
    };
    const handleSubmitStock = (e) => {
        e.preventDefault();
        post(route("dashboard.store"), {
            preserveScroll: true,
            onError: () =>
                toast({
                    title: "Terjadi kesalahan",
                    description: `Isi form dengan benar`,
                    action: (
                        <ToastAction altText="Goto schedule to undo">
                            Okay!
                        </ToastAction>
                    ),
                }),
            onSuccess: () =>
                toast({
                    title: "Berhasil membuat data",
                    description: `Data berhasil di masukan!`,
                    action: (
                        <ToastAction altText="Goto schedule to undo">
                            Okay!
                        </ToastAction>
                    ),
                }),
        });
        reset("name", "stock");
        setTimeout(() => {
            setOpen(false);
        }, 500);
    };
    return (
        <>
            <Head title="Stock barang" />
            <Navbar>Stok barang</Navbar>
            <Container className="flex flex-col items-start gap-5">
                <div>
                    <h2 className="text-xl font-semibold" id="title">
                        Stok barang
                    </h2>
                    <p className="text-xs text-foreground/50">
                        Berikut stok barang yang tersedia diperusahann Miftah
                        Mesin.
                    </p>
                </div>
                <div className="flex items-center justify-between px-2 w-full">
                    <div className="flex items-center bg-background border border-input rounded-md px-2">
                        <Search width={17} height={17} />
                        <Input type="text" placeholder="Cari Mesin" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2 text-xs">
                                    <span>
                                        <PlusCircle width={17} height={17} />
                                    </span>
                                    <span>Barang Baru</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah barang baru
                                    </DialogTitle>
                                    <DialogDescription>
                                        Form tambah barang baru
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmitStock}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="name"
                                                className="text-right"
                                            >
                                                Nama
                                            </Label>
                                            <Input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="col-span-3 border"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="stock"
                                                className="text-right"
                                            >
                                                Stok
                                            </Label>
                                            <Input
                                                type="text"
                                                id="stock"
                                                value={data.stock}
                                                onChange={(e) =>
                                                    setData(
                                                        "stock",
                                                        e.target.value
                                                    )
                                                }
                                                className="col-span-3 border"
                                            />
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Buat baru
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Button
                            onClick={exportStockPdf}
                            className="flex items-center gap-2 text-xs"
                        >
                            <span>
                                <FileText width={17} height={17} />
                            </span>
                            <span>Export data</span>
                        </Button>
                    </div>
                </div>
                {stocks.data.length > 0 ? (
                    <TableStock stocks={stocks} />
                ) : (
                    <h1 className="text-sm font-bold flex justify-center items-center w-full h-[300px]">
                        Tidak ada data
                    </h1>
                )}
            </Container>
        </>
    );
}

Dashboard.layout = (page) => <App children={page} />;

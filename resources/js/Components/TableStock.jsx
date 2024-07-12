import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "./ui/button";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { router } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import Container from "./Container";

export default function TableStock({ stocks }) {
    const deletePost = (id) => {
        router.delete(`/stock/${id}`);
    };

    const { links } = stocks;
    console.log(links);
    return (
        <>
            <Table className="border bg-red-500h h-1/2">
                <TableHeader className="bg-clr-secondary">
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Nama barang</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-left">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stocks.data.map((stock, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">
                                {i + 1}
                            </TableCell>
                            <TableCell>{stock.name}</TableCell>
                            <TableCell>{stock.stock}</TableCell>
                            <TableCell className="flex items-center gap-4">
                                <a href={route("dashboard.edit", stock.id)}>
                                    <Button className="flex items-center gap-2">
                                        <span>
                                            <Pencil width={16} height={16} />
                                        </span>
                                        <span>Edit</span>
                                    </Button>
                                </a>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-2 text-red-500"
                                        >
                                            <span>
                                                <Trash width={16} height={16} />
                                            </span>
                                            <span>Hapus</span>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Apakah anda benar-benar ingin
                                                Menghapus stock {stock.name}?
                                            </AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full"
                                                >
                                                    <div className="flex items-center gap-2 ">
                                                        <span>
                                                            <ArrowLeft
                                                                width={17}
                                                                height={17}
                                                            />
                                                        </span>
                                                        <span>Kembali</span>
                                                    </div>
                                                </Button>
                                            </AlertDialogCancel>
                                            <AlertDialogFooter>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() =>
                                                        deletePost(stock.id)
                                                    }
                                                    className="flex items-center gap-2 text-red-500"
                                                >
                                                    <span>
                                                        <Trash
                                                            width={16}
                                                            height={16}
                                                        />
                                                    </span>
                                                    <span>Hapus saja</span>
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Container className="h-1/2">Prev</Container>
        </>
    );
}

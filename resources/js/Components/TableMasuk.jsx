import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";
export default function TableMasuk() {
    return (
        <Table className="border ">
            <TableHeader className="bg-clr-secondary">
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Nama barang</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead className="text-left">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Mesin 1</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell className="flex items-center gap-4">
                        <Button className="flex items-center gap-2">
                            <span>
                                <Pencil width={16} height={16} />
                            </span>
                            <span>Edit</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 text-red-500"
                        >
                            <span>
                                <Trash width={16} height={16} />
                            </span>
                            <span>Hapus</span>
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

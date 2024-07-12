import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { ArrowLeft, LogIn, Tags } from "lucide-react";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

import { Button } from "@/Components/ui/button";

export default function Sidebar() {
    return (
        <div className="flex items-center fixed z-50">
            <nav className="w-[300px] min-h-screen flex flex-col justify-between border-r p-4 bg-clr-secondary">
                <header className="flex flex-col items-center w-full">
                    <img src="/img/Logo.png" alt="" />
                    <h1 className="uppercase font-bold">Miftah Mesin</h1>
                    <p className="text-center text-xs text-brand">
                        <strong>Kreativitas Anda, Mesin Jahit Kami.</strong>
                    </p>
                    <nav className="text-xs w-full py-12 h-full">
                        <Command>
                            <CommandList>
                                <CommandGroup heading="Stok Barang">
                                    <Link href="/stock">
                                        <CommandItem
                                            className={`flex items-center gap-2 transition-all ${
                                                route().current("dashboard")
                                                    ? "bg-clr-primary"
                                                    : "bg-transparent"
                                            }`}
                                            active={route().current("/stock")}
                                        >
                                            <span>
                                                <Tags width={17} height={17} />
                                            </span>
                                            <span>Stok</span>
                                        </CommandItem>
                                    </Link>
                                    <Link href="/stock-in">
                                        <CommandItem
                                            className={`flex items-center gap-2 transition-all ${
                                                route().current("stock.in")
                                                    ? "bg-clr-primary"
                                                    : "bg-transparent"
                                            }`}
                                        >
                                            <span>
                                                <LogIn width={17} height={17} />
                                            </span>
                                            <span>Barang Masuk</span>
                                        </CommandItem>
                                    </Link>
                                    <Link href="/stock-out">
                                        <CommandItem
                                            className={`flex items-center gap-2 transition-all ${
                                                route().current("stock.out")
                                                    ? "bg-clr-primary"
                                                    : "bg-transparent"
                                            }`}
                                        >
                                            <span>
                                                <LogIn
                                                    width={17}
                                                    height={17}
                                                    className="transform rotate-180"
                                                />
                                            </span>
                                            <span>Barang Keluar</span>
                                        </CommandItem>
                                    </Link>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </nav>
                </header>

                <nav className="w-full">
                    <AlertDialog>
                        <AlertDialogTrigger className="w-full" asChild>
                            <Button variant="ghost" className="w-full">
                                <div className="flex items-center gap-2 text-red-700">
                                    <span>
                                        <LogIn width={17} height={17} />
                                    </span>
                                    <span>Logout</span>
                                </div>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Apakah anda benar-benar ingin Keluar dari
                                    aplikasi?
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    <Button variant="ghost" className="w-full">
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
                                    <Link href={route("logout")} method="POST">
                                        <Button
                                            variant="ghost"
                                            className="w-full"
                                        >
                                            <div className="flex items-center gap-2 text-red-700">
                                                <span>
                                                    <LogIn
                                                        width={17}
                                                        height={17}
                                                    />
                                                </span>
                                                <span>Logout</span>
                                            </div>
                                        </Button>
                                    </Link>
                                </AlertDialogFooter>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </nav>
            </nav>
        </div>
    );
}

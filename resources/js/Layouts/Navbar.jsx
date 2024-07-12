import Container from "@/Components/Container";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function Navbar({ children }) {
    const { auth } = usePage().props;
    return (
        <header>
            <div className="bg-clr-secondary">
                <Container className="border-b flex justify-between items-center">
                    <h5 className="text-sm font-semibold">{children}</h5>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <span> {auth.user.name}</span>
                                <span>
                                    <ChevronDown width={17} height={17} />
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={route("profile.edit")}>
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Container>
            </div>
        </header>
    );
}

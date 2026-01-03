import { mainMenu } from "@/menu.config";
import { SearchModal, metadata } from "@/pages/_app";
import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.png";
import Link from "next/link";

export const Nav = ({ className, children, id }: NavProps) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        setMounted(true);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!mounted) return null; // Prevent hydration mismatch

    return (
        <nav
            className={cn(
                "sticky z-50 top-0 border-b-0 shadow-none box-border bg-none",
                scrolled ? "bg-background shadow" : "bg-primary",
                "fade-in",
                className,
            )}
            id={id}
        >
            <div
                id="nav-container"
                className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
            >
                <Link
                    className="hover:opacity-75 transition-all flex gap-2 items-center"
                    href="/"
                >
                    <span className="sr-only">Sholo</span>
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={84}
                        height={30.54}
                        className={scrolled ? "" : "filter brightness-0 invert"}
                    ></Image>
                </Link>
                {children}
                <div className="flex items-center gap-2">

                    <div className="mx-2 hidden md:flex">
                        {Object.entries(mainMenu).map(([key, item]) => (
                            <Button key={item.path} asChild variant={scrolled ? "ghost" : "default"} size="sm" className="bg-none">
                                <Link href={item.path}>
                                    {item.display}
                                </Link>
                            </Button>
                        ))}

                        <button
                            onClick={() => {
                                setOpen(true);
                            }}
                            className={"p-2 rounded-full cursor-pointer hover:bg-neutral-100 " + (scrolled ? "" : "text-neutral-50 hover:bg-neutral-700")}
                        >
                            <SearchIcon />
                            <span className="sr-only">search</span>
                        </button>
                        <SearchModal open={open} onClose={() => setOpen(false)} />
                    </div>
                    <Button asChild className="hidden sm:flex" variant={scrolled ? "default" : "outline"} size="sm">
                        <Link href="/get-sholo">ষোলো কিনুন</Link>
                    </Button>
                    <MobileNav title={metadata.title?.toString()} setSearchOpen={setOpen} />
                </div>
            </div>
        </nav>
    );
};

export interface NavProps {
    className?: string;
    children?: React.ReactNode;
    id?: string;
}
"use client"

import { useState } from 'react';
import Link from "next/link"
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { Icons } from './icons';
import { SignOut } from './sign-out';
import { Session } from "next-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export default function Navbar({ session }: { session: Session | null }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <nav className="bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4">

                {/* Left side: Logo/Brand */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Icons.logo className='h-6 w-6'/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">
                    <span className='text-yellow-600'>PV </span> 
                    <span className='text-foreground dark:text-foreground'>Sensors</span>
                    </span>
                </Link>

                {/* Right side: ModeToggle + Hamburger/Close */}
                <div className="flex items-center gap-2">
                    {/* Move ModeToggle ABOVE the toggle button so it sits to the left */}
                    <Button
                    onClick={handleToggle}
                    data-collapse-toggle="navbar-default" 
                    type="button" 
                    className="relative bg-transparent hover:bg-gray-100 dark:hover:bg-accent border-none md:hidden" 
                    aria-controls="navbar-default" 
                    aria-expanded={isOpen}
                    >
                    {/* Hamburger icon (shown when menu is closed) */}
                    <AiOutlineMenu 
                        className={`h-[1.2rem w-[1.2rem]
                            transition-all
                            text-black
                            dark:text-yellow-500
                            ${isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
                        />
                    {/* Close icon (shown when menu is open) */}
                    <AiOutlineClose 
                        className={`absolute
                            h-[1.2rem] w-[1.2rem]
                            transition-all
                            text-black
                            dark:text-yellow-500
                            ${isOpen ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
                        aria-hidden="true"
                        />
                    <span className="sr-only">
                        {isOpen ? "Close main menu" : "Open main menu"}
                    </span>
                </Button>
                </div>

                {/* 2) Collapsible Menu (appears below the top bar) */}
                <div 
                    className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} 
                    id="navbar-default"
                    >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-border rounded-lg
                            md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-100 dark:bg-gray-800 dark:border-border dark:text-foreground">
                        <li>
                            <Link 
                                href="/" 
                                className="nav-link" 
                                aria-current="page">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/blog" 
                                className="nav-link"
                                >
                                News
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/about"
                                className="nav-link"
                                >
                                  About
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/contacts" 
                                className="nav-link"
                                >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center justify-between w-20">
                    <ModeToggle />
                    <Link href="/rss"> 
                        <Icons.rss className='h-6 w-6'/>
                    </Link>
                </div>
                {/* Show user info if logged in */}
                {session && (
                        <div>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Button className="flex items-center gap-4 mt-4">
                                    {session.user?.image && (
                                        <img
                                            src={session.user.image}
                                            alt="User profile"
                                            className="w-10 h-10 rounded-full border border-gray-300"
                                        />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Link href="/profile" className="text-sm font-medium text-gray-900 dark:text-white">
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <SignOut />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    )}
            </div>
            </div>
        </nav>
    )
}

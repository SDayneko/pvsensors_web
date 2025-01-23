"use client"

import { useState } from 'react';
import Link from "next/link"
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
      };

    return (
        <nav className="bg-background border-border dark:bg-background dark:border-border">
            <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-foreground dark:text-foreground">PV Sensors</span>
                </Link>
                <Button
                    onClick={handleToggle}
                    data-collapse-toggle="navbar-default" 
                    type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    aria-controls="navbar-default" 
                    aria-expanded={isOpen}
                    >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </Button>
                <div 
                    className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} 
                    id="navbar-default"
                    >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-border rounded-lg bg-popover 
                            md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-popover dark:border-border dark:text-foreground">
                        <li>
                            <Link 
                                href="#" 
                                className="block py-2 px-3 rounded text-primary-foreground bg-primary hover:bg-primary/90" 
                                aria-current="page">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="#" 
                                className="block py-2 px-3 rounded hover:bg-accent hover:text-accent-foreground"
                                >
                                News
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="#"
                                className="block py-2 px-3 rounded hover:bg-accent hover:text-accent-foreground"
                                >
                                  About
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="#" 
                                className="block py-2 px-3 rounded hover:bg-accent hover:text-accent-foreground"
                                >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center justify-between w-20">
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}
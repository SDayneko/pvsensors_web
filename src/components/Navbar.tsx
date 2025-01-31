"use client"

import { useState } from 'react';
import Link from "next/link"
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import LoginUser from './login-user';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
      };

    return (
        <nav className="bg-gray-100 border-border dark:bg-gray-800 dark:border-border ">
            <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4">

                {/* Left side: Logo/Brand */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">
                    <span className='text-yellow-500'>PV</span> <span className='text-foreground dark:text-foreground'>Sensors</span>
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
                                href="#" 
                                className="nav-link" 
                                aria-current="page">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="#" 
                                className="nav-link"
                                >
                                News
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="#"
                                className="nav-link"
                                >
                                  About
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="#" 
                                className="nav-link"
                                >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <LoginUser />
                <div className="md:flex hidden md:visible">
                    <ModeToggle hidden={!isOpen && typeof window !== "undefined" && window.innerWidth < 768} />
                </div>
            </div>
        </nav>
    )
}
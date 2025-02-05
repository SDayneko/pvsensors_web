"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    await signOut();
  };

  return (
    <div className="flex justify-center">
      <Link href="/" onClick={handleSignOut} passHref>
        <span>Sign Out</span>
      </Link>
    </div>
  );
};

export { SignOut };

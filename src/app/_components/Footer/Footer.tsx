"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../../../public/freshcart-logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
      const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
     if (pathname === "/" || pathname === "/home") {

      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {

      router.push("/home");
    }
  };
  return (
   <footer className="bg-gray-50 text-gray-700 py-8 w-full pt-5 border-t mt-10">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <Image
      onClick={handleClick}
      src={Logo}
      alt="logo"
      width={100}
      height={150}
      className="cursor-pointer"
    />
    <div className="text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Fresh Cart. All rights reserved.
    </div>
    <div className="flex space-x-4">
      <Link href="https://facebook.com" target="_blank" className="hover:text-blue-600 transition-colors">
        <i className="fa-brands fa-facebook-f"></i>
      </Link>
      <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400 transition-colors">
        <i className="fa-brands fa-twitter"></i>
      </Link>
      <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-700 transition-colors">
        <i className="fa-brands fa-linkedin-in"></i>
      </Link>
      <Link href="https://youtube.com" target="_blank" className="hover:text-red-600 transition-colors">
        <i className="fa-brands fa-youtube"></i>
      </Link>
    </div>
  </div>
</footer>

  );
}

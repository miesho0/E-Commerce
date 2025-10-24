// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import Logo from "../../../../public/freshcart-logo.svg";
// import { signOut, useSession } from "next-auth/react";
// import { useContext } from "react";
// import { cartContext } from "@/Context/CartContext";
// import { Badge } from "@/components/ui/badge";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { usePathname } from "next/navigation";
// import { User } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// export default function Navbar() {
//   const { data: session, status } = useSession();

//   const { numOfCart } = useContext(cartContext);
//     const { wishlistCount } = useContext(cartContext);
//   const pathname = usePathname();

//   return (

//     <div className="h-15 fixed top-0 left-0 w-full bg-white shadow-md py-4 z-50">
//       <div className=" w-full md:w-[80%] mx-auto flex flex-row items-center justify-between gap-4 px-4 ">


//         <div className=" flex items-center">
//           {pathname === "/home" ? (

//             <Image src={Logo} alt="logo" className="cursor-pointer" width={100} height={150} />
//           ) : (<Link href="/home" className="block">
//             <Image src={Logo} alt="logo" width={100} height={150} className="cursor-pointer" />
//           </Link>)}</div>
//         {/* {status === "loading" && (
//             <div className="flex justify-center items-center">
//               <i className="fa-solid fa-spinner fa-spin"></i>
//             </div>
//           )} */}

//         <ul className=" flex-row items-center gap-4 text-gray-700 text-base font-normal hidden md:flex ">
//           {/* {status === "authenticated" && (
//             <> */}
//         <li>
//   <Link
//     href="/home"
//     className={`hover:text-gray-800 ${
//       pathname === "/home" || pathname === "/" ? "text-green-600 font-semibold" : "text-gray-700"
//     }`}
//   >
//     Home
//   </Link>
// </li>

// <li>
//   <Link
//     href="/products"
//     className={`hover:text-gray-800 ${
//       pathname === "/products" ? "text-green-600 font-semibold" : "text-gray-700"
//     }`}
//   >
//     Products
//   </Link>
// </li>

// <li>
//   <Link
//     href="/categories"
//     className={`hover:text-gray-800 ${
//       pathname === "/categories" ? "text-green-600 font-semibold" : "text-gray-700"
//     }`}
//   >
//     Categories
//   </Link>
// </li>

// <li>
//   <Link
//     href="/brands"
//     className={`hover:text-gray-800 ${
//       pathname === "/brands" ? "text-green-600 font-semibold" : "text-gray-700"
//     }`}
//   >
//     Brands
//   </Link>
// </li>

//           {/* </>
//           )} */}


//           {/* {status === "loading" && (
//             <div className="flex justify-center items-center">
//               <i className="fa-solid fa-spinner fa-spin"></i>
//             </div>
//           )} */}


//         </ul>




//         <div className="flex  flex-row items-center gap-4">
//           {status === "loading" && (
//             <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>)}

//           {status === "authenticated" && (
//             <div className="flex flex-row gap-7">

          
//               <Link href="/wishlist" className="relative inline-block text-gray-800">
//   <i className="fa-solid fa-heart text-2xl text-gray-600"></i>
//   {wishlistCount > 0 && (
//     <Badge className="absolute -top-2 -right-3 bg-red-500 text-white">
//       {wishlistCount}
//     </Badge>
//   )}
// </Link>

//               <Link href="/cart" className="relative inline-block text-gray-800">
//                 <i className="fa-solid fa-cart-shopping text-2xl text-gray-600"></i>
//                 {numOfCart > 0 && (
//                   <Badge className="absolute -top-2 -right-3 bg-green-600 text-white">
//                     {numOfCart}
//                   </Badge>)}

//               </Link>

//    <div className="hidden md:flex">
//   <DropdownMenu>
//     <DropdownMenuTrigger>
//       <User />
//     </DropdownMenuTrigger>
//     <DropdownMenuContent>
//       <DropdownMenuSeparator />
//       <DropdownMenuItem>
//         <Link href="/change-password">Change Password</Link>
//       </DropdownMenuItem>
//       <DropdownMenuItem>
//         <button
//           onClick={() => signOut({ callbackUrl: "/login" })}
//           className="cursor-pointer"
//         >
//           Log out
//         </button>
//       </DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>
// </div>


                  
              
//             </div> )}
//           {status === "unauthenticated" && (
//             <div className=" gap-2 font-medium hidden md:flex">
//               <Link href="/login" className="text-gray-700 hover:text-gray-800">
//                 Login
//               </Link>
//               <Link
//                 href="/register"
//                 className="text-gray-700 hover:text-gray-800"
//               >
//                 Register
//               </Link>
//             </div> )}

//           <div className="md:hidden">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <i className="fa-solid fa-bars cursor-pointer"></i>
//                 </Button>
//               </SheetTrigger>

//              <SheetContent side="right" className="w-64 bg-gray-50">
//   <ul className="flex flex-col gap-4 p-4 text-gray-700">
//     <li><Link href="/home">Home</Link></li>
//     <li><Link href="/products">Products</Link></li>
//     <li><Link href="/categories">Categories</Link></li>
//     <li><Link href="/brands">Brands</Link></li>
//   </ul>

//   {status === "authenticated" ? (
//     <>
//     <button onClick={() => signOut({ callbackUrl: "/change-password" })}
//                     className="cursor-pointer mt-4 text-red-600">
//                     Change Password
//                   </button>
//     <button onClick={() => signOut({ callbackUrl: "/login" })}
//                     className="cursor-pointer mt-4 text-red-600">
//                     Log out
//                   </button></>
//   ) : (
//     <div className="flex flex-col gap-2 px-4 pb-4 font-medium">
//       <Link href="/login" className="text-gray-700 hover:text-gray-800">
//         Login
//       </Link>
//       <Link
//         href="/register"
//         className="text-gray-700 hover:text-gray-800">
//         Register
//       </Link>
//     </div>
//   )}
// </SheetContent>

//             </Sheet>
//           </div>



//           {/* {status === "unauthenticated" && (
//             <div className=" gap-2 font-medium hidden md:flex">
//               <Link href="/login" className="text-gray-700 hover:text-gray-800">
//                 Login
//               </Link>
//               <Link
//                 href="/register"
//                 className="text-gray-700 hover:text-gray-800">
//                 Register
//               </Link>
//             </div>
//           )} */}


//         </div>

//       </div>

//     </div>
//   );
// }
"use client";
import Link from "next/link";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Logo from "../../../../public/freshcart-logo.svg";
import { signOut, useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { cartContext } from "@/Context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { numOfCart, wishlistCount } = useContext(cartContext);
  const pathname = usePathname();

  const [sheetOpen, setSheetOpen] = useState(false);

  const handleClose = () => setSheetOpen(false);

  const links = [
    { name: "Home", href: "/home" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Brands", href: "/brands" },
  ];

  return (
    <div className="h-15 fixed top-0 left-0 w-full bg-white shadow-md py-4 z-50">
      <div className="w-full md:w-[80%] mx-auto flex flex-row items-center justify-between gap-4 px-4">
        {/* Logo */}
        <div className="flex items-center">
          {pathname === "/home" ? (
            <Image src={Logo} alt="logo" className="cursor-pointer" width={100} height={150} />
          ) : (
            <Link href="/home" className="block">
              <Image src={Logo} alt="logo" width={100} height={150} className="cursor-pointer" />
            </Link>
          )}
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex flex-row items-center gap-4 text-base font-normal">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`hover:text-gray-800 ${
                  pathname === link.href || (link.href === "/home" && pathname === "/")
                    ? "text-green-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth/Cart */}
        <div className="flex flex-row items-center gap-4">
          {status === "loading" && <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>}

          {status === "authenticated" && (
            <div className="flex flex-row gap-7">
              <Link href="/wishlist" className="relative inline-block text-gray-800">
                <i className="fa-solid fa-heart text-2xl text-gray-600"></i>
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-3 bg-red-500 text-white">{wishlistCount}</Badge>
                )}
              </Link>

              <Link href="/cart" className="relative inline-block text-gray-800">
                <i className="fa-solid fa-cart-shopping text-2xl text-gray-600"></i>
                {numOfCart > 0 && (
                  <Badge className="absolute -top-2 -right-3 bg-green-600 text-white">{numOfCart}</Badge>
                )}
              </Link>

              {/* User Dropdown (Desktop Only) */}
              <div className="hidden md:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <User />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/change-password">Change Password</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="cursor-pointer"
                      >
                        Log out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          {status === "unauthenticated" && (
            <div className="gap-2 font-medium hidden md:flex">
              <Link href="/login" className="text-gray-700 hover:text-gray-800">
                Login
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-gray-800">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Sheet */}
          <div className="md:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <i className="fa-solid fa-bars cursor-pointer"></i>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-64 bg-gray-50">
                <ul className="flex flex-col gap-4 p-4 text-gray-700">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={handleClose}
                        className={`${
                          pathname === link.href || (link.href === "/home" && pathname === "/")
                            ? "text-green-600 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {status === "authenticated" ? (
                  <>
                    <button
                      onClick={() => {
                        handleClose();
                        signOut({ callbackUrl: "/change-password" });
                      }}
                      className="cursor-pointer mt-4 text-red-600"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => {
                        handleClose();
                        signOut({ callbackUrl: "/login" });
                      }}
                      className="cursor-pointer mt-4 text-red-600"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 px-4 pb-4 font-medium">
                    <Link href="/login" onClick={handleClose} className="text-gray-700 hover:text-gray-800">
                      Login
                    </Link>
                    <Link href="/register" onClick={handleClose} className="text-gray-700 hover:text-gray-800">
                      Register
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}

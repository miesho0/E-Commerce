"use client"
import Loading from '@/app/loading'
import { cartContext } from '@/Context/CartContext'
import { Product } from '@/types/product.type'
import React, { useContext } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WishlistPage: React.FC = () => {
  const { isloading, wishlistProducts, wishlistCount, removeFromWishlist } = useContext(cartContext) as any;

  async function removeItem(id: string) {
    const data = await removeFromWishlist(id);
    if (data?.status === "success" || !data) {
      toast.success("Removed from wishlist successfully", {
        duration: 2000,
        position: "top-right",
        style: { background: "green", color: "white" },
        icon: "✅"
      });
    } else {
      toast.error("Failed to remove product from wishlist", {
        duration: 2000,
        position: "top-right",
        style: { background: "red", color: "white" },
        icon: "❌"
      });
    }
  }

  if (isloading) return <Loading />

  if (!wishlistProducts || wishlistProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
          <i className="fa-solid fa-heart text-gray-400 text-6xl mb-4"></i>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Your Wishlist is Empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven’t added any favorites yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full md:w-[85%] mx-auto mt-30 mb-30 px-15 md:px-0 bg-slate-50 pb-10'>
      <div className="md:px-10 pt-10 flex flex-col md:flex-row justify-between items-center mb-5">
        <h2 className="text-2xl mb-2 md:mb-0">My Wishlist</h2>
        <Button className='cursor-pointer bg-green-500 hover:bg-green-700 text-black'>
          <Link href="/products"> Continue Shopping </Link>
        </Button>
      </div>

      <div className=' md:px-13 all-products'>
        {wishlistProducts.map((product: Product, index: number) => (
          <div key={index} className='flex flex-col md:flex-row items-center gap-4 py-2 border-b-[1px] border-slate-300'>
            
            <div>
              <Image alt={product.title} src={product.imageCover} width={400} height={400} className="md:w-[200px] md:h-[200px]" />
            </div>

            <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left'>
              <h5 className='mb-1 font-semibold'>{product.title}</h5>
              <h6>
                <span className='text-green-400'>{product.price}</span> <span>EGP</span>
              </h6>
              <button onClick={() => removeItem(product.id)} className='cursor-pointer text-red-500 mt-4 flex items-center gap-1'>
                <i className='fa fa-trash'></i> Remove
              </button>
            </div>

          </div>
        ))}
      </div>

      <h5 className='mt-6 text-right md:text-right md:px-10'>
        Total Items in Wishlist: <span className='text-red-500'>{wishlistCount}</span>
      </h5>

    </div>
  )
}

export default WishlistPage

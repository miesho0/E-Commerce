"use client"
import Loading from '@/app/loading'
import { cartContext } from '@/Context/CartContext'
import { ProductCart } from '@/types/cart.type'
// import { getMyToken } from '@/utilities/token'
import React, { useContext } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import Link from 'next/link';
import { Button } from '@/components/ui/button';


const Cart = () => {
  const { isloading, totalCartPrice, products ,numOfCart , removeCartItem , updateCart , ClearCart} = useContext(cartContext)

    async function removeItem(id : string) {

      const data = await removeCartItem(id)
      if (data.status === "success") {
            toast.success("Remove product successfully ", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "green",
                    color: "white",
                },
                icon: "✅"
            })
              
        } else {
            toast.error("Failed to remove product from cart", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "red",
                    color: "white",
                },
                icon: "❌"

            })
    
        }
    }

    async function updateCartItem(id : string , count : number) {

      const data = await updateCart(id , count)
      if (data.status === "success") {
            toast.success("update product successfully ", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "green",
                    color: "white",
                },
                icon: "✅"
            })
              
        } else {
            toast.error("Failed to update product from cart", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "red",
                    color: "white",
                },
                icon: "❌"

            })
    
        }
    }

  if (isloading) return <Loading />
if (products.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
        <i className="fa-solid fa-cart-shopping text-gray-400 text-6xl mb-4"></i>
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet</p>
      </div>
    </div>
  )
}
  return (
    <div className='w-full md:w-[85%]  mx-auto mt-30 mb-30  px-15 md:px-0 bg-slate-50 pb-10'>
    <div className="md:px-10 pt-10 flex flex-col md:flex-row justify-between items-center mb-5">
  <h2 className="text-2xl mb-2 md:mb-0">Cart Shop</h2>


    <Button className=' cursor-pointer bg-green-500 hover:bg-green-700 text-black'>
      <Link href="/payment"> Order Now </Link>
    
    </Button>

</div>

<div className="md:px-10 flex flex-col md:flex-row justify-between items-center mb-5">
  <h5 className='font-mono mb-2 md:mb-0'>
    total price : <span className="text-green-400">{totalCartPrice}</span> <span>EGP</span>
  </h5>
  <h5>total number of items : <span className="text-green-400">{numOfCart}</span></h5>
</div>

      <div className=' md:px-13 all-products'>
        {products.map(function (product: ProductCart, index: number) {
          return (
    <div key={index} className='flex flex-col md:flex-row items-center gap-4 py-2 border-b-[1px] border-slate-300'>
 
  <div>
    <Image alt={product.product.title} src={product.product.imageCover} width={400} height={400} className="md:w-[200px] md:h-[200px]" />
  </div>


<div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left'>
  <h5 className='mb-1 font-semibold'>{product.product.title}</h5>
  <h6>
    <span className='text-green-400'>{product.price}</span> <span>EGP</span>
  </h6>
  <button onClick={()=> removeItem(product.product.id)} className='cursor-pointer text-red-500 mt-4 flex items-center gap-1'>
    <i className='fa fa-trash'></i> Remove
  </button>
</div>



  <div className='flex items-center gap-3 mt-2 '>
    <button onClick={()=> updateCartItem(product.product.id , product.count +1)} className='border-2 border-green-300 px-2 py-1 rounded cursor-pointer'>+</button>
    <span>{product.count}</span>
    <button onClick={()=> updateCartItem(product.product.id , product.count -1)}  className='border-2 border-green-300 px-2 py-1 rounded cursor-pointer'>-</button>
  </div>
</div>

          )
        })}

      

      </div>
      <button onClick={ClearCart} className=' mx-auto block bg-transparent px-4 py-2 rounded-2xl hover:bg-red-500 border-2 cursor-pointer mt-10'> Clear Your Cart</button>
    </div>
  )
}

export default Cart

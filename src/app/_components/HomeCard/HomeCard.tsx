import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Product } from '@/types/product.type'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import AddButtonCart from '../AddButtonCart/AddButtonCart'
import WishlistButton from '../Wishlist/Wishlist'

export default function HomeCard({ product } : {product:Product}) {

  return (

    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">

      <div>
        <Card className="p-2 pb-15  gap-2 group relative overflow-hidden transition-all duration-300">
     <div>
  <WishlistButton product={product} />
</div>

          <Link href={`/productdetails/${product.id}`}>
            <CardHeader className="pt-2">
              <Image width={250} height ={250} src={product.imageCover} alt={product.title} priority/>
              
            </CardHeader>
            <CardContent className="pt-2 ">
              <p className="font-bold mb-3 text-yellow-500 text-center">{product.category.name}</p>
              <p className="line-clamp-1">{product.title}</p>
            </CardContent>
            <CardFooter className="pt-2 w-full flex justify-between items-center">
              <p>{product.price} EGP</p>
              <p>{product.ratingsAverage}<i className="fa-solid fa-star text-yellow-400"></i></p>
            </CardFooter>
          </Link>
             
             
      <div className="absolute bottom-[-60px] left-0 w-full opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-300">
  <AddButtonCart id={product.id} classname="w-full rounded-none bg-green-600 hover:bg-green-700 text-white py-2 transition-all" />
</div>


        </Card>
      </div>

    </div>

  )
}

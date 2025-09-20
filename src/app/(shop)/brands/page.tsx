
import { Brand } from '@/types/cart.type'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import getAllBrands from '@/apis/allbrands'

export default async function BrandsPage() {
  const data: Brand[] = await getAllBrands()

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-[80%] mx-auto gap-5 mt-30">
      {data.map((cat) => (
<Link
  key={cat._id}
  href={`/brandsdetails/${cat._id}`} 
  className="flex flex-col items-center p-4 border rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition"
>
  <Image
    src={cat.image}
    alt={cat.name}
    width={120}
    height={120}
    className="rounded-lg object-cover"
  />
  <h2 className="mt-3 text-center font-medium text-lg">{cat.name}</h2>
</Link>
      ))}
    </div>
  )
}

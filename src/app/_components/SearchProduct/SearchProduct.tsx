"use client"

import React, { useEffect, useState } from "react"
import { Product } from "@/types/product.type"
import HomeCard from "../HomeCard/HomeCard"

interface SearchProductsProps {
  products: Product[]
}

export default function SearchProducts({ products }: SearchProductsProps) {
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [search, products])

  return (
    <div className="w-full  mx-auto mt-10">

      <div className="flex justify-center mb-6  mx-auto">
        <input type="text" value={search}
          onChange={(e) => setSearch(e.target.value)} placeholder="Search products"
          className="w-[80%] p-3 mb-6 border border-gray-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400" /></div>

      <div className="flex flex-wrap">
        {filteredProducts.length > 0 ? (filteredProducts.map((product) => (
          <HomeCard key={product.id} product={product} />))) : (
          <p className="w-full text-center mt-10 text-gray-500">No products found</p>)}
      </div>
    </div>
  )
}

import React from "react";
import Image from "next/image";
import HomeCard from "@/app/_components/HomeCard/HomeCard";
import { Product } from "@/types/product.type";
import getProductsByBrand from "@/apis/brandsproducts";

export default async function categoryDetails({ params } : {params: {id:string}}) {
  const { id } =  params;
  const products: Product[] = await getProductsByBrand(id)
  return (
    <div className="flex flex-wrap my-30 w-full md:w-[80%] mx-auto">
      {products.length > 0 ? (
        products.map((product) => (
          <HomeCard key={product._id} product={product} />
        ))
      ) : (
        <p className="w-full text-center mt-10 text-gray-500">No products found in this Brand</p>
      )}
    </div>
  )
}
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import AddButtonCart from "@/app/_components/AddButtonCart/AddButtonCart";
import getSingleProduct from "@/apis/singleproduct";

export default async function ProductDetails({ params } : {params: {id:string}}) {
  const { id } =  params;
const data = await getSingleProduct(id)
  return (
    <div className="w-full px-5 md:w-[80%] md:px-0 mx-auto my-10 flex items-center flex-col md:flex-row mt-30">
     <div className="w-full md:w-1/3">
        <Image src={data.imageCover} className="w-full" alt={data.slug} width={300} height={300}/>
             </div>
         <div className="w-full md:w-2/3 m-10 md:m-0 ps-10">
         <div className="flex flex-row justify-between">
    <h2 className="text-2xl text-green-500 font-bold ">{data.title}</h2>
     <p>{data.ratingsAverage}<i className="fa-solid fa-star text-yellow-400"></i></p>
         </div>
      
          <p className="my-5 ">{data.description}</p>
          <h3 className="my-5 text-center">{data.category.name}</h3>
            <div  className="p-0 my-5 w-full flex justify-between items-center">
    <p>{data.price} EGP</p>
   
  </div>
    <AddButtonCart id={data.id} />  
         </div>
     
    </div>
  );
}

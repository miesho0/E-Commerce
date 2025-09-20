

import getAllProducts from "@/apis/allproducts";
import SearchProducts from "@/app/_components/SearchProduct/SearchProduct";
import { Product } from "@/types/product.type";





export default async function Products() {
const data:Product[] = await getAllProducts()

  return (
   <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto mt-20">

<div className="flex flex-wrap">
     <SearchProducts products={data} />
  {/* {data.map( (product:Product,idx:number) => <HomeCard key={idx} product={product}/>)} */}

</div>
   </section>
  );
}

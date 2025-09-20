import getAllProducts from "@/apis/allproducts";
import MainSlider from "@/app/_components/MainSlider.tsx/MainSlider";
import HomeCard from "./_components/HomeCard/HomeCard";
import CategorySlide from "./_components/CategorySlide/CategorySlide";
import { Product } from "@/types/product.type";
import SearchProducts from "./_components/SearchProduct/SearchProduct";




export default async function Home() {
const data:Product[] = await getAllProducts()

  return (
   <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto">
     <MainSlider/>
     <CategorySlide /> 
<div className="flex flex-wrap">
       <SearchProducts products={data} />
  {/* {data.map( (product:Product,idx:number) => <HomeCard key={idx} product={product}/>)} */}

</div>
   </section>
  );
}

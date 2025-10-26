"use server";

import { getMyToken } from "@/utilities/token";
import axios from "axios";



 export async function onlinePaymentAction(id:string , values : object){

    const token = await getMyToken()

    if (!token){
        throw Error ("Login First")
    }

    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`, values,{
    //   shippingAddress: values  
    // },{
        headers:{
            token : token as string
        }
    })
//       const { data } = await axios.post(
//     `https://ecommerce.routemisr.com/api/v1/orders/${id}?url=${encodeURIComponent(baseUrl)}`,
//     { shippingAddress: values },
//     {
//       headers: {
//         token: token as string,
//       },
//     }
//   );
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // const { data } = await axios.post(
  //   `https://ecommerce.routemisr.com/api/v1/orders/${id}?url=${encodeURIComponent(baseUrl)}`,
  //   { shippingAddress: values },
  //   {
  //     headers: {
  //       token: token as string,
  //     },
  //   }
  // );
    return data
 }
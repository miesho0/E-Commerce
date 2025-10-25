"use server";

import { getMyToken } from "@/utilities/token";
import axios from "axios";



 export async function onlinePaymentAction(id:string , values : object){

    const token = await getMyToken()

    if (!token){
        throw Error ("Login First")
    }

    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}? url=http://localhost:3000`, {
      shippingAddress: values  
    },{
        headers:{
            token : token as string
        }
    })
    return data
 }
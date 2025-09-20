"use server"
import { getMyToken } from "@/utilities/token"
import axios from "axios"


export async function AddToCart(id:string) {

const token  = await getMyToken()
console.log("tokrrrrrrrrrrrrrrr",token)

const values = {
    productId: id
}
// const res=await fetch()
const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", values , 
    {
        headers: {
            token : token
    }
})
return data
}



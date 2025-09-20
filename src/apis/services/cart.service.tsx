import { getUserToken } from "@/lib/server-utils"
import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function addToCart(id:string) {

const token  = await getUserToken()


const values = {
    productId: id
}
const res=await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
    method:"post",
    headers:{
        token:token as string
    },
    body:values
})
console.log(res)
// const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", values , 
//     {
//         headers: {
//             token : token
//     }
// })
// return data
}
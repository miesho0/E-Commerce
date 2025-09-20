"use server";
import axios from "axios";
import { getMyToken } from "@/utilities/token";

export async function removeWishlistAction(id: string) {
  const token = await getMyToken();
  
  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      headers: { token: token },
    }
  );
  return data;
}

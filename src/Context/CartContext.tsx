"use client";
import React, { createContext, useEffect, useState } from "react";
import { AddToCart } from "@/CartActions/addTocart";
import { getUserCartAction } from "@/CartActions/getUserCart";
import { removeAllCartAction } from "@/CartActions/removeAll";
import { removeCartItemAction } from "@/CartActions/removeCartItem";
import { updateCartAction } from "@/CartActions/updateCart";
import { WishlistCart } from "@/CartActions/wishlistcart";
import { removeWishlistAction } from "@/CartActions/removewishlist";
import { getMyToken } from "@/utilities/token";
import axios from "axios";
import { Cart, ProductCart } from "@/types/cart.type";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";

export const cartContext = createContext({});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCart, setnumOfCart] = useState(0);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [products, setproducts] = useState<ProductCart[]>([]);
  const [cartId, setcartId] = useState("");
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [wishlistCount, setwishlistCount] = useState(0);
  const [isloading, setisloading] = useState(false);


  async function getUserCart() {
    // setisloading(true);
    try {
      const data: Cart = await getUserCartAction();
      setnumOfCart(data.numOfCartItems);
      settotalCartPrice(data.data.totalCartPrice);
      setproducts(data.data.products);
      setcartId(data.cartId);
    } catch (error) {
      return error
    } finally {
      // setisloading(false);
    }
  }

  async function addProductsToCart(id: string) {
    // setisloading(true);
    try {
      const data = await AddToCart(id);
      await getUserCart();
      return data;
    } catch (error) {
      return error;
    } finally {
      // setisloading(false);
    }
  }

  async function removeCartItem(id: string) {
    // setisloading(true);
    try {
      const data: Cart = await removeCartItemAction(id);
      setnumOfCart(data.numOfCartItems);
      settotalCartPrice(data.data.totalCartPrice);
      setproducts(data.data.products);
      return data;
    } catch (error) {
      return error;
    } finally {
      // setisloading(false);
    }
  }

  async function updateCart(id: string, count: number) {
    // setisloading(true);
    try {
      const data = await updateCartAction(id, count);
      setnumOfCart(data.numOfCartItems);
      settotalCartPrice(data.data.totalCartPrice);
      setproducts(data.data.products);
      await getUserCart();
      return data;
    } catch (error) {
      return error;
    } finally {
      // setisloading(false);
    }
  }

  async function ClearCart() {
    // setisloading(true);
    try {
      await removeAllCartAction();
      setnumOfCart(0);
      settotalCartPrice(0);
      setproducts([]);
      setcartId("");
    } catch (error) {
      return error;
    } finally {
      // setisloading(false);
    }
  }


  // async function getUserWishlist() {
    // setisloading(true);
  //   try {
  //     const token = await getMyToken();
  //     const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
  //       headers: { token },
  //     });
  //     setWishlistProducts(data.data);
  //     setwishlistCount(data.count);
  //   } catch (error) {
  //     return error 
  //   } finally {
      // setisloading(false);
  //   }
  // }
  async function getUserWishlist() {
  // setisloading(true);
  try {
    const token = await getMyToken();

    
    if (!token) {
      setWishlistProducts([]);
      setwishlistCount(0);
      return;
    }

    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: token,
        },
      }
    );

    setWishlistProducts(data.data);
    setwishlistCount(data.count);
  } catch (error) {
    return error
  } finally {
    // setisloading(false);
  }
}

  async function addProductsToWishlist(id: string) {
    // setisloading(true);
    try {
      await WishlistCart(id);

      setWishlistProducts(prev => [...prev, { id } as Product]);
      setwishlistCount(prev => prev + 1);
    } catch (error) {
      return error 
    } finally {
      // setisloading(false);
    }
  }

  async function removeFromWishlist(id: string) {
    // setisloading(true);
    try {
      await removeWishlistAction(id);
      setWishlistProducts(prev => prev.filter(p => p.id !== id));
      setwishlistCount(prev => prev - 1);
    } catch (error) {
return error
    } finally {
      // setisloading(false);
    }
  }

  const { data: session, status } = useSession();
  const email = session?.user?.email

// useEffect(() => {
//   async function fetchData() {
//     await getUserCart();
//     await getUserWishlist();
//   }
//   fetchData();
// }, [numOfCart , wishlistCount , email]);

useEffect(() => {
  if (!email) return; 
  async function fetchData() {
    await getUserCart();
    await getUserWishlist();
  }
  fetchData();
}, [email]);

  return (
    <cartContext.Provider
      value={{
        isloading,
        numOfCart,
        totalCartPrice,
        products,
        addProductsToCart,
        removeCartItem,
        updateCart,
        ClearCart,
        wishlistProducts,
        wishlistCount,
        addProductsToWishlist,
        removeFromWishlist,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;


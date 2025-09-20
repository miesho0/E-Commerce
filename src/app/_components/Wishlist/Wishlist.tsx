
"use client"
import React, { useContext, useState } from "react";
import { cartContext } from "@/Context/CartContext";
import { useSession } from "next-auth/react";
import { Product } from "@/types/product.type";
import { toast } from "sonner";

export default function WishlistButton({ product }: { product: Product }) {
  const { data: session, status } = useSession();
  const { wishlistProducts, addProductsToWishlist, removeFromWishlist, wishlistCount } =
    useContext(cartContext) as any;

  const [loading, setLoading] = useState(false);

  const isInWishlist = wishlistProducts?.some((p: Product) => p.id === product.id);

  const toggleWishlist = async () => {
    setLoading(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(product.id);

        toast.success("Removed from wishlist", {
          duration: 2000,
          position: "top-right",
          style: {
            background: "green",
            color: "white",
          },
          icon: "❌"
        })
      } else {
        await addProductsToWishlist(product.id);

        toast.success("Added to wishlist", {
          duration: 2000,
          position: "top-right",
          style: {
            background: "green",
            color: "white",
          },
          icon: "✅"
        })
      }
    } catch (error) {
      toast.error("Action failed", { duration: 1500 });
      return error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status === "authenticated" && (
        <button onClick={toggleWishlist} disabled={loading} className="text-2xl cursor-pointer">
          <i className={`fa-solid fa-heart ${isInWishlist ? "text-red-500" : "text-gray-600"}`}></i>
          {/* لو عايز تعرض count جنب القلب ممكن تعمل span صغير */}
        </button>
      )}
    </>
  );
}

"use client"
// import { AddToCart } from '@/CartActions/addTocart'
import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { cartContext } from '@/Context/CartContext'
import { useSession } from 'next-auth/react'

export default function AddButtonCart({ id, classname }: { id: string; classname?: string }) {

    const { addProductsToCart } = useContext(cartContext)
    const { data: session, status } = useSession();

    const [loading, setLoading] = useState(false)
    async function handleAddToCart() {
        setLoading(true);
        const data = await addProductsToCart(id)
        if (data.status === "success") {
            toast.success(data.message, {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "green",
                    color: "white",
                },
                icon: "✅"
            })
            setLoading(false)
        } else {
            toast.error("Failed to add product to cart", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "green",
                    color: "white",
                },
                icon: "❌"

            })
            setLoading(false)
        }
    }

    return (
        <div>
            {status === "authenticated" ? (
                <>
                    <Button disabled={loading} variant="default" className="w-full bg-green-500 hover:bg-green-700 cursor-pointer" onClick={handleAddToCart}>
                        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add To Cart"}
                    </Button>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}



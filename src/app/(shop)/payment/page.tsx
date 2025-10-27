"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form, } from "@/components/ui/form";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { paymentSchema, PaymentSchemaType } from "@/schema/payment.schema";
import { cartContext } from "@/Context/CartContext";
import { cashPaymentAction } from "@/paymentActions/cashPayment";
import Loading from "@/app/loading";
import { onlinePaymentAction } from "@/paymentActions/onlinePayment";


export  default function PaymentPage() {
const { cartId, products, ClearCart } = useContext(cartContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
const [selected, setSelected] = useState<"cash" | "online" | null>(null);

  const form = useForm<PaymentSchemaType>({
     defaultValues:{
        details: "",
        phone: "",
        city: ""
        },
        
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
  
  });


  

  async function cashPayment(values: PaymentSchemaType) {
   
    try {
      setLoading(true);
     const data = await cashPaymentAction(cartId, values);
    //  console.log(data)
    

      toast.success("Order Successfully", {
        duration: 3000,
        position: "top-center",
      });
       ClearCart();
      router.push("/allorders")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        duration: 3000,
        position: "top-center",
      });

    } finally {
      setLoading(false);
    }
  }

   async function onlinePayment(values: PaymentSchemaType) {
   
    try {
      setLoading(true);
     const data = await onlinePaymentAction(cartId, values);
    //  console.log(data)

     if (data.status==="success"){
      window.location.href = data.session.url
     }


      toast.success("Order Successfully", {
        duration: 3000,
        position: "top-center",
      });
       ClearCart();
      router.push("/allorders")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        duration: 3000,
        position: "top-center",
      });

    } finally {
      setLoading(false);
    }
  }

    // if (loading) return <Loading />
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
          <i className="fa-solid fa-cart-shopping text-gray-400 text-6xl mb-4"></i>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mt-20">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-400 opacity-70 ">
          <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
        </div>
      )}



      <div className="mx-auto container my-3 px-2 md:px-5">
        <h2 className="mb-10 font-semibold text-2xl">Order now</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(cashPayment)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

           

            {/* <div className="flex justify-end mt-4">
              <Button
               onClick={form.handleSubmit(cashPayment)}
                // type="submit" 
                disabled={!form.formState.isValid || loading}
                className={`w-35 h-12 border-2 flex items-center justify-center gap-2 ${form.formState.isValid && !loading
                    ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    : "bg-transparent text-gray-400 border-gray-400 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Cash Payment"
                )}
              </Button>
                   <Button
                // type="button"
                onClick={form.handleSubmit(onlinePayment)}
                disabled={!form.formState.isValid || loading}
                className={`w-35 h-12 border-2 flex items-center justify-center gap-2 ${form.formState.isValid && !loading
                    ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    : "bg-transparent text-gray-400 border-gray-400 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Online Payment"
                )}
              </Button>
            </div> */}
            {/* --- Payment Method Selection --- */}
<div className="mt-8">
  <h3 className="text-lg font-semibold mb-4 text-gray-800">
    Select Payment Method
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Cash Payment */}
    <div
      onClick={() => setSelected("cash")}
      className={`cursor-pointer border-2 rounded-xl p-5 flex flex-col items-center justify-center transition-all duration-200
        ${selected === "cash"
          ? "border-green-500 bg-green-50 shadow-md"
          : "border-gray-200 hover:border-green-300 hover:bg-green-50/40"
        }`}
    >
      <i className="fa-solid fa-money-bill-wave text-3xl text-green-600 mb-2"></i>
      <p className="font-semibold text-gray-700">Cash Payment</p>
    </div>

    {/* Online Payment */}
    <div
      onClick={() => setSelected("online")}
      className={`cursor-pointer border-2 rounded-xl p-5 flex flex-col items-center justify-center transition-all duration-200
        ${selected === "online"
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/40"
        }`}
    >
      <i className="fa-solid fa-credit-card text-3xl text-blue-600 mb-2"></i>
      <p className="font-semibold text-gray-700">Online Payment</p>
    </div>
  </div>
</div>

{/* --- Confirm Button --- */}
<div className="flex justify-end mt-8">
  <Button
    type="button"
    onClick={form.handleSubmit(async (values) => {
      if (!selected) {
        toast.error("Please select a payment method", {
          duration: 3000,
          position: "top-center",
        });
        return;
      }

      if (selected === "cash") {
        await cashPayment(values);
      } else {
        await onlinePayment(values);
      }
    })}
    disabled={!form.formState.isValid || loading}
    className={`w-full sm:w-60 h-12 flex items-center justify-center gap-2 font-semibold text-lg rounded-xl transition-all
      ${form.formState.isValid && !loading
        ? "bg-gradient-to-r from-green-500 to-blue-600 text-white hover:opacity-90 shadow-md hover:shadow-lg"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
      }`}
  >
    {loading ? (
      <i className="fa-solid fa-spinner fa-spin"></i>
    ) : (
      "Confirm Payment"
    )}
  </Button>
</div>


          </form>
        </Form>
      </div>
    </div>
  );
}



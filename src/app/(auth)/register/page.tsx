"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form, } from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/schema/register.schema";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  async function registerHandle(values: RegisterSchemaType) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success(data.message, {
        duration: 3000,
        position: "top-center",
      });
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        duration: 3000,
        position: "top-center",
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative mt-20">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-400 opacity-70 ">
          <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
        </div>
      )}



      <div className="mx-auto container my-3 px-2 md:px-5">
        <h2 className="mb-10 font-semibold text-2xl">register now</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(registerHandle)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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

            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                disabled={!form.formState.isValid || loading}
                className={`w-35 h-12 border-2 flex items-center justify-center gap-2 ${form.formState.isValid && !loading
                    ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    : "bg-transparent text-gray-400 border-gray-400 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Register Now"
                )}
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}

"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form, } from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/schema/login.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";


export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  async function loginHandle(values: loginSchemaType) {
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (res?.ok) {
      toast.success("Login successful",{
         position: "top-center",
        duration: 2000,
      });
      router.push(res.url || "/");
      router.refresh(); 
    } else if (res?.error) {
      toast.error("Invalid email or password",{
        position: "top-center",
        duration: 2000,
      });
      setLoading(false);
    }
    else {
      toast.error("Something went wrong",{
         position: "top-center",
        duration: 2000,
      });
      setLoading(false);
    }

  }

  return (
    <div className="relative mt-20 mb-34">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-400 opacity-70">
          <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
        </div>
      )}

      <div className="mx-auto container my-3 px-2 md:px-5">
        <h2 className="mb-10 font-semibold text-2xl">Login now</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(loginHandle)} className="space-y-2">
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

            <div className="flex justify-between mt-4">
              <Link href="/reset-password"> Forget Your Password !?</Link>
              <Button
                type="submit"
                disabled={!form.formState.isValid || loading}
                className={`w-35 h-12 border-2 flex items-center justify-center gap-2 ${form.formState.isValid && !loading
                    ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    : "bg-transparent text-gray-400 border-gray-400 cursor-not-allowed"
                  }`}>
                {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login Now"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

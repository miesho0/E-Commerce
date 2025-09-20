"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton/AppButton";
import { registerFormSchema } from "@/schemas/register.schema";
import { handRegisterUp } from "@/apis/services/register.service";
import { useActionState, useEffect, useTransition } from "react";
// import { ApiError } from "@/components/shared/ApiError";
import { formState } from "@/types/form.type";
import { updatePasswordFormSchema } from "@/schemas/update-password.schema";
import { handleChangePassword } from "@/apis/services/change-password.service";
import { useSession } from "next-auth/react";

export default function RegisterPage() {
    const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [updatePasswordFormAction, setUpdatePasswordFormAction] =
    useActionState(handleChangePassword, formState);
  console.log("updatePasswordFormAction", updatePasswordFormAction);
  const form = useForm({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  // console.log("updatePasswordFormAction", updatePasswordFormAction);
  useEffect(() => {
    if (updatePasswordFormAction) {
      if (
        !updatePasswordFormAction.success &&
        updatePasswordFormAction.message
      ) {
        toast.error(updatePasswordFormAction.message);
      }

      if (updatePasswordFormAction.success) {
        toast.success("Password Updated Successfully");

        const { token, user } = updatePasswordFormAction.data;

        if (token) {
          startTransition(async () => {
            await update({
              token,
              user,
            });
          });
        }

        router.push("/");
      }
    }
  }, [updatePasswordFormAction]);

  // const router = useRouter();
  // async function handRegisterOnSubmit(registerData: registerFormType) {
  //   const data = await handRegisterUp(registerData);
  //   console.log(" data ", data);
  // }
  // type loginFormType = z.infer<typeof loginFormSchema>;
  return (
    <section className="px-40 py-20 flex items-center justify-center ">
      <div className="container max-w-2xl mx-auto shadow-md p-9 shadow-gray-300 rounded">
        {/* {!updatePasswordFormAction.success &&
          updatePasswordFormAction.message &&
          ApiError({
            title: "Failed to register",
            message: updatePasswordFormAction.message,
          })} */}
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(handRegisterOnSubmit)}
            action={setUpdatePasswordFormAction}
            className="space-y-8"
          >
            <h1 className="text-3xl font-semibold">Change Password</h1>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curent Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="current Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>
                    {updatePasswordFormAction.error?.currentPassword?.[0]}
                  </FormMessage>
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
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>
                    {updatePasswordFormAction.error?.password?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>
                    {updatePasswordFormAction.error?.rePassword?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <AppButton
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
                type="submit"
              >
                Update Password
              </AppButton>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
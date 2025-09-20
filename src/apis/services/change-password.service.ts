"use server";
import { getUserToken } from "@/lib/server-utils";
import { registerFormSchema } from "@/schemas/register.schema";
import {
  updatePasswordFormSchema,
  updatePasswordFormSchemaType,
} from "@/schemas/update-password.schema";
import { formStateType, formValuesType } from "@/types/form.type";
import z from "zod";

export async function handleChangePassword(
  prevState: formStateType,
  formData: FormData
) {
  const formValues = {
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  };
  const token = await getUserToken();

  const parsedData = updatePasswordFormSchema.safeParse(formValues);
  if (!parsedData.success) {
    return {
      success: false,
      error:
        parsedData.error.flatten<updatePasswordFormSchemaType>().fieldErrors,
      // error: z.treeifyError(parsedData.error).properties,
      message: null,
    };
  }

    try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(formValues),
      }
    );

    const data = await res.json();
    // console.log("data", data);
    if (!res.ok) {
      return {
        data: null,
        success: false,
        error: {},
        message: data.message,
      };
    }

    // Return a success state
    return {
      success: true,
      data: data,
      error: {},
      message: "Password Updated successfully.",
    };
  } catch (error) {
    // Return an error state
    return {
      data: null,
      success: false,
      error: {},
      message: (error as Error).message,
    };
  }
}

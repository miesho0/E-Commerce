// "use server"

// import { decode } from 'next-auth/jwt'
// import { cookies } from 'next/headers'


// export async function getMyToken() {
 
//   const x = (await cookies()).get("next-auth.session-token")?.value
//   const token = await decode({
//     token: x,
//     secret: process.env.AUTH_SECRET!
//   })
//   // console.log(token)
//   return token?.token
// }
"use server"

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("next-auth.session-token")?.value;
  
  if (!sessionCookie) return null;

  try {
    const token = await decode({
      token: sessionCookie,
      secret: process.env.NEXTAUTH_SECRET,
    });
    return token?.token || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
     const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
  const token = await getToken({ req: request, cookieName });
 

    // const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;
    const authPage = ['/login', '/register'];
    const routes = ["/", "/home", "/cart", "/wishlist",  "/payment" ,  "/products", "/categories" , "/allorders" , "/brands", "/productdetails" , "/password" , "/change-password"  , "/checkout"]

    if (!token && routes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    else if (token && authPage.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    // matcher: ["/", "/home", "/cart", "/wishlist", "/products", "/categories", "/brands", "/productdetails", "/login", "/register", "/checkout", "/orders", "/profile", "/admin/:path*"],
        matcher: ["/cart", "/wishlist", "/login", "/register", "/payment",  "/profile", "/checkout" , "/allorders" , "/password" , "/change-password"   ,"/admin/:path*"],
}
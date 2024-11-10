import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Define allowed emails
const allowedEmails = ['yurik2061@gmail.com', 'mickeyKh2061@gmail.com'];

export async function middleware(req) {
  // Retrieve token from the request, using NextAuth's JWT helper
  const token = await getToken({ req });
  
  if (!token) {
    // No token found, meaning the user is not authenticated, redirect to login
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Check if the user's email is in the allowedEmails list
  const userEmail = token.email;
  if (userEmail && allowedEmails.includes(userEmail)) {
    return NextResponse.next(); // Allow the request to continue
  }

  // If email is not allowed, redirect to an access denied page
  return NextResponse.redirect(new URL('/access-denied', req.url));
}

export const config = {
  matcher: [
    // Protect all routes except public ones
    "/((?!.+\\.[\\w]+$|_next|/auth|/public).*)",
    // You can add or adjust the matcher to include specific folders like API routes
    "/(api|trpc)(.*)"
  ]
};

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define allowed emails
const allowedEmails = ['yurik2061@gmail.com', 'mickeyKh2061@gmail.com'];

export async function middleware(req: NextRequest) {
  // Retrieve token from the request, using NextAuth's JWT helper
  const token = await getToken({ req });
  
  if (!token) {
    console.log("No token, redirecting to /auth/signin");
    // No token found, meaning the user is not authenticated, redirect to login
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Check if the user's email is in the allowedEmails list
  const userEmail = token.email;
  console.log("User email:", userEmail);
  if (userEmail && allowedEmails.includes(userEmail)) {
    return NextResponse.next(); // Allow the request to continue
  }
  console.log("Unauthorized email, redirecting to /access-denied");
  // If email is not allowed, redirect to an access denied page
  return NextResponse.redirect(new URL('/access-denied', req.url));
}

export const config = {
  matcher: [
    // Protect all routes except public ones and the login page
    "/((?!.+\\.[\\w]+$|_next|/auth/signin|/access-denied|/public).*)",
    "/(api|trpc)(.*)"
  ]
};
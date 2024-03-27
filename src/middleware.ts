import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "./app/api/router/routeUrls";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value || "";
	if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
		request.cookies.delete("token");
		const response = NextResponse.redirect(new URL("/login", request.url));
		response.cookies.delete("token");
		return response;
	}
	if (authRoutes.includes(request.nextUrl.pathname) && token) {
		return NextResponse.redirect(new URL("/home", request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/home/:path*", "/login/:path*", "/register/:path*", "/api/users/logout", '/student/:path*'],
};

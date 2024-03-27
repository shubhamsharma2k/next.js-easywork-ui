import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
	try {
		const token = request.cookies.get("token")?.value || "";
		let isValidSession = false;
		if (token) {
			const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
			isValidSession = decodedToken.exp < Date.now();

			if (isValidSession) {
				return NextResponse.json({ status: "Ok" }, { status: 200 });
			}
		}
		return NextResponse.json({ status: "User is not authenticated" }, { status: 403 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}


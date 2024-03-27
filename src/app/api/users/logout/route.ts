import { connect } from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

//@route api/users/logout
//@desc  logout User
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({},{status:200});
    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
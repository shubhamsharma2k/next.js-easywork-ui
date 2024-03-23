import { getDataFromToken } from "@/app/helpers/dataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connect } from "@/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findById({ _id: userID }).select("-password");

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const requestBody = await request.json();
    const { userDetails } = requestBody;
    let user = await User.findByIdAndUpdate({ _id: userID }, userDetails);

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

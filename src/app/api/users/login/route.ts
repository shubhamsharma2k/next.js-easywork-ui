import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

//@route api/users/login
//@desc  login User
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // Find user from db using email
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return NextResponse.json({ error: "User does not exist!" }, { status: 404 });
    }

    // Check if password is correct
    const validatePassword = await bcryptjs.compare(password, foundUser.password);

    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid Email or Password!" }, { status: 400 });
    }

    // Create tokendata

    const tokenData = {
      user: {
        id: foundUser.id,
      },
    };

    const user = {
      _id: foundUser._id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const finalResponseObj = {
      user: user,
      token: token,
    };

    const response = NextResponse.json(finalResponseObj);

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

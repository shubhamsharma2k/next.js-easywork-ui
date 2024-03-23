import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    console.log(requestBody)

    const { firstName, lastName, email, password } = requestBody;

    // Find user from db using email
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await newUser.save();
    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

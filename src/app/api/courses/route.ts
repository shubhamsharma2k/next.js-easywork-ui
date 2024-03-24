import { connect } from "@/dbconfig/dbConfig";
import Student from "@/models/Student";
import Courses from "@/models/Courses";
import { NextRequest, NextResponse } from "next/server";

connect();

//@route api/courses
//@desc  get courses
export async function GET(request: NextRequest) {
	try {
		const courses = await Courses.find({});
		if (courses) {
			return NextResponse.json(courses, { status: 200 });
		}
		return NextResponse.json([], { status: 400 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

//@route api/courses
//@desc  add new course
export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const newCourseData = requestBody;
		const course = new Courses(newCourseData);
		const createdCourse = await course.save();
		return NextResponse.json(createdCourse, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}


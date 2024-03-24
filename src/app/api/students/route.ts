import { connect } from "@/dbconfig/dbConfig";
import Student from "@/models/Student";
import Courses from "@/models/Courses";
import { NextRequest, NextResponse } from "next/server";

connect();

//@route api/students
//@desc  get students
export async function GET(request: NextRequest) {
	try {
		let students = await Student.find({});
		let studentDetails: any[] = [];
		if (students) {
			for (let student of students) {
				if (student) {
					let studentDetail: any = {
						studentId: student.studentId,
						firstName: student.firstName,
						lastName: student.lastName,
						email: student.email,
						dateOfBirth: student.dateOfBirth,
						fathersName: student.fathersName,
						mothersName: student.mothersName,
						fatherOccupation: student.fatherOccupation,
						motherOccupation: student.motherOccupation,
						residentialAddress: student.residentialAddress,
						primaryPhone: student.primaryPhone,
						secondaryPhone: student.secondaryPhone,
						nationality: student.nationality,
						dateOfAdmission: student.dateOfAdmission,
						session: student.session,
						courseInfo: {
							scholarship: student.courseInfo?.scholarship,
							amountPaid: student.courseInfo?.amountPaid,
							amountPending: student.courseInfo?.amountPending,
							transactions: student.courseInfo?.transactions,
						},
					};

					let idOfCourse = student.courseInfo?.course?._id;
					if (idOfCourse) {
						let courseDetails = await Courses.findById(idOfCourse);
						if (courseDetails) {
							studentDetail.courseInfo.course = courseDetails;
							studentDetails.push(studentDetail);
						}
					}
				}
			}
		}
		return NextResponse.json(studentDetails, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

//@route api/students
//@desc  add new students
export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const totalStudents = await Student.find({});
		const {
			firstName,
			lastName,
			email,
			dateOfBirth,
			fathersName,
			mothersName,
			fatherOccupation,
			motherOccupation,
			residentialAddress,
			primaryPhone,
			secondaryPhone,
			nationality,
			courseInfo,
			dateOfAdmission,
			session,
		} = requestBody;

		const course = await Courses.findById(courseInfo.id);
		let studentDataToPost = {
			studentId: totalStudents.length + 1,
			firstName,
			lastName,
			email,
			dateOfBirth,
			fathersName,
			mothersName,
			fatherOccupation,
			motherOccupation,
			residentialAddress,
			primaryPhone,
			secondaryPhone,
			nationality,
			dateOfAdmission,
			courseInfo: {
				course: course,
				...courseInfo,
			},
			session,
		};

		const newStudent = new Student(studentDataToPost);
		const createdStudent = await newStudent.save();
		return NextResponse.json(createdStudent, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

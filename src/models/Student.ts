import mongoose from "mongoose";
import Courses from "./Courses";
const Transactions = new mongoose.Schema({
	receiptNo: {
		type: String,
	},
	semester: {
		type: String,
	},
	amount: {
		type: String,
	},
	transactionType: {
		type: String,
	},
	date: {
		type: Date,
	},
});

const StudentSchema = new mongoose.Schema({
	studentId: {
		type: String,
	},
	firstName: {
		type: String,
	},
	lastName: { type: String },
	dateOfBirth: {
		type: Date,
	},
	email: {
		type: String,
		unique: true,
	},
	residentialAddress: {
		type: String,
	},
	primaryPhone: {
		type: String,
	},
	secondaryPhone: {
		type: String,
	},
	fathersName: {
		type: String,
	},
	mothersName: {
		type: String,
	},
	fatherOccupation: {
		type: String,
	},
	motherOccupation: {
		type: String,
	},
	nationality: {
		type: String,
	},
	courseInfo: {
		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: Courses,
		},
		scholarship: {
			type: String,
		},
		amountPaid: {
			type: String,
		},
		amountPending: {
			type: String,
		},
		transactions: {
			type: [Transactions],
		},
	},
	dateOfAdmission: {
		type: Date,
	},
	session: {
		type: String,
	},
});

const Student = mongoose.models.students ?? mongoose.model("students", StudentSchema);
export default Student;


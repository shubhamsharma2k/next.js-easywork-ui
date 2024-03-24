import mongoose from "mongoose";

const Affiliations = new mongoose.Schema({
	name: {
		type: String || null,
	},
});

const CoursesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	feeAmount: {
		type: String,
		required: true,
	},
	affiliations: { type: Affiliations },
	semesters: {
		type: String,
	},
});

const Courses = mongoose.models.courses ?? mongoose.model("courses", CoursesSchema);
export default Courses;


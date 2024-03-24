import axios from "axios";
import { CoursesModel } from "../store/models/course";

const url = "http://localhost:3000/api";

export const CourseService = {
	getCourses: async () => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					// Authorization: `${token}`,
				},
			};
			return await axios.get("/api/courses", config);
		} catch (err: any) {
			return err;
		}
	},
	addCourse: async (courseData: CoursesModel) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					// Authorization: `${token}`,
				},
			};
			return await axios.post("/api/courses", courseData, config);
		} catch (err: any) {
			return err;
		}
	},
	editCourse: async (courseBody: CoursesModel) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					// Authorization: `${token}`,
				},
			};
			return await axios.put(url + "/" + courseBody._id, courseBody, config);
		} catch (err: any) {
			return err;
		}
	},
	deleteCourse: async (id: string) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					// Authorization: `${token}`,
				},
			};
			return await axios.delete(url + "/" + id, config);
		} catch (err: any) {
			return err;
		}
	},
};


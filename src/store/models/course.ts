import { Action, action, Thunk, thunk } from "easy-peasy";
import { store } from "../config";
import { toast } from "react-toastify";
export interface CourseModel {
  getCourses: Thunk<CourseModel>;
  postCourse: Thunk<CourseModel, CoursesModel>;
  editCourse: Thunk<CourseModel, CoursesModel>;
  deleteCourse: Thunk<CourseModel, string>;
  courses: CoursesModel[];
  setCourses: Action<CourseModel, CoursesModel[]>;
  clearCourseMetadata: Thunk<CourseModel>;
}

export interface CoursesModel {
  _id: string;
  name: string;
  feeAmount: string;
  semesters: string;
  affiliations: { name: string } | null;
  checked?: boolean;
}

export const course: CourseModel = {
  courses: [],
  setCourses: action((state, payload) => {
    state.courses = payload;
  }),
  getCourses: thunk(async (actions, payload, { fail, injections, getState }) => {
    const { courseService } = injections;

    const rsp = await courseService.getCourses();
    if (rsp.status === 200) {
      actions.setCourses(rsp.data);
    }
  }),
  postCourse: thunk(async (actions, payload, { fail, injections, getState }) => {
    const { courseService } = injections;

    const rsp = await courseService.addCourse(payload);
    let response = false;
    if (rsp.status === 201) {
      toast.success(`New course ${payload.name} added successfully.`, {
        position: "top-right",
      });
      await actions.getCourses();
      response = true;
    } else {
      toast.error(`Error adding course ${payload.name} !`, {
        position: "top-right",
      });
    }
    return response;
  }),
  editCourse: thunk(async (actions, payload, { fail, injections, getState }) => {
    const { courseService } = injections;

    const rsp = await courseService.editCourse(payload);
    let response = false;
    if (rsp.status === 200) {
      toast.success(`Course ${payload.name} updated Successfully.`, {
        position: "top-right",
      });
      await actions.getCourses();
      response = true;
    } else {
      toast.error(`Error updating course ${payload.name} !`, {
        position: "top-right",
      });
    }
    return response;
  }),
  deleteCourse: thunk(async (actions, payload, { fail, injections, getState }) => {
    const { courseService } = injections;

    const rsp = await courseService.deleteCourse(payload);
    let response = false;
    if (rsp.status === 200) {
      toast.success(`Course deleted Successfully.`, {
        position: "top-right",
      });
      await actions.getCourses();
      response = true;
    } else {
      toast.error(`Error deleting course!`, {
        position: "top-right",
      });
    }

    return response;
  }),
  clearCourseMetadata: thunk((actions, payload, { getState }) => {
    actions.setCourses([]);
  }),
};

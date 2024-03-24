//store imports
import { createStore, createTypedHooks } from "easy-peasy";
import { StoreModel } from "./model";

//services imports
import { CourseService } from "../services/CourseService";
import { StudentService } from "../services/StudentService";
import { AuthService } from "../services/AuthService";

//models imports
import { student } from "./models/student";
import { auth } from "./models/auth";
import { course } from "./models/course";
import { misc } from "./models/misc";

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;

export const storeModel: StoreModel = {
  student,
  auth,
  course,
  misc,
};

export const store = createStore(storeModel, {
  devTools: true,
  name: "easy-work",
  injections: {
    studentService: StudentService,
    authService: AuthService,
    courseService: CourseService,
  },
});

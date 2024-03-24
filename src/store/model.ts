import { AuthModel } from "./models/auth";
import { CourseModel } from "./models/course";
import { MiscModel } from "./models/misc";
import { StudentModel } from "./models/student";

export interface StoreModel {
  student: StudentModel;
  auth: AuthModel;
  course: CourseModel;
  misc:MiscModel;
}

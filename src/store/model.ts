import { AuthModel } from './models/auth'
import { CourseModel } from './models/course'
import { StudentModel } from './models/student'

export interface StoreModel {
    student: StudentModel
    auth: AuthModel
    course: CourseModel
}

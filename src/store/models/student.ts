import { Action, action, Thunk, thunk } from "easy-peasy";
import { store } from "../config";
import { toast } from "react-toastify";
import { getBearerToken } from "../../services/TokenService";
export interface StudentModel {
  getStudents: Thunk<StudentModel>;
  addNewStudent: Thunk<StudentModel, StudentDetailsModel>;
  updateStudent: Thunk<StudentModel, { studentId: string; StudentDetails: StudentDetailsModel }>;
  deleteStudent: Thunk<StudentModel, string>;
  students: StudentDetailsModel[];
  setStudents: Action<StudentModel, StudentDetailsModel[]>;
  selectedStudent: StudentDetailsModel;
  setSelectedStudent: Action<StudentModel, StudentDetailsModel>;
  metadataLoading: boolean;
  setMetadataLoading: Action<StudentModel, boolean>;
  metadataFetched: boolean;
  setMetadataFetched: Action<StudentModel, boolean>;
  clearMetadata: Thunk<StudentModel>;
}

export interface StudentDetailsModel {
  studentId?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  residentialAddress: string;
  primaryPhone: string;
  secondaryPhone: string;
  fathersName: string;
  mothersName: string;
  fatherOccupation: string;
  motherOccupation: string;
  nationality: string;
  courseInfo: StudentCourseInfoModel;
  session: string;
  dateOfAdmission: string;
  checked?: boolean;
}

export interface StudentCourseInfoModel {
  course: {
    id: string;
    name: string;
    feeAmount: string;
    semesters: string;
    affiliations: null | { name: string };
  };
  scholarship: string;
  amountPaid: string;
  amountPending: string;
  transactions: TransactionsModel[];
}

export interface TransactionsModel {
  receiptNo: string;
  semester: string;
  amount: string;
  transactionType: string;
  date: string;
}

export const student: StudentModel = {
  metadataLoading: false,
  metadataFetched: false,
  students: [],
  selectedStudent: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    residentialAddress: "",
    primaryPhone: "",
    secondaryPhone: "",
    fathersName: "",
    mothersName: "",
    fatherOccupation: "",
    motherOccupation: "",
    nationality: "",
    studentId: "",
    courseInfo: {
      course: {
        id: "",
        name: "",
        feeAmount: "",
        affiliations: null,
        semesters: "",
      },
      amountPaid: "",
      amountPending: "",
      scholarship: "",
      transactions: [],
    },
    session: "",
    dateOfAdmission: "",
  },
  setMetadataLoading: action((state, payload) => {
    state.metadataLoading = payload;
  }),
  setMetadataFetched: action((state, payload) => {
    state.metadataFetched = payload;
  }),
  setSelectedStudent: action((state, payload) => {
    state.selectedStudent = payload;
  }),
  setStudents: action((state, payload) => {
    state.students = payload;
  }),
  getStudents: thunk(async (actions, payload, { fail, injections, getState }) => {
    const { studentService } = injections;
    actions.setMetadataLoading(true);
    actions.setMetadataFetched(false);
    const rsp = await studentService.getStudents();
    if (rsp.status === 200) {
      actions.setStudents(rsp.data);
      await store.getActions().course.getCourses();
      actions.setMetadataFetched(true);
    }
    actions.setMetadataLoading(false);
    return rsp;
  }),
  addNewStudent: thunk(async (actions, payload, { fail, injections, getState }) => {
    const { studentService } = injections;
    actions.setMetadataLoading(true);
    const rsp = await studentService.addNewStudent(payload);
    if (rsp.status === 201) {
      toast.success("New student added successfully.", {
        position: "top-right",
      });
      await actions.getStudents();
    } else {
      toast.error("Error adding new student!", {
        position: "top-right",
      });
      actions.setMetadataLoading(false);
    }
  }),
  updateStudent: thunk(async (actions, payload, { fail, injections, getState }) => {
    const { studentService } = injections;
    actions.setMetadataLoading(true);
    const rsp = await studentService.updateStudent(payload.studentId, payload.StudentDetails);
    if (rsp.status === 200) {
      toast.success("Student updated successfully.", {
        position: "top-right",
      });
      await actions.getStudents();
    } else {
      toast.error("Error updating student!", {
        position: "top-right",
      });
      actions.setMetadataLoading(false);
    }
    return rsp;
  }),
  deleteStudent: thunk(async (actions, payload, { fail, injections, getState }) => {
    const { studentService } = injections;
    actions.setMetadataLoading(true);
    const rsp = await studentService.deleteStudent(payload);
    if (rsp.status === 200) {
      toast.success("Student deleted successfully.", {
        position: "top-right",
      });
      await actions.getStudents();
    } else {
      toast.error("Error deleting student!", {
        position: "top-right",
      });
      actions.setMetadataLoading(false);
    }
    return rsp;
  }),
  clearMetadata: thunk((actions, payload, { getState }) => {
    actions.setStudents([]);
    actions.setMetadataFetched(false);
    actions.setMetadataLoading(false);
    actions.setSelectedStudent({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      residentialAddress: "",
      primaryPhone: "",
      secondaryPhone: "",
      fathersName: "",
      mothersName: "",
      fatherOccupation: "",
      motherOccupation: "",
      nationality: "",
      studentId: "",
      courseInfo: {
        course: {
          id: "",
          name: "",
          feeAmount: "",
          affiliations: null,
          semesters: "",
        },
        amountPaid: "",
        amountPending: "",
        scholarship: "",
        transactions: [],
      },
      session: "",
      dateOfAdmission: "",
    });
    store.getActions().auth.setIsAuthenticated(false);
    store.getActions().auth.setUser({
      userData: {
        email: "",
        firstName: "",
        lastName: "",
      },
    });
  }),
};

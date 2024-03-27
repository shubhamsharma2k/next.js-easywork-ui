'use client'
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useStoreState } from "@/store/config";
import { StudentDetailsModel } from "@/store/models/student";
import DatePicker from "react-datepicker";

const PersonalInformation = (props: {
  editMode: boolean;
  setEditMode: Function;
  formValue: StudentDetailsModel;
  updateForm: Function;
}) => {
  const { formValue, updateForm } = props;
  const { courses } = useStoreState((state) => state.course);

  const onChangeHandler = (e: any) => {
    updateForm({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-1">
          <FormControl isRequired>
            <FormLabel fontSize="14px">Id</FormLabel>
            <Input value={formValue.studentId} size="xs" disabled={true} variant="filled" />
          </FormControl>
        </div>
        <div className="col-2">
          <FormControl isRequired>
            <FormLabel fontSize="14px">First Name</FormLabel>
            <Input
              required
              name="firstName"
              value={formValue.firstName}
              size="xs"
              variant="filled"
              onChange={onChangeHandler}
            />
          </FormControl>
        </div>
        <div className="col-2">
          <FormControl isRequired>
            <FormLabel fontSize="14px">Last Name</FormLabel>
            <Input name="lastName" value={formValue.lastName} size="xs" variant="filled" onChange={onChangeHandler} />
          </FormControl>
        </div>
        <div className="col-2">
          <FormControl>
            <FormLabel fontSize="14px">Date Of Admission</FormLabel>
            <div>
              <DatePicker
                isClearable
                className="datePicker"
                dateFormat={"dd/MM/yyyy"}
                selected={formValue.dateOfAdmission ? new Date(formValue.dateOfAdmission) : null}
                onChange={(date: any) => {
                  updateForm({ ...formValue, dateOfAdmission: date });
                }}
              />
            </div>
          </FormControl>
        </div>
        <div className="col-2">
          <FormControl>
            <FormLabel fontSize="14px">Session</FormLabel>
            <Input name="session" value={formValue.session} size="xs" variant="filled" onChange={onChangeHandler} />
          </FormControl>
        </div>
        <div className="col-3">
          <FormControl isRequired>
            <FormLabel fontSize="14px">Course</FormLabel>
            <Select
              name="course"
              size="xs"
              value={formValue.courseInfo.course.name}
              variant="filled"
              onChange={(e) => {
                updateForm({
                  ...formValue,
                  courseInfo: {
                    ...formValue.courseInfo,
                    course: {
                      ...formValue.courseInfo.course,
                      name: e.target.value,
                      id: courses.filter((course) => course.name === e.target.value)[0]._id,
                    },
                  },
                });
              }}
            >
              {courses &&
                courses.length > 0 &&
                courses.map((course, index) => (
                  <option value={course.name} key={index}>
                    {course.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px">Date Of Birth</FormLabel>
            <Input value={formValue.dateOfBirth} size="xs" variant="filled" />
          </FormControl>
        </div>
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px">Email Address</FormLabel>
            <Input name="email" value={formValue.email} size="xs" variant="filled" onChange={onChangeHandler} />
          </FormControl>
        </div>
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px">Residential Address</FormLabel>
            <Input
              name="residentialAddress"
              value={formValue.residentialAddress}
              size="xs"
              variant="filled"
              onChange={onChangeHandler}
            />
          </FormControl>
        </div>
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px">Primary Phone</FormLabel>
            <Input
              name="primaryPhone"
              value={formValue.primaryPhone}
              size="xs"
              variant="filled"
              onChange={onChangeHandler}
            />
          </FormControl>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px">Secondary Phone</FormLabel>
            <Input
              name="secondaryPhone"
              value={formValue.secondaryPhone}
              size="xs"
              variant="filled"
              onChange={onChangeHandler}
            />
          </FormControl>
        </div>
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px">Father's Name</FormLabel>
            <Input
              name="fathersName"
              value={formValue.fathersName}
              size="xs"
              variant="filled"
              onChange={onChangeHandler}
            />
          </FormControl>
        </div>
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px">Mother's Name</FormLabel>
            <Input
              name="mothersName"
              value={formValue.mothersName}
              size="xs"
              variant="filled"
              onChange={onChangeHandler}
            />
          </FormControl>
        </div>
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px">Father's Occupation</FormLabel>
            <Input
              name="fatherOccupation"
              value={formValue.fatherOccupation}
              size="xs"
              variant="filled"
              onChange={onChangeHandler}
            />
          </FormControl>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px">Mother's Occupation</FormLabel>
            <Input
              name="motherOccupation"
              value={formValue.motherOccupation}
              size="xs"
              variant="filled"
              onChange={onChangeHandler}
            />
          </FormControl>
        </div>
        <div className="col-3">
          <FormControl>
            <FormLabel fontSize="14px" as="b">
              Nationality
            </FormLabel>
            <Input
              name="nationality"
              value={formValue.nationality}
              size="xs"
              variant="filled"
              onChange={onChangeHandler}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;

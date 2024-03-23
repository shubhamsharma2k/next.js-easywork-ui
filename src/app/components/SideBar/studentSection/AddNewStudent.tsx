"use client";

import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStoreActions, useStoreState } from "@/store/config";
import { StudentDetailsModel } from "@/store/models/student";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { cloneDeep, isEqual } from "lodash-es";

const AddNewStudent = () => {
  const [modal, setModal] = useState(false);
  const { courses } = useStoreState((state) => state.course);
  const initInvalidFields = {
    firstName: false,
    lastName: false,
    email: false,
    course: false,
    session: false,
    dateOfAdmission: false,
  };
  const { addNewStudent } = useStoreActions((action) => action.student);

  const initValue = {
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
        feeAmount: "",
        name: "",
        affiliations: null,
        id: "",
        semesters: "",
      },
      amountPaid: "",
      amountPending: "",
      scholarship: "",
      transactions: [],
    },
    session: "",
    dateOfAdmission: "",
  };
  const [isInvalidField, setIsInvalidField] = useState(initInvalidFields);
  const [formValue, updateForm] = useState<StudentDetailsModel>(initValue);

  const onChangeHandler = (e: any) => {
    updateForm({
      ...formValue,
      [e.target.name]: e.target.value,
    });
    let copiedInvalidFields: any = cloneDeep(isInvalidField);
    if (
      e.target.name === "firstName" ||
      e.target.name === "lastName" ||
      e.target.name === "email" ||
      e.target.name === "session" ||
      e.target.name === "dateOfAdmission"
    ) {
      if (e.target.value === "") {
        copiedInvalidFields[e.target.name] = true;
        setIsInvalidField(copiedInvalidFields);
      } else {
        copiedInvalidFields[e.target.name] = false;
        setIsInvalidField(copiedInvalidFields);
      }
    }
  };

  const handleAddStudent = async () => {
    console.log("PAYLOAD ->", formValue);
    await addNewStudent(formValue);
  };

  const onClose = () => {
    setModal(false);
    updateForm(initValue);
    setIsInvalidField(initInvalidFields);
  };

  const handleDisableSubmit = () => {
    if (
      isInvalidField.firstName ||
      isInvalidField.lastName ||
      isInvalidField.email ||
      isInvalidField.session ||
      isInvalidField.dateOfAdmission ||
      isEqual(initValue, formValue)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div>
        <Button
          variant="link"
          size="xs"
          colorScheme="blue"
          onClick={() => setModal(true)}
          leftIcon={<PlusSquareIcon />}
        >
          Add Student
        </Button>
      </div>
      {modal && (
        <Modal onClose={onClose} isOpen={modal} isCentered size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Student</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Divider orientation="horizontal" />
              <FormControl className="row mb-4" isInvalid={isInvalidField.firstName} isRequired>
                <div className="col-4">
                  <FormLabel fontSize="14px" style={{ display: "inline" }}>
                    First Name
                  </FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    required
                    name="firstName"
                    value={formValue.firstName}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                  {isInvalidField.firstName && <FormErrorMessage>First name is required.</FormErrorMessage>}
                </div>
              </FormControl>

              <FormControl className="row mb-4" isInvalid={isInvalidField.lastName} isRequired>
                <div className="col-4">
                  <FormLabel fontSize="14px">Last Name</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="lastName"
                    value={formValue.lastName}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                  {isInvalidField.lastName && <FormErrorMessage>Last name is required.</FormErrorMessage>}
                </div>
              </FormControl>
              <FormControl className="row mb-4" isInvalid={isInvalidField.dateOfAdmission} isRequired>
                <div className="col-4">
                  <FormLabel fontSize="14px">Date Of Addmission</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="dateOfAdmission"
                    value={formValue.dateOfAdmission}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                  {isInvalidField.dateOfAdmission && (
                    <FormErrorMessage>Date Of Admission is required.</FormErrorMessage>
                  )}
                </div>
              </FormControl>
              <FormControl className="row mb-4" isInvalid={isInvalidField.session} isRequired>
                <div className="col-4">
                  <FormLabel fontSize="14px">Session</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="session"
                    value={formValue.session}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                  {isInvalidField.session && <FormErrorMessage>Session is required.</FormErrorMessage>}
                </div>
              </FormControl>
              <FormControl className="row mb-4" isInvalid={isInvalidField.course} isRequired>
                <div className="col-4">
                  <FormLabel fontSize="14px">Course</FormLabel>
                </div>
                <div className="col-5">
                  <Select
                    name="course"
                    size="xs"
                    value={formValue.courseInfo.course.name}
                    variant="filled"
                    onChange={(e) => {
                      const course = courses.filter((course) => course.name === e.target.value)[0];
                      updateForm({
                        ...formValue,
                        courseInfo: {
                          ...formValue.courseInfo,
                          course: {
                            ...course,
                            id: course._id,
                          },
                        },
                      });
                    }}
                  >
                    <option value={""}>None</option>
                    {courses &&
                      courses.length > 0 &&
                      courses.map((course, index) => (
                        <option value={course.name} key={index}>
                          {course.name}
                        </option>
                      ))}
                  </Select>
                  {isInvalidField.firstName && <FormErrorMessage>Course name is required.</FormErrorMessage>}
                </div>
              </FormControl>
              <FormControl className="row mb-4">
                <div className="col-4">
                  <FormLabel fontSize="14px">Date Of Birth</FormLabel>
                </div>
                <div className="col-5">
                  <Input value={formValue.dateOfBirth} size="xs" variant="filled" />
                </div>
              </FormControl>
              <FormControl className="row mb-4" isInvalid={isInvalidField.email} isRequired>
                <div className="col-4">
                  <FormLabel fontSize="14px">Email Address</FormLabel>
                </div>
                <div className="col-5">
                  <Input name="email" value={formValue.email} size="xs" variant="filled" onChange={onChangeHandler} />
                  {isInvalidField.email && <FormErrorMessage>Email is required.</FormErrorMessage>}
                </div>
              </FormControl>
              <FormControl className="row mb-4">
                <div className="col-4">
                  <FormLabel fontSize="14px">Residential Address</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="residentialAddress"
                    value={formValue.residentialAddress}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                </div>
              </FormControl>
              <FormControl className="row mb-4">
                <div className="col-4">
                  <FormLabel fontSize="14px">Primary Phone</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="primaryPhone"
                    value={formValue.primaryPhone}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                </div>
              </FormControl>
              <FormControl className="row mb-4">
                <div className="col-4">
                  <FormLabel fontSize="14px">Secondary Phone</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="secondaryPhone"
                    value={formValue.secondaryPhone}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                </div>
              </FormControl>
              <FormControl className="row mb-4">
                <div className="col-4">
                  <FormLabel fontSize="14px">Father's Name</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="fathersName"
                    value={formValue.fathersName}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                </div>
              </FormControl>
              <FormControl className="row mb-4">
                <div className="col-4">
                  <FormLabel fontSize="14px">Mother's Name</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="mothersName"
                    value={formValue.mothersName}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                </div>
              </FormControl>
              <FormControl className="row mb-4">
                <div className="col-4">
                  <FormLabel fontSize="14px">Father's Occupation</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="fatherOccupation"
                    value={formValue.fatherOccupation}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                </div>
              </FormControl>
              <FormControl className="row mb-4">
                <div className="col-4">
                  <FormLabel fontSize="14px">Mother's Occupation</FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="motherOccupation"
                    value={formValue.motherOccupation}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                </div>
              </FormControl>
              <FormControl className="row mb-4">
                <div className="col-4">
                  <FormLabel fontSize="14px" as="b">
                    Nationality
                  </FormLabel>
                </div>
                <div className="col-5">
                  <Input
                    name="nationality"
                    value={formValue.nationality}
                    size="xs"
                    variant="filled"
                    onChange={onChangeHandler}
                  />
                </div>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleAddStudent}
                colorScheme="blue"
                className="me-4"
                size="sm"
                isDisabled={handleDisableSubmit()}
              >
                Submit
              </Button>
              <Button onClick={onClose} size="sm">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default AddNewStudent;

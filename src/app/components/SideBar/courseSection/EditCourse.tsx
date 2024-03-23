"use client";

import React, { useState } from "react";

import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  FormControl,
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
import { useStoreActions, useStoreState } from "@/store/config";
import { CoursesModel } from "@/store/models/course";

const EditCourse = () => {
  const [modal, setModal] = useState(false);
  const { courses } = useStoreState((state) => state.course);
  const { editCourse } = useStoreActions((action) => action.course);
  const [formValue, updateForm] = useState<CoursesModel>({
    _id: "",
    name: "",
    feeAmount: "",
    affiliations: {
      name: "",
    },
    semesters: "",
  });

  const handleChange = (e: any) => {
    updateForm({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const onClose = () => {
    updateForm({
      name: "",
      feeAmount: "",
      affiliations: {
        name: "",
      },
      semesters: "",
      _id: "",
      checked: false,
    });
    setModal(false);
  };

  const handleEditCourse = async () => {
    const response = await editCourse(formValue);
    if (response) {
      onClose();
    }
  };

  return (
    <div>
      <Button variant="link" size="xs" colorScheme="blue" leftIcon={<EditIcon />} onClick={() => setModal(true)}>
        Edit Courses
      </Button>
      {modal && (
        <Modal onClose={onClose} isOpen={modal} isCentered size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Course</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Divider orientation="horizontal" />
              <div className="mb-4">
                <FormControl>
                  <FormLabel fontSize="14px">Select Course</FormLabel>
                  <Select
                    size="xs"
                    variant="filled"
                    onChange={(e: any) => {
                      const course = courses.find((course) => course.name === e.target.value);
                      if (course) updateForm(course);
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
                </FormControl>
              </div>
              <div>
                <div className="d-flex justify-content-around flex-column">
                  <div className="mb-3">
                    <FormControl isRequired>
                      <FormLabel fontSize="14px">Course Name</FormLabel>
                      <Input size="xs" variant="filled" name="name" value={formValue.name} onChange={handleChange} />
                    </FormControl>
                  </div>
                  <div className="mb-3">
                    <FormControl isRequired>
                      <FormLabel fontSize="14px">Fee Amount</FormLabel>
                      <Input
                        size="xs"
                        variant="filled"
                        name="feeAmount"
                        value={formValue.feeAmount}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </div>
                  <div className="mb-3">
                    <FormControl>
                      <FormLabel fontSize="14px">Affiliated To</FormLabel>
                      <Select
                        size="xs"
                        value={formValue.affiliations?.name ? formValue.affiliations?.name : ""}
                        variant="filled"
                        onChange={(e: any) =>
                          updateForm({
                            ...formValue,
                            affiliations: {
                              name: e.target.value,
                            },
                          })
                        }
                      >
                        <option value={""}>None</option>
                        {courses &&
                          courses.length > 0 &&
                          courses.map(
                            (course, index) =>
                              course.affiliations?.name && (
                                <option value={course.affiliations.name} key={index}>
                                  {course.affiliations.name}
                                </option>
                              )
                          )}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="mb-3">
                    <FormControl isRequired>
                      <FormLabel fontSize="14px">Semesters</FormLabel>
                      <Input
                        size="xs"
                        variant="filled"
                        name="semesters"
                        value={formValue.semesters}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="mt-3">
              <Button colorScheme="blue" className="me-4" size="xs" onClick={handleEditCourse}>
                Submit
              </Button>
              <Button onClick={onClose} size="xs">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default EditCourse;

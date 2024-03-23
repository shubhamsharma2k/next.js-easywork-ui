"use client";

import React, { useState } from "react";

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "@/store/config";
import { cloneDeep } from "lodash-es";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteCourse = () => {
  const [deleteCourseModal, setDeleteCourseModal] = useState(false);
  const { courses } = useStoreState((state) => state.course);
  const { deleteCourse } = useStoreActions((action) => action.course);

  const [formValue, updateForm] = useState(
    cloneDeep(courses).map((course) => {
      course.checked = false;
      return course;
    })
  );

  const handleCheckBox = (e: any, index: number) => {
    let copiedFormValue = cloneDeep(formValue);
    copiedFormValue.map((f) => {
      f.checked = false;
      return f;
    });
    copiedFormValue[index].checked = true;
    updateForm(copiedFormValue);
  };

  const onClose = () => {
    updateForm(courses);
    setDeleteCourseModal(false);
  };

  const handleDelete = async () => {
    const courseToDelete = formValue.filter((f) => f.checked);
    if (courseToDelete.length > 0 && courseToDelete[0]._id) {
      const response = await deleteCourse(courseToDelete[0]._id);
      if (response) {
        onClose();
      }
    }
  };

  return (
    <div>
      <div>
        <Button
          variant="link"
          size="xs"
          colorScheme="blue"
          onClick={() => setDeleteCourseModal(true)}
          leftIcon={<DeleteIcon />}
        >
          Delete Course
        </Button>
      </div>
      {deleteCourseModal && (
        <Modal onClose={onClose} isOpen={deleteCourseModal} isCentered size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Course</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Divider orientation="horizontal" />
              <div>
                <RadioGroup>
                  <Stack spacing={5} direction="column">
                    {formValue.length > 0 &&
                      formValue.map((course, index) => (
                        <Radio key={index} value={course._id} onChange={(e) => handleCheckBox(e, index)}>
                          {course.name}
                        </Radio>
                      ))}
                  </Stack>
                </RadioGroup>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                className="me-4"
                size="xs"
                isDisabled={formValue.every((course) => !course.checked)}
                onClick={handleDelete}
              >
                Delete
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

export default DeleteCourse;

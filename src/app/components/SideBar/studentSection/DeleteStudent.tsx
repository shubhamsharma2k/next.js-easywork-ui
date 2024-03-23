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

const DeleteStudent = () => {
  const [deleteStudentModal, setDeleteStudentModal] = useState(false);
  const { deleteStudent } = useStoreActions((action) => action.student);

  const { students } = useStoreState((state) => state.student);
  const [formValue, updateForm] = useState(
    cloneDeep(students).map((student) => {
      student.checked = false;
      return student;
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
    updateForm(students);
    setDeleteStudentModal(false);
  };

  const handleDelete = async () => {
    const studentToDelete = formValue.filter((f) => f.checked);
    if (studentToDelete.length > 0 && studentToDelete[0].studentId) {
      const response = await deleteStudent(studentToDelete[0].studentId);
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
          onClick={() => setDeleteStudentModal(true)}
          leftIcon={<DeleteIcon />}
        >
          Delete Student
        </Button>
      </div>
      {deleteStudentModal && (
        <Modal onClose={onClose} isOpen={deleteStudentModal} isCentered size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Student</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Divider orientation="horizontal" />
              <div>
                <RadioGroup>
                  <Stack spacing={5} direction="column">
                    {formValue.length > 0 &&
                      formValue.map((student, index) => (
                        <Radio key={index} value={student.studentId} onChange={(e) => handleCheckBox(e, index)}>
                          {student.firstName + " " + student.lastName}
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

export default DeleteStudent;

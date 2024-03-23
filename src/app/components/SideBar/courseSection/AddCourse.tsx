"use client";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Select,
  useToast,
  Toast,
} from "@chakra-ui/react";

import { useState } from "react";
import { useStoreActions, useStoreState } from "@/store/config";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

const AddCourse = () => {
  const [modal, setModal] = useState(false);
  const { courses } = useStoreState((state) => state.course);
  const { postCourse } = useStoreActions((action) => action.course);

  const [formValue, updateForm] = useState({
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

  const handleAddCourse = async () => {
    const response = await postCourse({
      ...formValue,
      _id: "",
      affiliations: formValue.affiliations.name
        ? {
            name: formValue.affiliations.name,
          }
        : null,
    });
    if (response) {
      close();
    }
  };

  const close = () => {
    setModal(false);
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
          Add Course
        </Button>
      </div>
      {modal && (
        <Modal onClose={() => setModal(false)} isOpen={modal} isCentered size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Course</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Divider orientation="horizontal" />
              <div>
                <div className="d-flex flex-columne justify-content-around">
                  <div className="me-3">
                    <FormControl isRequired>
                      <FormLabel fontSize="14px">Course Name</FormLabel>
                      <Input size="xs" variant="filled" name="name" onChange={handleChange} />
                    </FormControl>
                  </div>
                  <div className="me-3">
                    <FormControl isRequired>
                      <FormLabel fontSize="14px">Fee Amount</FormLabel>
                      <Input size="xs" variant="filled" name="feeAmount" onChange={handleChange} />
                    </FormControl>
                  </div>
                  <div className="me-3">
                    <FormControl>
                      <FormLabel fontSize="14px">Affiliated To</FormLabel>
                      <Select
                        size="xs"
                        value={formValue.affiliations.name}
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
                  <div className="me-3">
                    <FormControl isRequired>
                      <FormLabel fontSize="14px">Semesters</FormLabel>
                      <Input size="xs" variant="filled" name="semesters" onChange={handleChange} />
                    </FormControl>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="mt-3">
              <Button colorScheme="blue" className="me-4" size="sm" onClick={handleAddCourse}>
                Add
              </Button>
              <Button onClick={() => setModal(false)} size="sm">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default AddCourse;

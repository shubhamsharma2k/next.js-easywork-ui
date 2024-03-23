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
} from "@chakra-ui/react";
import { useStoreState } from "@/store/config";
import { cloneDeep } from "lodash-es";
import { PlusSquareIcon } from "@chakra-ui/icons";

const AddUser = () => {
  const [modal, setModal] = useState(false);

  const [formValue, updateForm] = useState();

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
          Add User
        </Button>
      </div>
      {modal && (
        <Modal onClose={() => setModal(false)} isOpen={modal} isCentered size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Divider orientation="horizontal" />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" className="me-4" size="xs">
                Add
              </Button>
              <Button onClick={() => setModal(false)} size="xs">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default AddUser;

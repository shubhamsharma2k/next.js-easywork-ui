import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { PiStudentFill } from "react-icons/pi";
import PersonalInformation from "./PersonalInformation";
import FeesAndPaymentInformation from "./FeesAndPaymentInformation";
import { useStoreActions, useStoreState } from "@/store/config";
import { useEffect, useState } from "react";
import { cloneDeep, isEqual } from "lodash-es";
import { StudentDetailsModel } from "@/store/models/student";
import QU from "../../images/QU.webp";
import Link from "next/link";

const StudentView = () => {
  const { selectedStudent, metadataFetched } = useStoreState((state) => state.student);

  const { courses } = useStoreState((state) => state.course);
  const { updateStudent, getStudents, setSelectedStudent } = useStoreActions((action) => action.student);

  const [formValue, updateForm] = useState(selectedStudent);
  const [editMode, setEditMode] = useState(false);

  const affiliation = courses.find((course) => course.name === formValue.courseInfo.course.name)?.affiliations;

  const handleSaveAfterEdit = async () => {
    let copiedFormValue = cloneDeep(formValue);

    console.log("PAYLOAD ->", {
      studentId: copiedFormValue.studentId,
      StudentDetails: copiedFormValue,
    });

    await updateStudent({
      studentId: formValue.studentId ? formValue.studentId : "",
      StudentDetails: formValue,
    });
  };

  useEffect(() => {
    if (!metadataFetched) {
      handleFetch();
    }
  }, []);

  const handleFetch = async () => {
    const rsp = await getStudents();
    if (rsp.data.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("studentId");
      const selectedStudent: StudentDetailsModel = rsp.data.filter(
        (student: any) => student.studentId.toString() === id
      )[0];
      setSelectedStudent(selectedStudent);
      updateForm(selectedStudent);
    }
  };

  return (
    <div className="mt-4">
      <Container maxW="8xl">
        <Link href={`/home`}>
          <Button variant="solid" colorScheme="blue" leftIcon={<ArrowBackIcon />} size="xs">
            Back
          </Button>
        </Link>
        <Card className="mt-4" style={{ height: "100%" }} variant="outline">
          <CardBody>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>
                  Student <Icon as={PiStudentFill} boxSize={8} />
                </Tab>
                <Tab>Hostel</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div className="mt-4">
                    <div className="d-flex justify-content-between">
                      <Text as="b" fontSize={"4xl"}>
                        {formValue.firstName} {formValue.lastName}
                      </Text>
                      {/* {affiliation && <img src={QU} style={{ height: "50px" }} />} */}
                    </div>

                    <Card variant="elevated" className="mb-4">
                      <CardBody>
                        <PersonalInformation
                          editMode={editMode}
                          setEditMode={setEditMode}
                          formValue={formValue}
                          updateForm={updateForm}
                        />
                      </CardBody>
                    </Card>
                    <Card variant="elevated">
                      <CardBody>
                        <FeesAndPaymentInformation
                          editMode={editMode}
                          setEditMode={setEditMode}
                          formValue={formValue}
                          updateForm={updateForm}
                        />
                      </CardBody>
                    </Card>
                  </div>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <div className="text-center mt-4">
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  colorScheme="blue"
                  variant="solid"
                  size="sm"
                  isDisabled={isEqual(selectedStudent, formValue)}
                  onClick={handleSaveAfterEdit}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default StudentView;

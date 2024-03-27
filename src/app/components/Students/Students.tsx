'use client'
import { useEffect, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Card,
  CardBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Checkbox,
} from "@chakra-ui/react";

import { useStoreActions, useStoreState } from "@/store/config";
import { ChevronDownIcon, DownloadIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import ZeroState from "../ZeroState";

import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import Link from "next/link";

const Students = () => {
  const { students } = useStoreState((state) => state.student);
  const [filteredItems, setFilteredItems] = useState(students);
  const { courses } = useStoreState((state) => state.course);
  const { setSelectedStudent } = useStoreActions((action) => action.student);

  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [selectedAffiliations, setSelectedAffiliations] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filterStudentBySearch = (e: any) => {
    if (e.target.value) {
      const foundStudent = students.filter((student) => {
        const fullName = student.firstName + " " + student.lastName;
        if (fullName.toLowerCase().includes(e.target.value.toLowerCase()) && e.target.value) {
          return student;
        } else if (!isNaN(e.target.value)) {
          if (student.studentId === e.target.value) {
            return student;
          }
        }
      });
      setFilteredItems(foundStudent);
    } else if (e.target.value.length === 0) {
      setFilteredItems(students);
    }
  };

  useEffect(() => {
    filterStudents();
  }, [selectedCourses, selectedAffiliations, selectedDate]);

  const filterStudents = () => {
    const newFilteredStudents = students.filter((student) => {
      const courseSelected = selectedCourses.length === 0 || selectedCourses.includes(student.courseInfo.course.name);
      const affiliationSelected =
        selectedAffiliations.length === 0 ||
        selectedAffiliations.includes(student.courseInfo.course.affiliations?.name);
      const monthSelected =
        selectedDate === "" ||
        months[new Date(student.dateOfAdmission).getMonth()] === months[new Date(selectedDate).getMonth()];
      return (
        (selectedCourses.length === 0 || courseSelected) &&
        (selectedAffiliations.length === 0 || affiliationSelected) &&
        (selectedDate === null || monthSelected)
      );
    });
    setFilteredItems(newFilteredStudents);
  };

  const handleCourseChange = (courseName: string) => {
    if (selectedCourses.includes(courseName)) {
      setSelectedCourses(selectedCourses.filter((course) => course !== courseName));
    } else {
      setSelectedCourses([...selectedCourses, courseName]);
    }
  };

  const handleAffiliationChange = (affiliationName: string) => {
    if (selectedAffiliations.includes(affiliationName)) {
      setSelectedAffiliations(selectedAffiliations.filter((affiliation) => affiliation !== affiliationName));
    } else {
      setSelectedAffiliations([...selectedAffiliations, affiliationName]);
    }
  };

  const handleMonthChange = (e: any) => {
    setSelectedDate(e);
  };

  const prepareExportData = async () => {
    let formattedExcelData: any[] = [];
    filteredItems.forEach((student) => {
      const studentName = `${student.firstName} ${student.lastName}`;
      const { courseInfo, session, dateOfAdmission } = student;
      const { name: courseName, affiliations, feeAmount } = courseInfo.course;
      const { transactions } = courseInfo;
      const affiliation = affiliations && affiliations.name ? affiliations.name : "";

      const transactionDetails = transactions
        .map(
          (transaction, index) =>
            `Receipt No: ${transaction.receiptNo}    Semester: ${transaction.semester}     Amount: ${
              transaction.amount
            }     Type: ${transaction.transactionType}    Date: ${moment(transaction.date).format("DD/MM/YYYY")}\n`
        )
        .join("\n");

      formattedExcelData.push({
        StudentName: studentName,
        CourseName: courseName,
        Affiliation: affiliation,
        DateOfAdmission: moment(dateOfAdmission).format("DD/MM/YYYY"),
        Session: session,
        Transactions: transactionDetails,
        TotalCourseFee: feeAmount,
      });
    });

    return formattedExcelData;
  };

  const handleExport = async () => {
    const excelData = await prepareExportData();
    console.log(excelData);
    exportToExcel(excelData);
  };

  const exportToExcel = (data: any[]) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelBlob, "student_data.xlsx");
  };

  return (
    <div>
      <div className="row mb-3 align-items-center">
        <div className="col-5 align-items-center">
          <Input
            placeholder="Search student.."
            size="sm"
            bg="white"
            className="me-3"
            onChange={filterStudentBySearch}
            width={"70%"}
            type="search"
          />
        </div>
        <div className="col-7 text-end">
          <Menu>
            <MenuButton as={Button} rightIcon={<DownloadIcon />} colorScheme="blue" size={"sm"}>
              Export
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleExport} value={"Download Student Details"}>
                Download Student Details
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <Card style={{ height: "100vh" }} variant="outline">
        <CardBody>
          <div>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>student Id</Th>
                    <Th>Student Name</Th>
                    <Th>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          size="sm"
                          variant="link"
                          colorScheme="black"
                        >
                          Course
                        </MenuButton>
                        <MenuList>
                          {courses.map((course, index) => (
                            <MenuItem key={index}>
                              <Checkbox
                                isChecked={selectedCourses.includes(course.name)}
                                onChange={(e) => {
                                  handleCourseChange(course.name);
                                }}
                              >
                                {course.name}
                              </Checkbox>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </Th>
                    <Th>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          size="sm"
                          variant="link"
                          colorScheme="black"
                        >
                          Affiliation
                        </MenuButton>
                        <MenuList>
                          <MenuItem>
                            <Checkbox
                              isChecked={selectedAffiliations.includes("Quantum University (QU)")}
                              onChange={(e) => {
                                handleAffiliationChange("Quantum University (QU)");
                              }}
                            >
                              Quantum University (QU)
                            </Checkbox>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Th>

                    <Th>
                      <Menu closeOnSelect={false}>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          size="sm"
                          variant="link"
                          colorScheme="black"
                        >
                          Date Of Admission
                        </MenuButton>
                        <MenuList>
                          <MenuItem>
                            <DatePicker
                              isClearable
                              selected={selectedDate ? selectedDate : null}
                              className="datePicker"
                              showMonthDropdown
                              dateFormat={"dd/MM/yyyy"}
                              onChange={(e: any) => handleMonthChange(e)}
                            />
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Th>
                    <Th>Session</Th>
                  </Tr>
                </Thead>
                {filteredItems.length > 0 ? (
                  filteredItems.map((student, studentIndex) => (
                    <Tbody>
                      <Tr key={studentIndex}>
                        <Td>{student.studentId}</Td>
                        <Td>
                          <Button variant="link" size="xs" colorScheme="blue">
                            <Link
                              href={`/student/?studentId=${student.studentId}&name=${
                                student.firstName + " " + student.lastName
                              }`}
                              onClick={(e) => setSelectedStudent(student)}
                            >
                              {student.firstName + " " + student.lastName}
                            </Link>
                          </Button>
                        </Td>
                        <Td>{student.courseInfo.course.name}</Td>
                        <Td>
                          {courses.find((course) => course.name === student.courseInfo.course.name)?.affiliations?.name}
                        </Td>
                        <Td>
                          {student.dateOfAdmission
                            ? moment(student.dateOfAdmission).format("DD/MM/YYYY")
                            : // <Moment format="DD/MM/YYYY">{student.dateOfAdmission}</Moment>

                              ""}
                        </Td>
                        <Td>{student.session}</Td>
                      </Tr>
                    </Tbody>
                  ))
                ) : (
                  <ZeroState />
                )}
              </Table>
            </TableContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Students;

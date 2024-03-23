import {
  Button,
  Card,
  CardBody,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { StudentDetailsModel } from "@/store/models/student";
import { cloneDeep } from "lodash-es";
import { DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import { useStoreState } from "@/store/config";

ChartJS.register(ArcElement, Tooltip, Legend);

const FeesAndPaymentInformation = (props: {
  editMode: boolean;
  setEditMode: Function;
  formValue: StudentDetailsModel;
  updateForm: Function;
}) => {
  const { formValue, updateForm } = props;

  const handleAddNewTableEntry = () => {
    updateForm({
      ...formValue,
      courseInfo: {
        ...formValue.courseInfo,
        transactions: [
          ...formValue.courseInfo.transactions,
          {
            receiptNo: "",
            semester: "",
            amount: "",
            transactionType: "",
            date: new Date(),
          },
        ],
      },
    });
  };

  const handleDeleteTableEntry = (index: number) => {
    updateForm({
      ...formValue,
      courseInfo: {
        ...formValue.courseInfo,
        transactions: formValue.courseInfo.transactions.filter((transaction: any, i: number) => index !== i),
      },
    });
  };

  const feesPaid = () => {
    let paid: number = 0;
    formValue.courseInfo.transactions.map((transaction: any) => {
      if (transaction.amount) {
        paid = paid + parseInt(transaction.amount);
      }
    });
    return paid;
  };

  const feesPending = () => {
    let totalFee: any = formValue.courseInfo.course.feeAmount;
    let pending = parseInt(totalFee) - feesPaid();
    return pending;
  };

  const data = {
    labels: ["Pending", "Total Fees", "Paid"],
    datasets: [
      {
        data: [feesPending(), formValue.courseInfo.course.feeAmount, feesPaid()],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="d-flex">
        <Text as="b" fontSize={"xl"}>
          Account And Payment Information
        </Text>
      </div>
      <hr />

      <div className="row mb-4">
        <div className="col-3">
          <div className="mt-5">
            <Doughnut data={data} options={{ maintainAspectRatio: false }} width={300} height={300} />
          </div>
        </div>
        <div className="col-9">
          <div className="d-flex justify-content-around mb-4">
            <div>
              <Text fontSize="14px" as="b">
                Course Fees
              </Text>
              <Text fontSize="12px">{formValue.courseInfo.course.feeAmount.toString()}</Text>
            </div>
            <div>
              <Text fontSize="14px" as="b">
                Scholarship/Discount
              </Text>
              <Text fontSize="12px">{formValue.courseInfo.scholarship.toString()}</Text>
            </div>
            <div>
              <Text fontSize="14px" as="b">
                Fees Paid
              </Text>
              <Text fontSize="12px">{feesPaid()}</Text>
            </div>
            <div>
              <Text fontSize="14px" as="b">
                Fees Pending
              </Text>
              <Text fontSize="12px">{feesPending()}</Text>
            </div>
          </div>
          <hr />

          <div className="mt-4">
            <Card>
              <CardBody>
                <TableContainer>
                  <Table variant="simple" size="sm">
                    <TableCaption>Transactions Details</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Receipt No</Th>
                        <Th>Semester</Th>
                        <Th>Amount</Th>
                        <Th>Type</Th>
                        <Th>Date</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {formValue.courseInfo.transactions.length > 0 &&
                        formValue.courseInfo.transactions.map((transaction, index) => (
                          <Tr key={index}>
                            <Td>
                              <Input
                                value={transaction.receiptNo}
                                size="xs"
                                variant="filled"
                                onChange={(e) => {
                                  let copied = cloneDeep(formValue);
                                  copied.courseInfo.transactions[index].receiptNo = e.target.value;
                                  updateForm(copied);
                                }}
                              />
                            </Td>
                            <Td>
                              <Input
                                value={transaction.semester}
                                size="xs"
                                variant="filled"
                                onChange={(e) => {
                                  let copied = cloneDeep(formValue);
                                  copied.courseInfo.transactions[index].semester = e.target.value;
                                  updateForm(copied);
                                }}
                              />
                            </Td>
                            <Td>
                              <Input
                                // @ts-ignore
                                value={transaction.amount}
                                size="xs"
                                variant="filled"
                                onChange={(e) => {
                                  let copied = cloneDeep(formValue);
                                  copied.courseInfo.transactions[index].amount = e.target.value;
                                  updateForm(copied);
                                }}
                              />
                            </Td>
                            <Td>
                              <Input
                                // @ts-ignore
                                value={transaction.transactionType}
                                size="xs"
                                variant="filled"
                                onChange={(e) => {
                                  let copied = cloneDeep(formValue);
                                  copied.courseInfo.transactions[index].transactionType = e.target.value;
                                  updateForm(copied);
                                }}
                              />
                            </Td>
                            <Td>
                              <div>
                                <DatePicker
                                  isClearable
                                  className="datePicker"
                                  dateFormat={"dd/MM/yyyy"}
                                  selected={transaction.date ? new Date(transaction.date) : null}
                                  onChange={(date: any) => {
                                    let copied = cloneDeep(formValue);
                                    copied.courseInfo.transactions[index].date = date;
                                    updateForm(copied);
                                  }}
                                />
                              </div>
                            </Td>
                            <Td>
                              <Button
                                leftIcon={<DeleteIcon />}
                                variant="link"
                                onClick={(e) => handleDeleteTableEntry(index)}
                              />
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Button
                  colorScheme="blue"
                  size="xs"
                  leftIcon={<SmallAddIcon boxSize={5} />}
                  onClick={handleAddNewTableEntry}
                >
                  Add new Entry
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesAndPaymentInformation;

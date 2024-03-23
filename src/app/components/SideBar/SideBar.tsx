import { Card, CardBody, Divider, Heading } from "@chakra-ui/react";
import AddNewStudent from "./studentSection/AddNewStudent";
import AddCourse from "./courseSection/AddCourse";
import DeleteCourse from "./courseSection/DeleteCourse";
import AddUser from "./userSection/AddUser";
import EditCourse from "./courseSection/EditCourse";
import DeleteStudent from "./studentSection/DeleteStudent";

const SideBar = () => {
  return (
    <div>
      <Card variant="outline">
        <CardBody>
          <section>
            <Heading size="xs">Manage Students</Heading>
            <AddNewStudent />
            <DeleteStudent />
          </section>
          <Divider orientation="horizontal" />
          <section>
            <Heading size="xs">Manage Courses</Heading>
            <AddCourse />
            <EditCourse />
            <DeleteCourse />
          </section>
          <Divider orientation="horizontal" />
          <section>
            <Heading size="xs">Manage Users</Heading>
            <AddUser />
          </section>
        </CardBody>
      </Card>
    </div>
  );
};

export default SideBar;

"use client";
import { Container, Spinner } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "@/store/config";
import Header from "../components/Header";
import Students from "../components/Students/Students";
import SideBar from "../components/SideBar/SideBar";

const Home = () => {
  const { metadataLoading } = useStoreState((state) => state.student);
  const { isAuthenticated } = useStoreState((state) => state.auth);
  const { setIsAuthenticated } = useStoreActions((action) => action.auth);

  return (
    <div>
      <Header />
      <div className="mt-4">
        <Container maxW={"full"} minH={"container.lg"}>
          {metadataLoading ? (
            <div className="spinner">
              <Spinner size={"lg"} thickness="4px" emptyColor="gray.200" color="blue.500" />
            </div>
          ) : (
            <div className="row">
              <div className="col-2">
                <SideBar />
              </div>
              <div className="col-10">
                <Students />
              </div>
            </div>
          )}
        </Container>
      </div>
      <button onClick={() => setIsAuthenticated(true)}></button>
    </div>
  );
};

export default Home;

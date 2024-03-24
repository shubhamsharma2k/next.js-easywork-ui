"use client";
import { Container, Spinner } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "@/store/config";
import Header from "../components/Header";
import Students from "../components/Students/Students";
import SideBar from "../components/SideBar/SideBar";
import LoadingBar from "react-top-loading-bar";

const Home = () => {
  const { metadataLoading } = useStoreState((state) => state.student);
  const { isAuthenticated } = useStoreState((state) => state.auth);
  const { setIsAuthenticated } = useStoreActions((action) => action.auth);
  const { progress } = useStoreState((state) => state.misc);
  const { setProgress } = useStoreActions((action) => action.misc);

  return (
    <div>
      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
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
    </div>
  );
};

export default Home;

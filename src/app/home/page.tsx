"use client";
import { Container, Spinner } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "@/store/config";
import Header from "../components/Header";
import Students from "../components/Students/Students";
import SideBar from "../components/SideBar/SideBar";
import LoadingBar from "react-top-loading-bar";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

const fetchData = async () => {
	const rsp = await axios.post("/api/users/verify", {});
	return rsp.data;
};

const Home = () => {
	const router = useRouter();
	const { students, metadataLoading, metadataFetched } = useStoreState((state) => state.student);
	const { progress } = useStoreState((state) => state.misc);
	const { getMetadataOnRefresh, setProgress } = useStoreActions((action) => action.misc);
	const { logoutUser } = useStoreActions((action) => action.auth);
	const { isAuthenticated } = useStoreState((state) => state.auth);

	const { data, isLoading, error } = useQuery("dataKey", fetchData, {
		refetchInterval: 10000,
		refetchIntervalInBackground: true,
		enabled: true,
		onError: async (err: any) => {
			if (err.response.status !== 200) {
				const rsp = await logoutUser();
				if (rsp.status !== 200) {
					router.push("/login");
				}
			}
		},
	});

	useEffect(() => {
		if (students.length === 0 && !metadataFetched) {
			getMetadataOnRefresh();
		}
	}, []);

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

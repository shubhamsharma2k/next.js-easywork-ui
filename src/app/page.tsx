"use client";

import { useStoreActions } from "@/store/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
export default function Home() {
  const router = useRouter();
  const { setIsAuthenticated, setUser, get_me } = useStoreActions((action) => action.auth);
  useEffect(() => {
    const verifyUser = async () => {
      const rsp = await get_me();
      if (rsp.status === 200) {
        const userData = rsp.data;
        if (userData.isVerified) {
          setIsAuthenticated(true);
          setUser({
            userData: {
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
            },
          });
          router.push("/home");
        } else {
          router.push("/login");
        }
      }
    };
    verifyUser();
  }, []);
  return (
    <div className="d-flex justify-content-center" style={{ height: "100vh" }}>
      <Spinner thickness="5px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </div>
  );
}

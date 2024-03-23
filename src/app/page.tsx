"use client";

import { useStoreActions } from "@/store/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
  return <div>Redirecting...</div>;
}

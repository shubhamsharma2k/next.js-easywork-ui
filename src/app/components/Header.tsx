"use client";

import { Button } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "@/store/config";
import { useRouter } from "next/navigation";
import axios from "axios";

const Header = () => {
  const router = useRouter();
  const { clearMetadata } = useStoreActions((action) => action.student);
  const { logoutUser } = useStoreActions((action) => action.auth);

  const { isAuthenticated } = useStoreState((state) => state.auth);

  const handleLogout = async () => {
    const rsp = await logoutUser();
    if (rsp.status === 200) {
      router.push("/");
      clearMetadata();
    }
  };

  return (
    <div style={{ height: "50px", backgroundColor: "black" }}>
      {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
};

export default Header;

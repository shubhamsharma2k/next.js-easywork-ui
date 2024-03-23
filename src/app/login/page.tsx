"use client";
import { Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "@/store/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signin() {
  const router = useRouter();
  const [navigationLoader, setNavigationLoader] = useState(true);
  const [formValue, updateForm] = useState({ email: "", password: "" });
  const { loginUser } = useStoreActions((action) => action.auth);
  const { isAuthenticated } = useStoreState((state) => state.auth);
  const { getStudents } = useStoreActions((action) => action.student);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
    setNavigationLoader(false);
  }, []);

  const handleLogin = async () => {
    const rsp = await loginUser({ email: formValue.email, password: formValue.password });
    if (rsp.status === 200) {
      router.push("/home");
      // await getStudents();
    }
  };

  return (
    <div>
      {navigationLoader ? (
        <div className="spinner">
          <Spinner size={"lg"} thickness="4px" emptyColor="gray.200" color="blue.500" />
        </div>
      ) : (
        <div className="signin-bg">
          <div className="signin-form">
            <Box rounded={"2xl"} boxShadow={"lg"} p={8} bg={"whiteAlpha.300"}>
              <Stack spacing={4}>
                <Heading fontSize={"3xl"}>Sign in to account</Heading>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    size={"sm"}
                    variant="filled"
                    onChange={(e) => updateForm({ ...formValue, email: e.target.value })}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    variant="filled"
                    size={"sm"}
                    onChange={(e) => updateForm({ ...formValue, password: e.target.value })}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleLogin}
                  >
                    Sign in
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"} as="b">
                    Create Account?{" "}
                    <Link
                      href={"/register"}
                      className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    >
                      <Button bg={"blue.400"} color={"white"} _hover={{ bg: "blue.500" }}>
                        Sign up
                      </Button>
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}

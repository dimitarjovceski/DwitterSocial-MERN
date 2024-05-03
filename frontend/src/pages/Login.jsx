import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { useState } from "react";
import userAtom from "../atoms/userAtom";

const Login = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const toast = useToast();
  const setUser = useSetRecoilState(userAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.error) {
        toast({
          position: "top-right",
          title: data.error,
          isClosable: true,
          duration: 3000,
          status: "error",
        });
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      toast({
        position: "top-right",
        title: "Logging Successfully!",
        isClosable: true,
        duration: 3000,
        status: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don&apos;t have an account?{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => setAuthScreen("register")}
                >
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useRef, useState } from "react";
import usePreviewImage from "../hooks/usePreviewImage";

const UpdateProfile = () => {
  const { handleImageChange, imageUrl } = usePreviewImage();
  const toast = useToast();
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
  });

  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imageUrl }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        toast({
          duration: 3000,
          title: data.error,
          isClosable: true,
          position: "top-right",
          status: "error",
        });
        return;
      }

      toast({
        duration: 3000,
        title: "Profile updated successfully",
        isClosable: true,
        position: "top-right",
        status: "success",
      });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      toast({
        duration: 3000,
        title: error.message,
        isClosable: true,
        position: "top-right",
        status: "error",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Edit Profile
          </Heading>
          <FormControl>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={imageUrl || user.profilePic} />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Photo
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Full Name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              value={inputs.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="Username"
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              value={inputs.username}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              value={inputs.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              value={inputs.password}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default UpdateProfile;

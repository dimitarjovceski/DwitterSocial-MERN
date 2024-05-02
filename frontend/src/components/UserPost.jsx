import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import { useState } from "react";

const UserPost = () => {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={"/margkzuuasd/post/1"}>
      <Flex gap={3} mb={4} py={5} onClick={(e) => e.preventDefault()}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Box position={"relative"} w={"full"}>
            <Avatar size={"md"} name="Mark Zuckerberg" src="/zuck-avatar.png" />
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex gap={3} alignItems={"center"}>
              <Text>markzuckerbegt</Text>
              <Image h={4} w={4} ml={1} src="/verified.png" />
            </Flex>

            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>This is my first post</Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray"}
          >
            <Image src="/post1.png" w={"full"} />
          </Box>
          <Flex gap={3} my={1}>
          <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={3} alignItems={"center"}>
            <Text fontSize={"sm"}>254 replies</Text>
            <Box w={1} h={1} borderRadius={"full"} bg={"gray"}></Box>
            <Text fontSize={"sm"}>58 likes</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;

import { Avatar, Flex, Image, Text, Box, Divider } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex mt={10}>
        <Flex w={"full"} alignItems={"center"} gap={2}>
          <Avatar src="/zuck-avatar.png" name="Mark" size={"md"} />
          <Flex>
            <Text fontWeight={"bold"} fontSize={"sm"}>
              markzuckenberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>

        <Flex alignItems={"center"} gap={3}>
          <Text fontSize={"sm"}>1d</Text>
          <BsThreeDots cursor={"pointer"} />
        </Flex>
      </Flex>

      <Text my={3}>Lets talk about Threads.</Text>

      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray"}
      >
        <Image src="/post1.png" alt="post" w={"full"} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"sm"}>258 replies</Text>
        <Box w={1} h={1} bg={"gray"} borderRadius={"full"}></Box>
        <Text fontSize={"sm"}>{200 + (liked ? 1 : 0)} likes</Text>
      </Flex>

      <Divider my={4} />

      <Comment />
    </>
  );
};

export default PostPage;

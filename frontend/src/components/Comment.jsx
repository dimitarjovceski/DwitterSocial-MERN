import { Avatar, Flex, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import { useState } from "react";

const Comment = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} my={2} py={2} w={"full"}>
        <Avatar src="/zuck-avatar.png" size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckenger
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"}>1d</Text>
              <BsThreeDots cursor={"pointer"} />
            </Flex>
          </Flex>

          <Text>Hey this looks great!</Text>
          <Actions liked={liked} setLiked={setLiked} />
          <Text fontSize={"sm"} color={"gray"}>
            {100 + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Comment;

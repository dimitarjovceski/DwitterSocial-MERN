import {
  Box,
  Flex,
  VStack,
  Text,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  );
  const [updating, setUpdating] = useState(false);

  const handleFollow = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        toast({
          duration: 3000,
          title: data.error,
          position: "top-right",
          status: "error",
        });
        return;
      }

      if (following) {
        toast({
          duration: 3000,
          title: `Unfollowed ${user.name}`,
          position: "top-right",
          status: "success",
        });
        user.followers.pop();
      } else {
        toast({
          duration: 3000,
          title: `Followed ${user.name}`,
          position: "top-right",
          status: "success",
        });
        user.followers.push(currentUser._id);
      }

      setFollowing(!following);
    } catch (error) {
      console.log(error);
      toast({
        duration: 3000,
        title: error.message,
        position: "top-right",
        status: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  const copyUrlHandler = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: "Url Coppied!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"} mt={10}>
        <Box>
          <Avatar name={user?.name} src={user?.profilePic} size={"xl"} />
        </Box>

        <Box>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {user?.name}
          </Text>

          <Flex gap={2} align={"center"}>
            <Text fontSize={"sm"}>{user?.username}</Text>
            <Text fontSize={"xs"} bg={"black"} p={2} borderRadius={"full"}>
              threads.com
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Text>{user?.bio}</Text>
      {currentUser._id === user._id && (
        <Link to="/update">
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
      {currentUser._id !== user._id && (
        <Button size={"sm"} onClick={handleFollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={2}>
          <Text fontSize={"sm"}>{user?.followers.length} followers</Text>
          <Box borderRadius={"full"} w={1} h={1} bg={"gray"}></Box>
          <Text fontSize={"sm"}>{user?.following.length} following</Text>
        </Flex>
        <Flex gap={3}>
          <Box>
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box>
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem onClick={copyUrlHandler}>Copy Url</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          color={"gray"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1.5px solid gray"}
          justifyContent={"center"}
          color={"gray"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;

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
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useToast } from "@chakra-ui/react";

const UserHeader = () => {
  const toast = useToast();
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
          <Avatar name="Mark Zuckerberg" src="/zuck-avatar.png" size={"xl"} />
        </Box>

        <Box>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Mark Zuckerberg
          </Text>

          <Flex gap={2} align={"center"}>
            <Text fontSize={"sm"}>markzucbasin</Text>
            <Text fontSize={"xs"} bg={"black"} p={2} borderRadius={"full"}>
              threads.com
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Text>Co Founder, executive chairman and CEO of Meta.</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={2}>
          <Text fontSize={"sm"}>5.4 followers</Text>
          <Box borderRadius={"full"} w={1} h={1} bg={"gray"}></Box>
          <Text fontSize={"sm"}>instagram.com</Text>
        </Flex>
        <Flex gap={3}>
          <Box>
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box>
            <Menu>
              <MenuButton>
                <CgMoreO
                  size={24}
                  cursor={"pointer"}
                  
                />
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
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} color={"gray"} pb={3} cursor={"pointer"}>
            <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1.5px solid gray"} justifyContent={"center"} color={"gray"} pb={3} cursor={"pointer"}>
            <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;

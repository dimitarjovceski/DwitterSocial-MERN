import { Button, useToast } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { CiLogout } from "react-icons/ci";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const toast = useToast();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      localStorage.removeItem("user");
      setUser(null);
      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      onClick={handleLogout}
    >
     <CiLogout  size={20}/>
    </Button>
  );
};

export default LogoutButton;

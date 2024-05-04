import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const toast = useToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        if (data.error) {
          toast({
            duration: 3000,
            title: "Failed to get user",
            status: "error",
            isClosable: true,
          });
          return;
        }

        setUser(data);
      } catch (error) {
        console.log(error);
        toast({
          duration: 3000,
          title: error.message,
          status: "error",
          isClosable: true,
        });
      }
    };

    getUser();
  }, [username, toast]);

  if (!user) return null;
  return (
    <>
      <UserHeader user={user} />
      <UserPost />
    </>
  );
};

export default UserPage;

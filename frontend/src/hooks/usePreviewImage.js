import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const usePreviewImage = () => {
  const toast = useToast();
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setImageUrl(null);
    }
  };
  return { handleImageChange, imageUrl, setImageUrl };
};

export default usePreviewImage;

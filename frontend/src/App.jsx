import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import HomePage from "./pages/HomePage";
import LogoutButton from "./components/LogoutButton";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />

        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:id" element={<PostPage />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
      </Routes>

      {user && <LogoutButton />}
    </Container>
  );
}

export default App;

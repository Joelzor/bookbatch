import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeIntro from "./pages/HomeIntro";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";
import CreateBatch from "./pages/CreateBatch";
import BatchView from "./pages/BatchView";
import MyBatches from "./pages/MyBatches";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Saved from "./pages/Saved";
import { useGlobalContext } from "./context/auth";

const App = () => {
  const { loggedInUser } = useGlobalContext();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={loggedInUser ? <Home /> : <HomeIntro />} />
        <Route path="/login" element={<UserForm login={true} />} />
        <Route path="/register" element={<UserForm />} />
        <Route path="/newbatch" element={<CreateBatch />} />
        <Route path="/editbatch/:id" element={<CreateBatch editing={true} />} />
        <Route path="/mybatches" element={<MyBatches />} />
        <Route path="/batches" element={<Browse />} />
        <Route path="/batches/:id" element={<BatchView />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile/edit/:id" element={<EditProfile />} />

        <Route path="*" element={<h1>Error!</h1>} />
      </Routes>
    </>
  );
};

export default App;

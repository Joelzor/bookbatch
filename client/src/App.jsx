import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeIntro from "./pages/HomeIntro";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";
import CreateBatch from "./pages/CreateBatch";
import BatchView from "./pages/BatchView";
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
        <Route path="/batches" element={<h1>Browse batches</h1>} />
        <Route path="/batches/:id" element={<BatchView />} />
        <Route path="/profile" element={<h1>My profile</h1>} />
        <Route path="*" element={<h1>Error!</h1>} />
      </Routes>
    </>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import CreateBatch from "./components/CreateBatch";
// import { ProtectedRoute, useGlobalContext } from "./context/auth";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserForm login={true} />} />
        <Route path="/register" element={<UserForm />} />
        <Route path="/newbatch" element={<CreateBatch />} />
        <Route path="/batches" element={<h1>Browse batches</h1>} />
        <Route path="/batches/:id" element={<h1>View batch</h1>} />
        <Route path="/profile" element={<h1>My profile</h1>} />
        <Route path="*" element={<h1>Error!</h1>} />
      </Routes>
    </>
  );
};

export default App;

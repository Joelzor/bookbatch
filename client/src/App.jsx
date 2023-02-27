import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/login" element={<h1>Log in</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/newbatch" element={<h1>Create new batch</h1>} />
        <Route path="/batches" element={<h1>Browse batches</h1>} />
        <Route path="/batches/:id" element={<h1>View batch</h1>} />
        <Route path="/profile" element={<h1>My profile</h1>} />
        <Route path="*" element={<h1>Error!</h1>} />
      </Routes>
    </>
  );
};

export default App;

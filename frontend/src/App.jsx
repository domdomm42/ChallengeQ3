import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateIssue from "./pages/CreateIssue";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/issues/create" element={<CreateIssue />} />
    </Routes>
  );
};

export default App;

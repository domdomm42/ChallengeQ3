import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateIssue from "./pages/CreateIssue";
import ShowIssue from "./pages/ShowIssue";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/issues/create" element={<CreateIssue />} />
      <Route path="/issues/details/:id" element={<ShowIssue />} />
    </Routes>
  );
};

export default App;

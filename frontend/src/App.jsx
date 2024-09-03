import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateIssue from "./pages/CreateIssue";
import ShowIssue from "./pages/ShowIssue";
import EditIssue from "./pages/EditIssue";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/issues/create" element={<CreateIssue />} />
      <Route path="/issues/details/:id" element={<ShowIssue />} />
      <Route path="/issues/edit/:id" element={<EditIssue />} />
    </Routes>
  );
};

export default App;

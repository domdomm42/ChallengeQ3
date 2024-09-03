import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/")}>Back Button</button>;
};

export default BackButton;

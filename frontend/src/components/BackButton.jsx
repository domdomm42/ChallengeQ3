import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="mb-4 text-blue-500 hover:text-blue-600 inline-flex items-center"
    >
      <IoMdArrowRoundBack className="mr-2" />
      Back
    </button>
  );
};

export default BackButton;

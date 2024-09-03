import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteIssue = () => {
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/issues/${id}`)
      .then((response) => {
        setIssue(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred while fetching the issue details");
        console.log(error);
      });
  }, [id]);

  const handleDeleteIssue = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/issues/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred while deleting the issue");
        console.log(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Issue</h1>
      <div className="flex flex-col border-2 border-red-400 rounded-xl w-[600px] p-4 mx-auto">
        <p className="text-xl my-4 text-gray-500">
          Are you sure you want to delete this issue?
        </p>
        <div className="my-4">
          <p>
            <strong>Title:</strong> {issue.title}
          </p>
          <p>
            <strong>Description:</strong> {issue.description}
          </p>
        </div>
        <button className="p-2 bg-red-300 m-8" onClick={handleDeleteIssue}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteIssue;

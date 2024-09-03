import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

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
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Delete Issue</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Are you sure you want to delete this issue?
          </h2>
          <div className="mb-6">
            <p className="text-gray-600">
              <strong>Title:</strong> {issue.title}
            </p>
            <p className="text-gray-600">
              <strong>Description:</strong> {issue.description}
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteIssue}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteIssue;

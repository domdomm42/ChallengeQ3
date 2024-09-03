import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import BackButton from "../components/BackButton";

const ShowIssue = () => {
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/issues/${id}`)
      .then((response) => {
        setIssue(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Issue Details</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 pb-8">
                {issue.title}
              </h2>
              <p className="text-sm text-gray-500">ID: {issue.id}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Description
              </h3>
              <p className="text-gray-600">{issue.description}</p>
            </div>
            <div className="flex space-x-4">
              <Link
                to={`/issues/edit/${issue.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <AiOutlineEdit className="mr-2" />
                Edit
              </Link>
              <Link
                to={`/issues/delete/${issue.id}`}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <MdOutlineDelete className="mr-2" />
                Delete
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowIssue;

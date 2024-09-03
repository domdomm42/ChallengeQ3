import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/issues")
      .then((response) => {
        setIssues(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Issue Tracker</h1>
        <Link
          to="/issues/create"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <MdOutlineAddBox className="mr-2" />
          <span>Add New Issue</span>
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-md:hidden">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {issues.map((issue, index) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                    onClick={() => navigate(`/issues/details/${issue.id}`)}
                  >
                    {issue.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-md:hidden">
                    {issue.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/issues/details/${issue.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <BsInfoCircle className="text-xl" />
                      </Link>
                      <Link
                        to={`/issues/edit/${issue.id}`}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        <AiOutlineEdit className="text-xl" />
                      </Link>
                      <Link
                        to={`/issues/delete/${issue.id}`}
                        className="text-red-600 hover:text-red-900"
                      >
                        <MdOutlineDelete className="text-xl" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;

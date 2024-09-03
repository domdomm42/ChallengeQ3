import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/issues/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setFetching(false);
      })
      .catch((error) => {
        setFetching(false);
        alert("An error occurred while fetching the issue details");
        console.log(error);
      });
  }, [id]);

  const handleSaveIssue = () => {
    const data = {
      title,
      description,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/issues/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred while saving the issue");
        console.log(error);
      });
  };

  if (fetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Issue</h1>
      {loading ? <div>Loading...</div> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveIssue}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditIssue;

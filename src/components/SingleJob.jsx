import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdOutlineDeleteOutline,
  MdSystemSecurityUpdateGood,
} from "react-icons/md";

const SingleJob = () => {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://job-backend-smoky.vercel.app/api/v1/jobs/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data);
        setCompany(res.data.job.company);
        setPosition(res.data.job.position);
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
      await axios.delete(
        `https://job-backend-smoky.vercel.app/api/v1/jobs/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(null);
      navigate("/dashboard"); // Redirect user to the jobs page
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `https://job-backend-smoky.vercel.app/api/v1/jobs/${id}`,
        { company, position },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData(res.data);
      setIsEditing(false); // Hide form after successful update
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {data ? (
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full relative transition-all duration-300">
          <h1 className="text-3xl font-bold text-gray-800">{data.job.company}</h1>
          <p className="text-lg text-gray-600 mt-2">{data.job.position}</p>

          <div className="flex items-center gap-4 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 cursor-pointer">
              Apply Here
            </button>
            <button
              className="text-green-600 hover:text-green-700 text-3xl cursor-pointer transition-transform transform hover:scale-110 absolute right-18 top-10"
              onClick={() => setIsEditing(true)} // Show update form
            >
              <MdSystemSecurityUpdateGood />
            </button>
            <button
              className="text-red-600 hover:text-red-700 text-3xl cursor-pointer transition-transform transform hover:scale-110 absolute right-18 "
              onClick={handleDelete}
            >
              <MdOutlineDeleteOutline />
            </button>
          </div>

          {/* Update Form */}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Update Job</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-gray-600 font-medium">Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-medium">Position</label>
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)} // Close form
                      className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-600 text-lg">Job not found or has been deleted.</div>
      )}
    </div>
  );
};

export default SingleJob;

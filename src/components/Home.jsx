import React, { useState, useEffect } from "react";
import axios from "axios";
import { VscAzureDevops } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: No token found");
        const res = await axios.get(
          "https://job-backend-smoky.vercel.app/api/v1/jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data.jobs || []);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-5">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Job Listings</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 shadow-md rounded-lg relative"
            >
              <h3 className="text-xl font-bold">{item.company}</h3>
              <p className="text-gray-600">Position: {item.position}</p>
              <span
                className={`inline-block px-3 py-1 mt-2 text-sm rounded-full ${
                  item.status === "pending"
                    ? "bg-yellow-300"
                    : item.status === "declined"
                    ? "bg-red-300"
                    : "bg-green-300"
                }`}
              >
                {item.status}
              </span>
              <div className="absolute top-2 right-2 cursor-pointer text-xl text-gray-600 hover:text-gray-800">
                <Link to={`/singlejob/${item._id}`}>
                  <VscAzureDevops />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs found</p>
      )}
    </div>
  );
};

export default Home;

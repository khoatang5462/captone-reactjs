import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const JobList = () => {
  const { searchTerm } = useParams();
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchJobs(searchTerm);
        await fetchCategories();
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  const fetchJobs = async (query) => {
    try {
      const response = await axios.get(`https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${query}`);
      setJobs(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách công việc", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-danh-sach-loai-cong-viec");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách loại công việc", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Kết quả tìm kiếm cho: {searchTerm}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-2">Loại công việc</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="border p-2 mb-2">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <h2 className="text-xl font-bold mb-2">Danh sách công việc</h2>
          <div className="grid grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="border p-4">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p>{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;

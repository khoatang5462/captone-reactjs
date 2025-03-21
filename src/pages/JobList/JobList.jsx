// JobList.jsx (đã đúng)
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiInstance } from "../../Constants";
import { PATH } from "../../Constants/PATH";
import { Spin, Alert } from "antd";

const api = apiInstance();

const JobList = () => {
    const { name } = useParams();
    const [jobTypes, setJobTypes] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchJobTypes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(PATH.JOB.GET_JOB_TYPES, {
                validateStatus: (status) => status >= 200 && status < 300,
            });
            console.log('Job types response:', response.data);
            setJobTypes(response.data.content || []);
        } catch (err) {
            console.error('Error fetching job types:', err);
            setError(err.message || 'Failed to fetch job types. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchJobsByName = async (jobName) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(PATH.JOB.GET_JOBS_BY_NAME(jobName), {
                validateStatus: (status) => status >= 200 && status < 300,
            });
            console.log('Jobs response:', response.data);
            setJobs(response.data.content || []);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setError(err.message || `Failed to fetch jobs for "${jobName}". Please try again later.`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobTypes();
        if (name) {
            fetchJobsByName(name);
        }
    }, [name]);

    return (
        <div className="container mx-auto p-4 pt-20">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Job List</h1>

            {loading && (
                <div className="flex justify-center items-center mb-4">
                    <Spin size="large" tip="Loading..." />
                </div>
            )}

            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    className="mb-4"
                />
            )}

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-gray-700">Job Types</h2>
                {jobTypes.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-600">
                        {jobTypes.map((type) => (
                            <li key={type.id} className="mb-1">
                                {type.tenLoaiCongViec}
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p className="text-gray-500">No job types found.</p>
                )}
            </div>

            {name && (
                <div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">
                        Jobs for "{name}"
                    </h2>
                    {jobs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
                                >
                                    <img
                                        src={job.congViec.hinhAnh}
                                        alt={job.congViec.tenCongViec}
                                        className="w-full h-48 object-cover rounded-md mb-3"
                                    />
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                                        {job.congViec.tenCongViec}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-1">
                                        Category: {job.loaiCongViec}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-1">
                                        Price: ${job.congViec.giaTien}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-2">
                                        Rating: {job.congViec.danhGia}
                                    </p>
                                    <p className="text-gray-500 text-sm line-clamp-3">
                                        {job.congViec.moTaNgan}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !loading && (
                            <p className="text-gray-500">No jobs found for "{name}".</p>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default JobList; 
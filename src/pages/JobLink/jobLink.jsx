import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiInstance } from '../../Constants';
import { PATH } from '../../Constants/PATH';
import { Spin, Alert } from 'antd';

const api = apiInstance();

const JobLink = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [globalDateTime, setGlobalDateTime] = useState(''); 

    const fetchJobTypes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(PATH.JOB.GET_JOB_TYPES, {
                validateStatus: (status) => status >= 200 && status < 300,
            });
            console.log('Job types response:', response.data);
            const data = response.data.content || [];

            setGlobalDateTime(response.data.dateTime || '');
            const categoriesWithDateTime = data.map(category => ({
                ...category,
                dateTime: response.data.dateTime || '',
            }));
            setCategories(categoriesWithDateTime);
        } catch (err) {
            console.error('Error fetching job types:', err);
            setError(err.message || 'Failed to fetch job categories. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/jobs/${categoryId}`);
    };

    useEffect(() => {
        fetchJobTypes();
    }, []);

    return (
        <div className="job-links container mx-auto p-4 mt-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Job Categories</h2>

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

            <div className="flex flex-wrap gap-4 mb-8">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <span
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-300 bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700 flex flex-col items-center"
                        >
                            <p className="font-semibold">{category.tenLoaiCongViec}</p>
                            <p className="text-xs text-gray-500">{category.dateTime}</p>
                        </span>
                    ))
                ) : (
                    !loading && <p className="text-gray-500">No job categories found.</p>
                )}
            </div>

            {globalDateTime && (
                <p className="text-sm text-gray-500 mt-4">
                    Last updated: {new Date(globalDateTime).toLocaleString()}
                </p>
            )}
        </div>
    );
};

export default JobLink;
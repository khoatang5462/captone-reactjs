import axios from "axios";

const axiosInstance = axios.create();
const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y';

// Set up request interceptor
axiosInstance.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            tokenCybersoft: TOKEN_CYBERSOFT
        }
    };
});

export const apiInstance = (setting) => {
    return {
        ...axiosInstance,
        ...setting
    };
};

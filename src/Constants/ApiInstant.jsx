import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDgiLCJIZXRIYW5TdHJpbmciOiIxNi8wOC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NTUzMDI0MDAwMDAiLCJuYmYiOjE3MzU5MjM2MDAsImV4cCI6MTc1NTQ1MDAwMH0.qhz1imNFTn5VsERO5GZAfbkm944w0Vguuy5WQFo_d0Y';

const axiosInstance = axios.create({
    baseURL: "https://fiverrnew.cybersoft.edu.vn/api",
    timeout: 10000,
    headers: {
        tokenCybersoft: TOKEN_CYBERSOFT,
        'Content-Type': 'application/json',
    },
});

export const apiInstance = (setting) => {
    return {
        ...axiosInstance,
        ...setting
    };
};

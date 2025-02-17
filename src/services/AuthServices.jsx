import { apiInstance } from "../Constants";
import axios from "axios";
import { PATH } from "../Constants/PATH";

const api = apiInstance({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api',
});

// Centralized error handler
const handleError = (error, action) => {
    let errorMessage = 'Something went wrong. Please try again.';
    
    if (error.response) {
        // Server responded with a status code outside 2xx range
        switch (error.response.status) {
            case 400:
                if (error.response.data && error.response.data.errors) {
                    // Handle validation errors from the server
                    errorMessage = Object.values(error.response.data.errors)
                        .map(err => Array.isArray(err) ? err.join(' ') : err)
                        .join('\n');
                } else {
                    errorMessage = 'Please check your information and try again.';
                }
                break;
            case 401:
                errorMessage = 'Incorrect email or password. Please try again.';
                break;
            case 403:
                errorMessage = 'Access denied. Please contact support if you believe this is an error.';
                break;
            case 404:
                errorMessage = 'The requested resource was not found.';
                break;
            case 409:
                errorMessage = 'This email is already registered. Please use a different email or login.';
                break;
            case 500:
                errorMessage = 'Our servers are experiencing issues. Please try again later.';
                break;
            default:
                errorMessage = error.response.data?.message || errorMessage;
        }
    } else if (error.request) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
    }

    console.error(`${action} error:`, {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
    });
    throw new Error(errorMessage);
};

export const authServices = {
    Register: async (formData) => {
        try {
            const response = await api.post(PATH.AUTH.REGISTER, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                validateStatus: function (status) {
                    return status < 500; // Reject only if status is 500 or above
                }
            });
            return response.data;
        } catch (error) {
            return handleError(error, 'Signup');
        }
    },
    Login: async (payload) => {
        try {
            console.log('Attempting login with payload:', payload);
            const response = await axios.get(PATH.AUTH.LOGIN, payload);
            console.log('Login successful, response:', response.data);
            
            // Store token if needed
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }
            
            return {
                ...response.data,
                redirectTo: '/userprofile'
            };
        } catch (error) {
            console.error('Login failed:', error);
            return handleError(error, 'Login');
        }
    },
    Logout: async () => {
        try {
            // Clear any stored tokens or session data
            localStorage.removeItem('authToken');
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    },
    
    UpdateProfile: async (userId, profileData) => {
        try {
            const response = await api.put(PATH.USER.UPDATE_PROFILE(userId), profileData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                validateStatus: function (status) {
                    return status < 500;
                }
            });
            return response.data;
        } catch (error) {
            return handleError(error, 'Profile Update');
        }
    }
};

import { apiInstance } from "../Constants";
import { PATH } from "../Constants/PATH";

// Khởi tạo api instance với cấu hình từ Constants
const api = apiInstance();

// Centralized error handler
const handleError = (error, action) => {
    let errorMessage = 'Something went wrong. Please try again.';
    
    if (error.response) {
        switch (error.response.status) {
            case 400:
                if (error.response.data && error.response.data.errors) {
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
            console.log('Registering with formData:', formData); // Debug formData
            const response = await api.post(PATH.AUTH.REGISTER, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                validateStatus: function (status) {
                    return status < 500; // Reject only if status is 500 or above
                }
            });
            console.log('Register response:', response.data); // Debug response
            return response.data;
        } catch (error) {
            return handleError(error, 'Signup');
        }
    },

    Login: async (payload) => {
        try {
            console.log('Attempting login with payload:', payload);
            const response = await api.post(PATH.AUTH.LOGIN, payload, {
                validateStatus: function (status) {
                    return status < 500; // Reject only if status is 500 or above
                }
            });
            console.log('Login successful, response:', response.data);

            if (response.data.content?.token) {
                localStorage.setItem('authToken', response.data.content.token);
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
            const response = await api.post(PATH.AUTH.LOGOUT, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                validateStatus: function (status) {
                    return status < 500; // Reject only if status is 500 or above
                }
            });

            localStorage.removeItem('authToken');
            return response.data;
        } catch (error) {
            console.error('Logout error:', error);
            return handleError(error, 'Logout');
        }
    },

    UpdateProfile: async (userId, profileData) => {
        try {
            const response = await api.put(PATH.USER.UPDATE_PROFILE(userId), profileData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
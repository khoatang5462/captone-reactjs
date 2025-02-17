import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authServices } from '../../services/AuthServices.jsx';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginSchema = z.object({
    email: z.string()
       .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z.string()
       .min(1, { message: "Password is required" })
});

export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
       resolver: zodResolver(LoginSchema)
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await authServices.Login(data);
            message.success("Login successful!");
            navigate(response.redirectTo || '/');

        } catch (error) {
            message.error(error.message || 'Login failed! Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                       <input
                           {...register('email')}
                            className="w-full px-3 py-2 border rounded-lg"
                          type="email"
                           placeholder="Enter your email"
                       />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                   <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                           {...register('password')}
                            className="w-full px-3 py-2 border rounded-lg"
                            type="password"
                            placeholder="Enter password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {/* Register Link */}
                    <div className="text-center mt-4">
                        <span className="text-gray-600">Don't have an account? </span>
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            Register
                        </button>
                    </div>                   
                </form>
            </div>
        </div>
   );
};

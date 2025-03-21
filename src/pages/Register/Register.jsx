import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authServices } from '../../services/AuthServices.jsx';
import { message, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';

// Định nghĩa schema validation cho form đăng ký
const RegisterSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required" })
        .max(50, { message: "Name must be less than 50 characters" }),
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must be less than 50 characters" }),
    confirmPassword: z.string()
        .min(1, { message: "Confirm Password is required" }),
    phone: z.string()
        .min(1, { message: "Phone number is required" })
        .regex(/^[0-9]{10,15}$/, { message: "Invalid phone number (must be 10-15 digits)" }),
    birthday: z.string()
        .min(1, { message: "Birthday is required" })
        .refine((val) => {
            const date = new Date(val);
            const today = new Date();
            return date < today;
        }, { message: "Birthday must be in the past" }),
    gender: z.enum(["Male", "Female"], { message: "Gender is required" }),
    role: z.enum(["USER", "ADMIN"], { message: "Role is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            role: "USER",
            gender: "Male",
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Tạo FormData để gửi dữ liệu
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });

            // Debug FormData
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`); // Debug FormData entries
            }

            // Gọi API đăng ký
            const response = await authServices.Register(formData);
            console.log('Register response:', response);
            message.success("Registration successful!");
            navigate('/login');
        } catch (error) {
            console.error('Register error:', error);
            message.error({
                content: error.message,
                duration: 5,
                style: {
                    whiteSpace: 'pre-line'
                }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
                {errors && Object.keys(errors).length > 0 && (
                    <Alert
                        message="Validation Errors"
                        description={Object.values(errors).map(err => err.message).join('\n')}
                        type="error"
                        showIcon
                        className="mb-4"
                    />
                )}

                <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            {...register('name')}
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

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

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            {...register('confirmPassword')}
                            className="w-full px-3 py-2 border rounded-lg"
                            type="password"
                            placeholder="Confirm password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                            {...register('phone')}
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    {/* Birthday Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Birthday</label>
                        <input
                            {...register('birthday')}
                            className="w-full px-3 py-2 border rounded-lg"
                            type="date"
                        />
                        {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday.message}</p>}
                    </div>

                    {/* Gender Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Gender</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    {...register('gender')}
                                    type="radio"
                                    value="Male"
                                    className="mr-2"
                                />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input
                                    {...register('gender')}
                                    type="radio"
                                    value="Female"
                                    className="mr-2"
                                />
                                Female
                            </label>
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                    </div>

                    {/* Role Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    {...register('role')}
                                    type="radio"
                                    value="USER"
                                    className="mr-2"
                                />
                                User
                            </label>
                            <label className="flex items-center">
                                <input
                                    {...register('role')}
                                    type="radio"
                                    value="ADMIN"
                                    className="mr-2"
                                />
                                Admin
                            </label>
                        </div>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    {/* Login Link */}
                    <div className="text-center mt-4">
                        <span className="text-gray-600">Already have an account? </span>
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
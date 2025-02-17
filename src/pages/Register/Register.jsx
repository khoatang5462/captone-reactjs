import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from './Register.schema';
import { authServices } from '../../services/AuthServices.jsx';
import { message, Alert } from 'antd';

import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterSchema)
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (key === 'profilePicture' && data[key]) {
                    formData.append('file', data[key]);
                } else {
                    formData.append(key, data[key]);
                }
            });

            await authServices.Register(formData);
            message.success("Registration successful!");
            navigate('/login');
        } catch (error) {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
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

                    {/* Profile Picture Field */}
                    {/* <div>
                        <label className="block text-sm font-medium mb-1">Profile Picture</label>
                        <input
                            {...register('profilePicture')}
                            className="w-full px-3 py-2 border rounded-lg"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp,.gif"
                        />
                        {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>}
                    </div> */}

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
                                    defaultChecked
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
                </form>
            </div>
        </div>
    );
};

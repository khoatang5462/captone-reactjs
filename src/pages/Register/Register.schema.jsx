import { regex } from '../../Constants/Regex'
import { z } from "zod";

// File validation constants
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
];

export const RegisterSchema = z.object({
    id: z.number().optional(),
    name: z.string()
        .min(1, { message: 'Please fill username' })
        .max(20, { message: 'Username should not be more than 20 characters' }),
    email: z.string()
        .min(1, { message: "This field has to be filled." })
        .email({ message: "This is not a valid email." }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(regex.password, { message: "Password must include 1 uppercase letter and 1 special character" }),
    confirmPassword: z.string()
        .min(1, { message: 'Please fill confirm password' }),
    phone: z.string()
        .regex(regex.phone, { message: "Invalid phone number format" }),
    birthday: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format (YYYY-MM-DD)" })
        .refine(date => !isNaN(Date.parse(date)) && new Date(date) < new Date(), { message: "Please choose a valid birthday (not in the future)" }),
    gender: z.string()
        .min(1, { message: "Please select a gender" }), // Chuyển gender thành string
    role: z.string()
        .min(1, { message: "Enter your role" }),
    skill: z.array(z.string()).default([]),
    certification: z.array(z.string()).default([]),
    profilePicture: z.instanceof(File)
      .refine(file => file.size <= MAX_FILE_SIZE, { 
        message: 'File size must be less than 5MB' 
      })
      .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Only .jpg, .jpeg, .png, .webp and .gif files are accepted'
      })
      .optional(),
})
    .refine(data => data.password === data.confirmPassword, {
        message: "Password and Confirm Password should be the same",
        path: ["confirmPassword"],
    });

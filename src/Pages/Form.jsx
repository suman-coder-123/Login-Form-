import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";




const schema = z.object({
  name: z.string({ required_error: "required field" })
    .nonempty("required field")
    .min(5, "name must have 5 characters"),
  email: z.string().email("invalid email address"),
  password: z.string()
    .nonempty("required field")
    .min(4, "min length is 4")
    .max(8, "max length is 8"),
  confirmPassword: z.string()
    .nonempty("required field")
    .min(4, "min length is 4")
    .max(8, "max length is 8"),
  address: z.string({ required_error: "required field" })
    .nonempty("required field"),
  checkbox: z.literal(true, { errorMap: () => ({ message: "You must agree" }) }),
  education: z.string().min(1, "please select your education"),
  gender: z.string().min(1, "please select your gender"),
  course: z.string().min(1, "please select your course"),
});

export default function PhotoUploadForm() {
  const [photo, setPhoto] = useState(null);
    const [Show , SetShow] = useState(false);
    const [Password , SetPassword] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => console.log("Form Data:", data);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Registration
        </h1>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32">
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover rounded-full border-4 border-gray-200"
            />
          </div>
          <label className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative w-full items-center">
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                {...register("password")}
                type= {Show? "text":"password"}
                value ={Password}
                 onChange={(e) => SetPassword (e.target.value)} 
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
             <button onClick={() => SetShow((s) => !s)} className="absolute inset-y-0 mt-7 py-2 right-3 flex items-center text-gray-500">
            {Show? <FaEyeSlash /> : <FaEye />}
        </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="relative w-full items-center">
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type= {Show? "text":"password"}
                value ={Password}
                 onChange={(e) => SetPassword (e.target.value)} 
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button onClick={() => SetShow((s) => !s)} className="absolute inset-y-0  mt-7 py-2 right-3 flex items-center text-gray-500">
            {Show? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              {...register("address")}
              type="text"
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Education</label>
            <select
              {...register("education")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select</option>
              <option value="B.tech">B.Tech</option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
            </select>
            {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              {...register("gender")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="TransGender">TransGender</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Course</label>
            <select
              {...register("course")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select</option>
              <option value="React">React</option>
              <option value="Javascript">JavaScript</option>
              <option value="AI">AI</option>
              <option value="DSA">DSA</option>
              <option value="Java core">Java Core</option>
            </select>
            {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("checkbox")} className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">I agree to the terms & policy</span>
          </div>
          {errors.checkbox && <p className="text-red-500 text-sm mt-1">{errors.checkbox.message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object ({
  name:z.string( {required_error: "required field"}) .min (5,"name must have 5 characters " ),
  email:z.string().email("invalid email address"),
  password:z.string().min (4, "min length is 5 ") .max(8,"max length is 8 ")
})

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm({resolver: zodResolver(schema),});
    const onSubmit = (data) => console.log( "Form Data :", data)
        return (
    <div  className=' '>
      <div className='border-black border-3 rounded text-white-80 w-full max-w-none px-20 py-10 m-auto my-15  sm:w-1/2'>
      <h1 className='text-2xl font-bond text-green-700 pb-10 text-center sm:text-5xl'> Login Form  </h1>
      <form action="" onSubmit={handleSubmit(onSubmit)} >
        <label htmlFor="name"> Full Name : </label><br />
        <input placeholder="Enter Your Name " className='border-grey border-1 rounded  items-center pb-1 mb-3 pl-1' {...register("name")} type="text" />
        <br />
        {errors.name && <div className='text-red-600 font-light text-sm'>{errors.name.message}</div>}
          <label htmlFor="email"> Email  : </label><br />
        <input placeholder="Enter Your Email" className='border-grey border-1 rounded  items-center pb-1 mb-3 pl-1' {...register("email" )} type="text" />
             <br />
        {errors.email && <div className='text-red-600 font-light text-sm'>{errors.email.message}</div>}
   
         <label htmlFor="password" > Password : </label><br />
        <input  placeholder='password' className='border-grey border-1 rounded  items-center pb-1  mb-3 pl-1'
        {...register("password")} type="password" />
              <br />
        {errors.password && <div className='text-red-600 font-light text-sm'>{errors.password.message} </div>}
  
        <div className='flex gap-3 items-center '>
        <input  {...register("checkbox")} type="checkbox" />
        <p>I agree to the terms & policy</p>
          <br /><br />
        {errors.checkbox && <div className='text-red-600 font-light text-sm'>{errors.checkbox.message}</div>}
        </div>
      <br />
        <div className='flex justify-center items-center'>
          <button type='submmit' className=' bg-green-700 border-grey border-1 rounded  items-center w-full'> Submit </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Form

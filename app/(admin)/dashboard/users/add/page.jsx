"use client";
import React, { useState, useContext, useEffect } from "react";
import { TitleComponentContext } from "@/context/TitleComponentContext";
import { ButtonDefault } from '@/components/ui/Button';
import { assets, rolles } from '@/components/ui/assets/assets';
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";
const Page = () => {
    const { setTitle } = useContext(TitleComponentContext);
    const [image, setImage] = useState(false);
    const [data, setdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        image: "",
    });
    useEffect(() => {
        setTitle('Add User')
    }, []);
    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata((data) => ({ ...data, [name]: value }));
    };

    //refill data form on submit
    const refillForm = (event) => {
        // console.log('event', event.target.firstName.value)
        setdata({
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            image: event.target.image.value,
            password: event.target.password.value,
        });
    }

    const onSubmitHandler = async (event) => {
        refillForm(event);
        event.preventDefault();
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("image", image);
        const response = await axios.post("/api/users", formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setdata({
                firstName: "",
                lastName: "",
                email: "",
                image: "",
                password: "",
            });
        } else {
            toast.error(response.data.msg);
        }
    }
    return (
        <>
            <div className="p-4  ">

                <form className="max-w-md mx-auto" onSubmit={onSubmitHandler}>
                <div className="flex flex-col  z-0 w-full mb-5 group text-center items-center">
                    <p className="text-xl">User image</p>
                    <label htmlFor="image">
                        <Image
                            className="mt-4"
                            src={!image ? assets.upload_area : URL.createObjectURL(image)}
                            alt=""
                            width={140}
                            height={70}
                        />
                    </label>
                    <input
                        onChange={(event) => setImage(event.target.files[0])}
                        type="file"
                        id="image"
                        name="image"
                        hidden
                    />
                </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={onchangeHandler} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="@" required />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email address</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={onchangeHandler} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Password</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={onchangeHandler} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Confirm password</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input onChange={onchangeHandler} type="text" name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">First name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input onChange={onchangeHandler} type="text" name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Last name</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="roll" className="sr-only">Roll</label>
                            <select id="roll" name="roll" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option value="" disabled>Select a roll</option>
                                {
                                    rolles.map((item, index) => (
                                        <option key={index} value={item.value}>{item.title}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>
                    <ButtonDefault  type="submit" textButton='Save' iconButton='fa fa-save' />
                </form>

            </div>
        </>
    )
}

export default Page

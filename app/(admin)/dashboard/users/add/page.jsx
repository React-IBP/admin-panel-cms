"use client";
import React, { useState, useContext, useEffect } from "react";
import { TitleComponentContext } from "@/context/TitleComponentContext";
import { ButtonDefault } from '@/components/ui/Button';
import { assets, rolles } from '@/components/ui/assets/assets';
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";
import { mongoErrrors } from "@/utils/helpers";
import { redirect } from "next/navigation";
const Page = () => {
    const { setTitle } = useContext(TitleComponentContext);
    const [image, setImage] = useState(false);
    const [data, setdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        image: "",
        roll: "",
    });

    const [errors, setErrors] = useState({});
    useEffect(() => {
        setTitle('Add User')
    }, []);

    useEffect(() => {
        if (errors?.error) {
            const name = Object.keys(errors?.error?.keyValue)[0];
            setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
            console.log('los errores', errors)
        }
    }, [errors?.error]);

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata((data) => ({ ...data, [name]: value }));
        //Limpiar errores al cambiar el valor del campo
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };



    const onSubmitHandler = async (event) => {
        console.log('data', data)
        event.preventDefault();
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("image", image);
        formData.append("roll", data.roll);
        try {
            const response = await axios.post("/api/users", formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                //redirect
                window.location.href= '/dashboard/users';
                setData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    image: "",
                    roll: "",
                });
                setErrors({});
            } else {
                // Asigna los errores por campo
                setErrors(response.data.errors);
                toast.error("Revisa los errores en el formulario.");
                console.log('los errores aca ', response.data.errors)
            }
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    return (
        <>
            <div className="p-4  ">
                <div>
                    {

                        errors ? (console.log('errorsSave', errors)) : ('sa')
                    }
                </div>
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
                        <input onChange={onchangeHandler} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        {errors?.keyValue?.email&& (
                            <>
                                <span className="errorMessageLabel">{
                                    mongoErrrors[errors.code].message
                                }</span>
                            </>
                        )}
                    </div>

                    {/* <div className="relative z-0 w-full mb-5 group">
                        <input onChange={onchangeHandler} type="email" name="email" id="email" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  dark:text-gray  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors?.email ? "errorInput" : ""}`}   required />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email address</label>
                        {errors?.keyValue?.email && (
                            <span className="errorMessageLabel">{
                                mongoErrrors[errors.code].message
                            }</span>
                        )}
                    </div> */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={onchangeHandler} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  dark:text-gray  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Password</label>
                        {errors?.errors?.password && (
                            <>
                                <span className="errorMessageLabel">{
                                    mongoErrrors.password.message
                                }</span>
                            </>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={onchangeHandler} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  dark:text-gray  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Confirm password</label>
                        <span id="errorMsmemail" className="errorMessageLabel"></span>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input onChange={onchangeHandler} type="text" name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  dark:text-gray  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">First name</label>
                            <span id="errorMsmfirstName" className="errorMessageLabel"></span>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input onChange={onchangeHandler} type="text" name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  dark:text-gray  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Last name</label>
                            <span id="errorMsmlastName" className="errorMessageLabel"></span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="roll" className="sr-only">Roll</label>
                            <select onChange={onchangeHandler}  id="roll" name="roll" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option value="" disabled selected>Select a roll</option>
                                {
                                    rolles.map((item, index) => (
                                        <option key={index} value={item.value}>{item.title}</option>
                                    ))
                                }
                            </select>
                            <span id="errorMsmroll" className="errorMessageLabel"></span>
                        </div>

                    </div>
                    <ButtonDefault type="submit" textButton='Save' iconButton='fa fa-save' />
                </form>

            </div>
        </>
    )
}

export default Page

"use client";

import { assets, rolles } from "@/components/ui/assets/assets";
import { ButtonDefault, ButtonGreen } from "@/components/ui/Button";
import { mongoErrrors } from "@/utils/helpers";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";



const Page: React.FC<ParamsUserProps> = (params) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
    roll: ""
  });

  const [errors, setErrors] = useState<ErrorsState>({});

  useEffect(() => {
    if (errors.error) {
      const name = Object.keys(errors.error.keyValue)[0];
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "" // O cualquier otro valor que desees asignar
      }));
    }
  }, [errors.error]);


  const router = useRouter();

  const fetchUser = async () => {
    const { id } = params.params;
    const urlUser = process.env.APP_URL + `/api/users/?id=${id}`;

    try {
      const response = await axios.get(urlUser);
      const dataUser = response.data.users[0];
      setData({
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        email: dataUser.email,
        image: dataUser.image,
        roll: dataUser.roll,
        password:  dataUser.password,
        confirmPassword:  ''
      });
      setImage(response.data.image);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);



  const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };


  const [errorPassword, setErrorPassword] = useState('');
  const matchPasswords = (password: string, confirmPassword: string) => {

    if (password.length === 0 && confirmPassword.length === 0) return true;
    // Expresión regular para validar la contraseña
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    // Verifica si la contraseña cumple con el patrón del regex
    const isValidPassword = regex.test(password);
    console.log('isvalid', isValidPassword);

    if (!isValidPassword) {
      setErrorPassword(mongoErrrors.password.message);
      return false;
    }

    // Verifica si las contraseñas coinciden
    const passwordMatch = password === confirmPassword;
    if (!passwordMatch) {
      setErrorPassword(mongoErrrors.passwordsMatch.message);
      return false;
    }

    // Devuelve verdadero si ambas condiciones son verdaderas
    return isValidPassword && passwordMatch;
  }



  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const passwordsMatch = matchPasswords(data.password, data.confirmPassword);

    if (!passwordsMatch) {
      return;
    }

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("image", image);
    formData.append("password", data.password);
    formData.append("roll", data.roll);
    try {
      const response = await axios.put("/api/users", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        router.push("/dashboard/users");
      } else {
        toast.info("Failed to update data user");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the user");
    }

    setImage(false);
  };

  const handleUsers = () => {
    router.push("/dashboard/users");
  };

  console.log('data ', data)
  const rollValue = rolles.find((role) => role.value === data.roll)?.title;
  console.log('errorPassword', errorPassword)
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <div className="flex w-full justify-between">
        <h1  >Add users </h1>
        <ButtonGreen
          iconButton="fa-solid fa-arrow-left"
          textButton="Back"
          handleButton={handleUsers}
        />
      </div>
      <div className="relative max-w-full h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <form onSubmit={onSubmitHandler} className="pt-4 px-5 sm:pt-12 sm:pl-16" autoComplete="off">
          <div className=" w-1/4 bg-transparent-400 sm:col-span-3 flex flex-col items-center p-2">
            <p className="text-xl">User image</p>
            <label htmlFor="image">
            
             <Image
             className="mt-4 cursor-pointer"
             src={image ? URL.createObjectURL(image) : data.image || assets.image_icon}
             alt="image"
             width={140}
             height={70}
           />
           
             
             
            </label>
            <input
              onChange={(event) => setImage(event?.target?.files[0])}
              type="file"
              id="image"
              name="image"
              hidden
            />
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7  ">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <div className="relative z-0 w-full mb-5 group">
                  <input value={data.firstName}
                    onChange={onchangeHandler}
                    id="firstName"
                    name="firstName"
                    type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
              </div>


              <div className="sm:col-span-3">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    value={data.lastName}
                    onChange={onchangeHandler}
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
              </div>


              <div className="sm:col-span-3">
                <div className="relative z-0 w-full mb-5 group">

                  <input
                    value={data.email}
                    onChange={onchangeHandler}
                    id="email"
                    name="email"
                    type="email"

                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
              </div>


              <div className="sm:col-span-3">
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="roll" className="sr-only">Roll</label>
                    <select
                      onChange={onchangeHandler}
                      id="roll"
                      name="roll"
                      value={rollValue}  // Aquí controlas el valor seleccionado
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option value="" disabled>
                        Selecciona un rol
                      </option>
                      {
                        rolles.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.title}
                          </option>
                        ))
                      }
                    </select>
                    <span id="errorMsmroll" className="errorMessageLabel"></span>
                  </div>
                </div>
              </div>


              {/* passwors */}

              <div className="sm:col-span-3">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    onChange={onchangeHandler}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                  {errorPassword && (
                    <>
                      <span className="errorMessageLabel">{
                        errorPassword
                      }</span>
                    </>
                  )}

                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    onChange={onchangeHandler}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="off"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label htmlFor="confirmPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                  {errorPassword && (
                    <>
                      <span className="errorMessageLabel">{
                        errorPassword
                      }</span>
                    </>
                  )}
                </div>
              </div>


            </div>
          </div>
          <br />

          <ButtonDefault
            textButton="Save"
            iconButton="fa-regular fa-floppy-disk"
            typeButton="submit"
          />

        </form>
        <div className="p-8">&nbsp;</div>
      </div>
    </div>
  );
};

export default Page;

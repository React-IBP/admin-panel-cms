"use client";
import { assets } from "@/components/ui/assets/assets";
import UsersTableItem from "@/components/users/UsersTableItem";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { TitleComponentContext } from "@/context/TitleComponentContext";
import { ButtonDefault } from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
const Page = () => {
  const { setTitle } = useContext(TitleComponentContext);
  const divLoading = (
    <div className="center-content">
      {" "}
      <LoadingSpinner />
    </div>
  );

  const noDataFound = (
    <div className="center-content">
      {" "}
      <p>No users found.</p>
    </div>
  );
  const [userList, setUsersList] = useState([]);

  const [isLoading, setIsloading] = useState(true);
  const fetchEmails = async () => {
    const response = await axios.get("/api/users/");
    setUsersList(response.data.users);
    if (userList.length <= 0) {
      setIsloading(null);
    } else {
      setIsloading(false);
    }

    console.log(response.data.users);
  };

  const handleDelete = async (mongoId) => {
    // Implementación de la llamada a la API para eliminar
    console.log("first delete", mongoId);
    const response = await axios.delete(`/api/users`, {
      params: { id: mongoId },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchEmails();
    } else {
      toast.error("Failed to delete item");
    }
  };

  useEffect(() => {
    setTitle('Users')
    fetchEmails();
  }, []);



  return (
    <>
      {
        isLoading ? (divLoading) : (


          <div className="p-4  ">
            <Link href={'/dashboard/users/add'} className="">
              <ButtonDefault textButton="Add user" iconButton="fa fa-user-plus" /></Link>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Roll
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Acctions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userList.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-3 text-center text-gray-600">
                        {noDataFound}
                      </td>
                    </tr>
                  ) : (
                    userList.map((itemUser, index) => {
                      return (
                        <UsersTableItem
                          key={index}
                          roll={itemUser.roll}
                          image={itemUser.image}
                          firstName={itemUser.firstName}
                          lastName={itemUser.lastName}
                          mongoId={itemUser._id}
                          email={itemUser.email}
                          date={itemUser.date}
                          active={itemUser.active}
                          handleDelete={handleDelete}
                        />
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        )
      }

    </>
  );
};

export default Page;

import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ButtonRed, ButtonWhite, ButtonYellow } from "../ui/Buttons";

const UsersTableItem: React.FC<UserProps> = ({ mongoId, email, firstName, lastName, image, date, active, handleDelete, roll }) => {
    const dataParsed = (dataArticle: any) => {
        const data = new Date(dataArticle);
        const options = {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true, // Usar formato de 24 horas
        };
        return data.toLocaleString("es-es", options); // Convertir a formato local
    };

    const classActive = active ? "bg-green-100 text-green-800" : "";

 
    // Si no hay email, no mostrar la columna de activo
    return (
        <>
            <tr className={`bg-white dark:bg-gray-800`}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {firstName ? `${firstName} ${lastName}` : "No Email Available"}
                </th>
                <td className="px-6 py-4">
                    {email ? email : ''}
                </td>
                <td className="px-6 py-4">
                    {!roll ? 'No role' : roll}
                </td>
                <td className="px-6 py-4">
                    {mongoId ? (<ButtonRed handleButton={() => handleDelete(mongoId)} iconButton="fa-solid fa-trash" textButton="Delete" />) : ""}
                    {mongoId ? (<Link href={`users/update/${mongoId}`}       >
                        <ButtonWhite iconButton="fa-solid fa-edit" textButton="Update" />
                    </Link>) : ""}
                </td>
            </tr>


        </>
    );
};

export default UsersTableItem;

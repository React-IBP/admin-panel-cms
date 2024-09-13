import { segmenter, time } from "@/utils/utils";
import { ConnectDB } from "@/utils/config/db";
import UserModel from "@/models/UserModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
import { Buffer } from "buffer";

const fs = require("fs");
const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();
export async function GET(request) {
  const userQuery = request.nextUrl.searchParams.get("id");
  console.log("data search--------------------->", userQuery);
  if (!userQuery) {
    // Get all users from db and order  by descending id
    const users = await UserModel.find({}).sort({ _id: -1 });
    return NextResponse.json({ users });
  } else {
    //Find the user by th id
    const users = await UserModel.find({ _id: userQuery });
    console.log("data response --------------------->", users);
    return NextResponse.json({ users });
  }
}

//Create a post on db

export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();
  let fileName = null;
  let imgUrl = null;
  const image = formData.get("image");

  console.log("Image:", typeof image);
  //if image != false
  if (image && image.arrayBuffer) {
    // save image to your storage
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    // Obtener la extensión del archivo
    const extension = image.name.split(".").pop();
    console.log("La extensión del archivo", extension);
    // Crear el nombre de archivo con extensión ${image.name.toLowerCase()}
    fileName = `${timestamp}_user_image`;

    // Si fileName no incluye la extensión, agregarla
    if (!fileName.toLowerCase().endsWith(`.${extension}`)) {
      fileName = `${fileName}.${extension}`;
    }

    const path = (nameFile, extension) => {
      let fileName = `./public/images/users/${nameFile}`; //${segmenter(nameFile)}
      // Asegurar que fileName termine con la extensión correcta
      if (fileName.toLowerCase().endsWith(`${extension}`)) {
        fileName = fileName.replace(extension, `${extension}`);
      }
      return fileName;
    };

    // Suponiendo que writeFile es una función que escribe un archivo
    // Necesitas invocar la función path para obtener el nombre de archivo completo
    const filePath = path(fileName, extension);
    await writeFile(filePath, buffer);
    imgUrl = filePath.replace("./public/", "/");
  } else {
    imgUrl = `/public/images/users/placeholder_user.png`;
  }
  const UserData = {
    firstName: `${formData.get("firstName")}`,
    lastName: `${formData.get("lastName")}`,
    email: `${formData.get("email")}`,
    password: `${formData.get("password")}`,
    image: `${imgUrl}`,
  };
  console.log("Data to save in db", UserData);
  // Save user data to db
  try {
    await UserModel.create(UserData);
    console.log("User created");
    return NextResponse.json({
      success: true,
      msg: "User created successfully",
    });
  } catch (error) {
    console.log('error response', error)
    return NextResponse.json({
      success: false,
      msg:  error?.errorResponse?.errmsg || "Error to create user entry",
      
    });
  }
}
// functinally to update de data in db
 
/**
 * Función para manejar una solicitud PUT para actualizar los datos de un usuario.
 * @param {Request} request - La solicitud HTTP.
 * @returns {NextResponse} - Respuesta con el resultado de la operación.
 */
export async function PUT(request) {
  // Obtener datos del formulario de la solicitud
  const formData = await request.formData();
  const email = formData.get("email");

  try {
    // Buscar el usuario por email
    const user = await UserModel.find({ email });
    if (!user || user.length === 0) {
      return NextResponse.json({
        success: false,
        msg: "Usuario no encontrado",
      });
    }

    const oldUserData = user[0];
    const timestamp = Date.now();
    let fileName = null;
    let imgUrl = null;
    const image = formData.get("image");

    // Manejar la imagen
    if (image && image.arrayBuffer) {
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const extension = image.name.split(".").pop();
      fileName = `${timestamp}_user_image.${extension}`;
      const filePath = `./public/images/users/${fileName}`;
      await writeFile(filePath, buffer);
      imgUrl = filePath.replace("./public", "");
    } else {
      imgUrl = oldUserData.image;
    }

    const newUserData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email,
      image: imgUrl,
    };

    const previousImage = oldUserData.image;

    if (newUserData.image && newUserData.image !== previousImage) {
      if (
        previousImage !== "/images/users/placeholder_user.png" &&
        previousImage !== undefined &&
        previousImage !== "null" &&
        previousImage !== null &&
        previousImage !== ""
      ) {
        fs.unlink(`./public${previousImage}`, (err) => {
          if (err) console.error("Error al borrar la imagen antigua:", err);
        });
      }
    } else {
      newUserData.image = previousImage;
    }

    await UserModel.findOneAndUpdate({ email }, newUserData, { new: true });

    return NextResponse.json({
      success: true,
      msg: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return NextResponse.json({
      success: false,
      msg: "Error al actualizar el usuario",
    });
  }
}


// funtionally to delete a user entry from the database

export async function DELETE(request) {
  const userId = request.nextUrl.searchParams.get("id");
  console.log("data delete--------------------->", userId);
  if (userId) {
    // Find the user by th id
    const user = await UserModel.findById(userId);
    console.log("User found is:  ", user);
    console.log("User found for delete", user.image);
    if (user.image != "/public/images/users/placeholder_user.png") {
      //  Delete image from the folder
      fs.unlink(`./public${user.image}`, () => {});
    }
    await UserModel.findByIdAndDelete(userId);
    console.log("data response --------------------->", user);
    return NextResponse.json({
      success: true,
      msg: "User deleted successfully",
    });
  }
}

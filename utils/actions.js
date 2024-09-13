"use server";

import { sessionOptions, SessionData, defaultSession } from "@/utils/lib";
import axios from "axios";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// let username = "sisdetcol@gmail.com";
// let isPro = true;
let isBlocked = true;




export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // VERIFICA EL USUARIO EN LA BASE DE DATOS
  session.isBlocked = isBlocked;

  return session;
};


export const loginGoogle = async (dataLoginGoogle) => {
  const session = await getSession();
  if (dataLoginGoogle.credentialGoogle === null || dataLoginGoogle.credentialGoogle === '' || dataLoginGoogle.credentialGoogle === undefined) {
    return { error: "Wrong Credentials!", success: false };
  }

  session.userId = dataLoginGoogle._id;
  session.email = dataLoginGoogle.email;
  session.image = dataLoginGoogle.image;
  session.firstName = dataLoginGoogle.firstName;
  session.lastName = dataLoginGoogle.lastName;
  session.roll = dataLoginGoogle.roll;
  session.isBlocked = dataLoginGoogle.isBlocked;
  session.isLoggedIn = true;


  await session.save();
  return { success: true };
};



export const login = async (prevState, formData) => {
  const session = await getSession();
  const urlLogin = `${process.env.APP_URL}/api/login`;
  const email = formData.get("email");
  const password = formData.get("password");
  const params = {
    email: email,
    password: password
  }
  console.log('params', params)
  console.log('Url login ', urlLogin)
  //fetch a db
  const dataSessionDB = async () => {
    try {
      const response = await axios.post(urlLogin,
        params);
      return response.data; // Retorna los datos que necesitas de la respuesta
    } catch (err) {
      console.error('Error al hacer login:', err);
      return null; // Maneja el error retornando un valor por defecto
    }
  };

  const data = await dataSessionDB(); // Usa await para obtener el resultado
  console.log('dataSessionDB', data); // Muestra el resultado en la consola
  // VERIFICA EL USUARIO EN LA BASE DE DATOS
  // const user = await db.getUser({username,password})

  if (data.success !== true) {
    return { error: "Wrong Credentials!" };
  }

  session.userId = data.user._id;
  session.email = data.user.email;
  session.image = data.user.image;
  session.firstName = data.user.firstName;
  session.lastName = data.user.lastName;
  session.roll = data.user.roll;
  session.isBlocked = data.user.isBlocked;
  session.isLoggedIn = true;
  // session.userId = "1";
  //  session.username = email;
  // session.isPro = isPro;
  // session.isLoggedIn = true;

  await session.save();
  redirect("/dashboard");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
   
};

export const changePremium = async () => {
  const session = await getSession();

  isPro = !session.isPro;
  session.isPro = isPro;
  await session.save();
  revalidatePath("/profile");
};

export const changeUsername = async (formData) => {
  const session = await getSession();

  const newUsername = formData.get("username");

  username = newUsername;

  session.username = username;
  await session.save();
  revalidatePath("/profile");
};

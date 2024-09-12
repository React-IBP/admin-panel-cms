import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs";
const { NextResponse } = require("next/server");
import { ConnectDB } from "@/utils/config/db";
const LoadDB = async () => {
    await ConnectDB();
};
LoadDB();
export async function POST(request) {
  console.log('request', request)
  try {
    // Obtén el cuerpo de la solicitud como JSON
    const body = await request.json(); 
    console.log('body response', body)
    const { email, password } = body; 

    // Encuentra al usuario por su email
    const user = await UserModel.findOne({ email });
    console.log('user', user)
    if (!user) {
      return NextResponse.json({ success: false, message: "Usuario no encontrado" });
    }

    // Compara la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Contraseña incorrecta" });
    }

    // Si la contraseña es correcta, retorna los datos necesarios (ej. token, user info)
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.log('error al login ' , error)
    return NextResponse.json({ success: false, message: "Error en la autenticación", error });
  }
}
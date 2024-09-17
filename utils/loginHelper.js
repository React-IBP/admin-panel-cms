'use server'
import emailTemplateForgetPassword from "@/components/emails/emailTemplateForgetPassword";
import { getSession, loginGoogle } from "@/utils/actions";
import { ConnectDB } from "@/utils/config/db";
import UserModel from "@/models/UserModel";
import { Resend } from 'resend';
import bcrypt from "bcryptjs";
import generateTokensModel from "@/models/generateTokensModel";
import { redirect } from "next/dist/server/api-utils"; 
const LoadDB = async () => {
    await ConnectDB();
};
LoadDB();
 

export async function encryptarPassword(plainPassword) {
    try {
      const salt = await bcrypt.genSalt(10); // Genera una sal con un factor de costo de 10
      const encryptedPassword = await bcrypt.hash(plainPassword, salt); // Encripta la contraseña
      return encryptedPassword; // Retorna la contraseña encriptada
    } catch (err) {
      throw new Error('Error al encriptar la contraseña: ' + err.message); // Maneja cualquier error
    }
  }
export const changePasswordUser = async (prevState, formData) => {
    const password = formData.get("password");
    const passwordRepeat = formData.get("passwordRepeat");
    const token = formData.get("token");
    try {
        const dataRevovery = await generateTokensModel.find({ tokenRevovery: token })
        console.log('Data recovery', dataRevovery)
        // cange password to user
        const dataUser = await UserModel.find({ email: dataRevovery[0].email });
        const newPassword = await encryptarPassword(password);
        await UserModel.findByIdAndUpdate(dataUser[0].id, { password: newPassword }, { new: true });
        // deactivate token 
        await generateTokensModel.findByIdAndUpdate(dataRevovery[0].id, { isActive: false }, { new: true });
        return {
            success: true,
            message: '!Password changed '
        }
    } catch (error) {
        console.log('Data recovery error', error)
        return {
            success: false,
            message: 'Fail to change password'
        }
    }

    console.log('token', token, ' password', password, ' repeat password', passwordRepeat)
}


export const forgetPasswordAction = async (prevState, formData) => {
    const email = formData.get("email");
    // consultar el usuario en la db
    try {

        const datausuario = await UserModel.find({ email: email })

        if (datausuario[0]._id) {
            //enviar email con datos de recuperacion
            console.log('data usuario', datausuario[0]._id)
            const tokenRevovery = await generateTokenRecovery(email);
            const linkToken = `${process.env.URL_APP_PROD}/change-password?token=${tokenRevovery}`;
            const resend = new Resend(process.env.RESEND_API_KEY);
            const { data, error } = await resend.emails.send({
                from: 'El Chivato <recoveryg@elchivato.info>',
                to: [email],
                subject: 'Recuperar contraseña',
                react: emailTemplateForgetPassword({ firstName: datausuario[0].firstName, linkToken: linkToken }),
            });

            if (error) {
                console.log('first error', error)
                return error;
            }
            return data;
        }
    } catch (error) {
        console.log('Error al colsultar el usuario', error)
    }

}

export const validateToken = async (tokenRevovery) => {
    try {
        const dataToken = await generateTokensModel.find({ tokenRevovery: tokenRevovery });
        return dataToken;
    } catch (err) {
        console.log('Error find the token', err);
    }
}

export const generateTokenRecovery = async (email) => {
    const tokenRevovery = crypto.randomUUID();
    try {
        const dataToken = {
            email: email,
            tokenRevovery: tokenRevovery
        }
        console.log('data token', dataToken)
        await generateTokensModel.create(dataToken)
        return tokenRevovery
    } catch (err) {
        return {
            success: false,
            msg: "Error al crear token recovery",
        };
    }

}

export const decodeGoogleToken = (token) => {
    // Dividimos el token en sus partes (header, payload, signature)
    const base64Url = token.split('.')[1];
    // Reemplazamos los caracteres url-encoded por los que corresponden
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Decodificamos el string base64
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
async function addUserFromGoogle(dataUser) {
    const newUser = {
        firstName: dataUser.given_name,
        lastName: dataUser.family_name,
        image: dataUser.picture,
        email: dataUser.email,
        credentialGoogle: dataUser.sub,
        password: generatePassword(),
        roll: "reader",
        isBlocked: true
    };


    const user = new UserModel(newUser);
    await user.save();

    console.log('newUser', newUser);
    return newUser;
}
export async function handleCredentialResponse({ credential }) {
    try {
        const decodedData = await decodeGoogleToken(credential);
        console.log('Decoded Token:', decodedData);
        // validar los datos contra la db si no existe registrarlo o actualizar info de usuario
        const dataLogin = await getDatauserMongoDB(decodedData);  // Asegúrarse de esperar la promesa aquí
        console.log('se loguea con google', dataLogin);
        const res = await loginGoogle(dataLogin)

        return res;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getDatauserMongoDB(dataUser) {
    const { email, sub } = dataUser;

    try {
        // Encuentra al usuario por su email
        const user = await UserModel.findOne({ email });

        // Si el usuario no existe, registra el nuevo usuario
        if (!user) {
            console.log('User not found');
            const newUser = await addUserFromGoogle(dataUser);
            return newUser;
        }

        // Prepara los datos a actualizar
        const updatedData = {
            credentialGoogle: sub,
            roll: email === 'sisdetcol@gmail.com' ? 'admin' : user.roll
        };

        // Actualiza el usuario en la base de datos
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, updatedData, { new: true });
        //accionar el login 
        return updatedUser;
    } catch (error) {
        console.error('Error in getDatauserMongoDB:', error);
        throw new Error('Error fetching user from database');
    }
}


function generatePassword() {
    const longitudMinima = 8;
    const longitudMaxima = 15;
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';

    // Combinar todos los caracteres posibles
    const todosLosCaracteres = mayusculas + minusculas + numeros;

    // Generar una longitud aleatoria entre el mínimo y el máximo
    const longitud = Math.floor(Math.random() * (longitudMaxima - longitudMinima + 1)) + longitudMinima;

    let password = '';

    // Asegurarse de incluir al menos una mayúscula, una minúscula y un número
    password += mayusculas[Math.floor(Math.random() * mayusculas.length)];
    password += minusculas[Math.floor(Math.random() * minusculas.length)];
    password += numeros[Math.floor(Math.random() * numeros.length)];

    // Rellenar el resto de la contrasena con caracteres aleatorios
    for (let i = 3; i < longitud; i++) {
        password += todosLosCaracteres[Math.floor(Math.random() * todosLosCaracteres.length)];
    }

    // Mezclar la contrasena para evitar que los primeros caracteres sean siempre en el mismo orden
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}



export const ServerSession = async () => {
  const sessionData = await getSession(); // Llama directamente a la función para obtener la sesión
  return sessionData;
};

 

 


'use client'
import React, { useEffect, useState } from 'react';
import ButtonLoginGoogle from './ui/ButtonLoginGoogle';
import { useLoginContext } from '@/context/LoginContext';
import { getSession } from '@/utils/actions';
import { useRouter } from 'next/navigation';
import { login } from "@/utils/actions";
import { useFormState } from "react-dom";
import LoadingSpinner from './ui/LoadingSpinner';
const LoginForm = () => {
    const router = useRouter();
    const [state, formAction] = useFormState(login, undefined);
    const [isLoading, setIsLoading] = useState('');
    const { isAuthenticated, toggleAuth } = useLoginContext();
    const [sessionHandle, setSessionHandle] = useState(false);

    // Efecto para obtener la sesión cuando el componente se monta
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionData: any = await getSession();
                if (sessionData?.isLoggedIn) {
                    setSessionHandle(true);
                    router.push('/dashboard');  // Redirige al dashboard si ya está autenticado
                }
            } catch (error) {
                console.error('Error al obtener la sesión:', error);
            }
        };
        fetchSession();
    }, [router, isAuthenticated, isLoading]); // Añade router como dependencia 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form) {
            const formData = new FormData(form);
            setIsLoading('Validando información...');
            formAction(formData); // Pasa un objeto 
            // Realiza la acción de login
            try {
                const response = await login(formData);
                console.log('Login exitoso', response);
                toggleAuth(); // Actualiza el contexto de autenticación
                router.push('/dashboard');  // Redirige después del login
            } catch (error) {
                console.error('Error en el login:', error);
                setIsLoading('Error al iniciar sesión.');
            }
        }
    };
    useEffect(() => {
       // document.querySelector('#loadingDiv').innerHTML = '';
    }, [isLoading])
    return (
        <section className="flex justify-center bg-gray-50 dark:bg-gray-900 h-screen ">
            <div className="flex flex-col items-center w-full justify-center px-4 py-8 mx-auto md:h-screen lg:py-0">
                {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </a> */}
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="@"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                 
                                
                                    <div id="loadingDiv" className='d-nones'>
                                        {
                                            isLoading && <LoadingSpinner/>
                                        }
                                    </div>
                                    <div className='col col-lg-12 text-center center text-danger'>
                                        {state?.error && <p>{state.error}</p>}
                                    </div> 
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-center w-full space-y-2 sm:space-y-0 sm:space-x-2 text-center">
                                <button type="submit" className="w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Sign in
                                </button>
                                <ButtonLoginGoogle toggleAuth={toggleAuth} />
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;

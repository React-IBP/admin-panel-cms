"use client"
import { LoginProvider } from '@/context/LoginContext';
import LoginForm from '@/components/Login';

const Login = () => {

  return (

    <LoginProvider>
      <LoginForm />
    </LoginProvider>
  )
}

export default Login

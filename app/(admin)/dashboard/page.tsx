'use client'
import Header from '@/components/common/Header'
import Sidebar from '@/components/common/Sidebar'
import React, { useEffect, useContext } from 'react'
import { TitleComponentContext } from "@/context/TitleComponentContext";

const page = () => {
  const { titleComponent, setTitle } = useContext(TitleComponentContext);
  useEffect(() => {
    setTitle('Dashboard')
  }, []);
  return (
    <>
      
    </>
  )
}

export default page

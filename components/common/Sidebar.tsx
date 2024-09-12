'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { assets } from '@/components/ui/assets/assets';
import Logout from './Logout';

const Sidebar = () => {
    const [openSidebar, setOpenSidebar] = useState('-translate-x-full');
    const [activeMenu, setActiveMenu] = useState(null);

    const handleMenu = () => {
        if (openSidebar === '-translate-x-full') {
            setOpenSidebar('');
        } else {
            setOpenSidebar('-translate-x-full');
        }
    };

    const expandItemMenu = (id) => {
        // Si el menú actual ya está abierto, ciérralo
        if (activeMenu === id) {
            setActiveMenu(null);
        } else {
            setActiveMenu(id);
        }
    };

    const BottonMenu = (classTop = '', open = false) => {
        return (
            <button onClick={handleMenu} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className={`inline-flex items-center p-2 ${classTop} ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}>
                <span className="sr-only">Open sidebar</span>
                {open ? (
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                )}
            </button>
        )
    }

    return (
        <div className='relative'>
            {BottonMenu('mt-6')}

            <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${openSidebar}`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            {BottonMenu('mt-2', true)}
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>

                        <li>
                            <button onClick={() => expandItemMenu('dropdown-ecomerce')} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-ecomerce" aria-expanded={activeMenu === 'dropdown-ecomerce'}>
                                <Image src={assets.google_white_icon} alt='ecomerce ' />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                                <Image src={assets.arrow_down_icon} alt='select icon'/>
                            </button>
                            <ul id="dropdown-ecomerce" className={`py-2 space-y-2 ${activeMenu === 'dropdown-ecomerce' ? '' : 'hidden'}`}>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <button onClick={() => expandItemMenu('dropdown-ecomerces')} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-ecomerces" aria-expanded={activeMenu === 'dropdown-ecomerces'}>
                                <Image src={assets.ecomerce_icon} alt='ecomerce ' />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                                <Image src={
                                    activeMenu === 'dropdown-ecomerces' ?
                                    assets.arrow_up_icon
                                    :
                                    assets.arrow_down_icon} alt='select icon'/>
                            </button>
                            <ul id="dropdown-ecomerces" className={`py-2 space-y-2 ${activeMenu === 'dropdown-ecomerces' ? '' : 'hidden'}`}>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                                </li>
                            </ul>
                        </li>

                        {/* Aquí puedes agregar más menús desplegables usando el mismo patrón */}

                    </ul>
                    <Logout />
                </div>
            </aside>
        </div>
    )
}

export default Sidebar

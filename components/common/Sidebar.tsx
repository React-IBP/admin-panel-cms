'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { assets } from '@/components/ui/assets/assets';
import Logout from './Logout';
import Link from 'next/link';
import menuAdmin from '@/utils/config/menuAdmin';
import { getSession } from '@/utils/actions';
import BottonHandleMenu from './BottonHandleMenu';

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [sessionData, setSessionData] = useState({});
    const [sessionHandle, setSessionHandle] = useState(false);
    const sidebarRef = useRef(null);
    const [openSidebar, setOpenSidebar] = useState('-translate-x-full');

    // Efecto para obtener la sesión cuando el componente se monta
    useEffect(() => {
        const sessionData = async () => {
            const sessionData = await getSession();
            if (sessionData?.isLoggedIn) {
                setSessionHandle(sessionData?.isLoggedIn);
                setSessionData(sessionData);
                localStorage.setItem('isAuthenticated', JSON.stringify(sessionData?.isLoggedIn));
            }
        };
        sessionData();
    }, []);

    const handleMenu = () => {
        if (openSidebar === '-translate-x-full') {
            setOpenSidebar('');
        } else {
            setOpenSidebar('-translate-x-full');
        }
    };

    const imgUser = {
        backgroundImage: `url(${sessionData?.image || assets.image_icon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    return sessionHandle ? (
        <div className="relative">
            <BottonHandleMenu classTop="mt-6" open={openSidebar !== '-translate-x-full'} handleMenu={handleMenu} />
            <div id="default-sidebar" ref={sidebarRef} className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${openSidebar}`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li className=' flex items-center  w-full justify-between'>
                            <span className="userPicture" style={imgUser}></span>
                            <BottonHandleMenu classTop="mt-2" open={true} handleMenu={handleMenu} />
                        </li>
                    </ul>
                    <ul className="space-y-2 font-medium">

                        {menuAdmin.map((item, index) => (
                            <li className="" key={index}>
                                {item?.submenu ? (
                                    <span
                                        id={`collapse${index}`}
                                        onClick={() => setActiveMenu(activeMenu === `dropdown-${index}` ? null : `dropdown-${index}`)}
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
                                        aria-controls={`dropdown-${index}`}
                                        aria-expanded={activeMenu === `dropdown-${index}`}
                                    >
                                        <i className={item.icon}></i>
                                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{item.title}</span>
                                        {activeMenu === `dropdown-${index}` ? (
                                            <Image src={assets.arrow_up_icon} alt="select icon" />
                                        ) : (
                                            <Image src={assets.arrow_down_icon} alt="select icon" />
                                        )}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.link}
                                        id={`collapse${index}`}
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        <i className={item.icon}></i>
                                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{item.title}</span>
                                    </Link>
                                )}
                                {item.submenu && (
                                    <ul id={`dropdown-${index}`} className={`py-2 space-y-2 ${activeMenu === `dropdown-${index}` ? '' : 'hidden'}`}>
                                        {item.submenu.map((subItem, subIndex) => (
                                            <Link href={subItem.link} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" key={subIndex}>
                                                {subItem.icon && <> <i className={`${subItem.icon}`}></i> &nbsp; </> }
                                                {subItem.title}
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Logout />
                </div>
            </div>
        </div>
    ) : null;
};

export default Sidebar;

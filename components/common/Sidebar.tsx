'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { assets } from '@/components/ui/assets/assets';
import Logout from './Logout';
import Link from 'next/link';
import menuAdmin from '@/utils/config/menuAdmin';
import { getSession } from '@/utils/actions';

const Sidebar = () => {
    const [openSidebar, setOpenSidebar] = useState('-translate-x-full');
    const sidebarRef = useRef(null);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const handleMenu = () => {
        if (openSidebar === '-translate-x-full') {
            setOpenSidebar('');
        } else {
            setOpenSidebar('-translate-x-full');
        }
    };
    useEffect(() => {
        const handleClickOutside = (event:any) => {
          if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
           
            console.log('Clic fuera del sidebar');
            // Ejecuta la acción  
            
                setOpenSidebar('-translate-x-full');
            
          } 
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [openSidebar]);
    const expandItemMenu = (id?: string) => {
        // Si el menú actual ya está abierto, ciérralo
        if (activeMenu === id) {
            setActiveMenu(null);
        } else {
            setActiveMenu(id ?? null);
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
    const [sessionHandle, setSessionHandle] = useState(false);

    // Efecto para obtener la sesión cuando el componente se monta
    useEffect(() => {
        const sessionData: any = async () => {
            const sessionData: any = await getSession();
            if (sessionData?.isLoggedIn) { 
                setSessionHandle(sessionData?.isLoggedIn); 
                localStorage.setItem('isAuthenticated', JSON.stringify(sessionData?.isLoggedIn));                
            }
        }
        sessionData()

    }, [sessionHandle]);



    return (

        sessionHandle ? (< div className='relative' >
            {BottonMenu('mt-6')}

            <div id="default-sidebar"  ref={sidebarRef}   className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${openSidebar}`
            } aria-label="Sidebar" >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            {BottonMenu('mt-2', true)}
                        </li>


                        {menuAdmin.map((item, index) => (
                            <li className={` `} key={index}>
                                {
                                    item?.submenu ? (
                                        <span id={`collapse${index}`} onClick={() => expandItemMenu(`dropdown-${index}`)} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer" aria-controls={`dropdown-${index}`} aria-expanded={activeMenu === `dropdown-${index}`}>
                                            <i className={item.icon}></i> {' '}
                                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{item.title}</span>

                                            {
                                                activeMenu === `dropdown-${index}` ?
                                                    item?.submenu && (<Image src={assets.arrow_up_icon} alt='select icon' />) :
                                                    item?.submenu && (<Image src={assets.arrow_down_icon} alt='select icon' />)
                                            }

                                        </span>
                                    ) : (
                                        <Link href={`${item.link}`} id={`collapse${index}`} onClick={() => expandItemMenu(`dropdown-${index}`)} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls={`dropdown-${index}`} aria-expanded={activeMenu === `dropdown-${index}`}>
                                            <i className={item.icon}></i> {' '}
                                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{item.title}</span>

                                            {
                                                activeMenu === `dropdown-${index}` ?
                                                    item?.submenu && (<Image src={assets.arrow_up_icon} alt='select icon' />) :
                                                    item?.submenu && (<Image src={assets.arrow_down_icon} alt='select icon' />)
                                            }

                                        </Link>

                                    )

                                }

                                {item.submenu && (
                                    <>

                                        <ul id={`dropdown-${index}`} className={`py-2 space-y-2 ${activeMenu === `dropdown-${index}` ? '' : 'hidden'}`}>
                                            {item.submenu.map((subItem, subIndex) => (
                                                <Link href={subItem.link} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" key={subIndex}>
                                                    {subItem.title}
                                                </Link>
                                            ))}


                                        </ul>
                                    </>
                                )}
                            </li>
                        ))}

                    </ul>
                    <Logout />
                </div>
            </div >
        </div >) : null


    )
}

export default Sidebar

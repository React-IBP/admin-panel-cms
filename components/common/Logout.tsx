import { assets } from '@/components/ui/assets/assets'
import { logout } from '@/utils/actions'
import Image from 'next/image'
import React from 'react'


function LogoutForm() {
    return (
        <form id="formLogout" action={logout}>
            <button>Logout</button>
        </form>
    );
}


const Logout = () => {
    return (
        <>
         <div id="bottom-banner" tabIndex="-1" className="fixed bottom-0 start-0 z-50 flex justify-between w-64 p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <form id="formLogout" action={logout}>
                <button className="flex w-64  items-start "  >
                    <Image src={assets.arrow_right_out_icon} alt='Logout' />
                </button>
            </form>
        </div>

        </>
    )
}

export default Logout

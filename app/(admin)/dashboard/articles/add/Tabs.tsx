'use client'
import React, { useState } from 'react'

const Tabs = ( {setActiveTab,activeTab}) => {
    // const [activeTab, setActiveTab2] = useState('tabDetails');
    return (
        <>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="me-2" onClick={() => setActiveTab('tabDetails')}>
                        <span className={`cursor-pointer inline-flex items-center justify-center p-4 border-b-2 ${activeTab === 'tabDetails' ? 'text-blue-600 border-blue-600' : 'border-transparent'} rounded-t-lg dark:hover:text-gray-300`}>
                            <i className='fa fa-list'></i>&nbsp;Details
                        </span>
                    </li>
                    <li className="me-2" onClick={() => setActiveTab('tabWrite')}>
                        <span className={`cursor-pointer inline-flex items-center justify-center p-4 border-b-2 ${activeTab === 'tabWrite' ? 'text-blue-600 border-blue-600' : 'border-transparent'} rounded-t-lg dark:hover:text-gray-300`}>
                            <i className='fa fa-edit'></i>&nbsp;Write
                        </span>
                    </li>
                    <li className="me-2" onClick={() => setActiveTab('tabMetadata')}>
                        <span className={`cursor-pointer inline-flex items-center justify-center p-4 border-b-2 ${activeTab === 'tabMetadata' ? 'text-blue-600 border-blue-600' : 'border-transparent'} rounded-t-lg dark:hover:text-gray-300`}>
                            <i className="fa-solid fa-circle-info"></i>&nbsp;Metadata
                        </span>
                    </li>
                    <li className="me-2" onClick={() => setActiveTab('tabPictures')}>
                        <span className={`cursor-pointer inline-flex items-center justify-center p-4 border-b-2 ${activeTab === 'tabPictures' ? 'text-blue-600 border-blue-600' : 'border-transparent'} rounded-t-lg dark:hover:text-gray-300`}>
                            <i className="fa-solid fa-images"></i>&nbsp;Pictures
                        </span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Tabs

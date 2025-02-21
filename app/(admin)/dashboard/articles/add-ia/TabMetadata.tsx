import React from 'react';
import { sections } from '@/components/ui/assets/assets';

const TabMetadata = ({ activeTab, onchangeHandler, data, errors }) => {
    return (
        <div className={`mb-5 ${activeTab === 'tabMetadata' ? '' : 'hidden'}`} id='tabMetadata'>
            <div className="mb-5">
                <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
                <input
                    onChange={onchangeHandler}
                    type="text"
                    name="slug"
                    id="slug"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Set the slug post here!"
                    required
                    value={data.slug}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                <select
                    onChange={onchangeHandler}
                    id="section"
                    name="section"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={data.section}
                >
                    {sections.map((item, idx) => (
                        item.value.length === 0
                            ? <option key={idx * 2} value="0">Select a section</option>
                            : <option key={idx} value={item.value}>{item.title}</option>
                    ))}
                </select>
                {errors?.saved?.errors?.section && (
                    <span className="errorMessageLabel">
                        {errors.saved.errors.section.message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TabMetadata;
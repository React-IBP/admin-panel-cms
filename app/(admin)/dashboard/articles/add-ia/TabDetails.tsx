import React from 'react';
import { ArticleStatusOptions } from '@/components/ui/assets/assets';

const TabDetails = ({ activeTab, onchangeHandler, data, errors }) => {
    return (
        <div className={`tabsContainer relative z-0 w-full mb-5 group mt-4 ${activeTab === 'tabDetails' ? '' : 'hidden'}`}>
            <div className={`mb-5 ${activeTab === 'tabDetails' ? '' : 'hidden'}`} id='tabDetails'>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                    onChange={onchangeHandler}
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Set the title post here!"
                    required
                    value={data.title}
                />
                {errors?.saved?.keyValue?.slug && (
                    <span className="errorMessageLabel">
                        {mongoErrrors[errors.saved.code]?.message}
                    </span>
                )}
                {errors?.saved?.errors?.title && (
                    <span className="errorMessageLabel">
                        {errors.saved.errors.title.message}
                    </span>
                )}
            </div>
            <div className="mb-5">
                <select
                    id="status"
                    name="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={data.status}
                    onChange={onchangeHandler}
                >
                    {ArticleStatusOptions.map(option => (
                        <option key={option._id} value={option.value}>
                            {option.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="authors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Authors</label>
                <input
                    onChange={onchangeHandler}
                    type="text"
                    name="authors"
                    id="authors"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Set the author post here!"
                    required
                    value={data.authors}
                />
                {errors?.saved?.errors?.authors && (
                    <span className="errorMessageLabel">
                        {errors.saved.errors.authors.message}
                    </span>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                    onChange={onchangeHandler}
                    id="description"
                    name='description'
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a summary here..."
                    value={data.description}
                />
                {errors?.saved?.errors?.description && (
                    <span className="errorMessageLabel">
                        {errors.saved.errors.description.message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TabDetails;
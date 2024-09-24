'use client'

import React, { useContext, useEffect, useState } from 'react'
import { TitleComponentContext } from "@/context/TitleComponentContext";
import { ButtonAlternative } from "@/components/ui/Buttons";
import FiltersArticle from '@/components/common/FiltersArticles';
import axios from 'axios';
import { ArticleStatusOptions } from '@/components/ui/assets/assets';
import Link from 'next/link';
 

const Page = () => {

  const { setTitle } = useContext(TitleComponentContext);
  useEffect(() => {
    setTitle('Articles')
  }, []);

  const [listArticle, setListArticle] = useState([]);

  const articleList = async () => {
    try {
      const list = await axios.get('/api/articles');
      setListArticle(Array.isArray(list.data.articles) ? list.data.articles : []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setListArticle([]);  // Puedes también manejar el error de otra manera
    }
  };

  useEffect(() => {
    articleList();
  }, []);  // Arreglo vacío para que solo se ejecute una vez al montar el componente

  const tableHead = (<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="p-4">
        <div className="flex items-center">
          <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
        </div>
      </th>
      <th scope="col" className="px-6 py-3">
        Title
      </th>
      <th scope="col" className="px-6 py-3">
        Author
      </th>
      <th scope="col" className="px-6 py-3">
        Section
      </th>
      <th scope="col" className="px-6 py-3">
        Status
      </th>
      <th scope="col" className="px-6 py-3">
        Actions
      </th>
    </tr>
  </thead>);
  return (
    <>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <FiltersArticle />

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {tableHead}
          <tbody>
            {
              listArticle &&
              listArticle.map((item, idx) =>
              (


                <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item?.title}
                  </th>
                  <td className="px-6 py-4">
                    {item?.authors}
                  </td>
                  <td className="px-6 py-4">
                    {item?.section}
                  </td>
                  <td className="px-6 py-4">
                  {
                        ArticleStatusOptions.find(option => option.value === item?.status)?.title || item?.status
                    }
                     
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`articles/update/${item._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><i class="fa-solid fa-pen-to-square"></i> Edit </Link>
                  </td>
                </tr>
              )
              )
            }






          </tbody>
        </table>

        <div className='w-full text-right rtl:text-left'>
          <ButtonAlternative textButton='Load more' iconButton='fa fa-plus' />
        </div>
      </div>

    </>
  )
}

export default Page
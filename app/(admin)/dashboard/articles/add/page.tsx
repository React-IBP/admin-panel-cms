"use client";
import React, { useContext, useEffect, useState } from 'react';
import { TitleComponentContext } from "@/context/TitleComponentContext";
import { toast } from 'sonner';
import { toast as toastifAlert } from "react-toastify";
import Editor from '@/components/editor/editor';
import { ButtonDefault } from '@/components/ui/Buttons';
import { createArticleAction } from '@/app/api/articles/addArtile';
import { sections, assets, ArticleStatusOptions } from '@/components/ui/assets/assets';
import Image from 'next/image';
import { mongoErrrors } from '@/utils/helpers';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Tabs from './Tabs';

const Page = () => {
  const defaultValue = {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": []
      }
    ]
  };

  const [image, setImage] = useState(null);
  const { setTitle } = useContext(TitleComponentContext);
  const [data, setData] = useState({
    title: "",
    authors: "",
    description: "",
    slug: "",
    section: "0",
    image: "",
    status: ArticleStatusOptions[0].value,
    content: defaultValue,
  });

  const [pending, setPending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(ArticleStatusOptions[0].value);
  const [activeTab, setActiveTab] = useState('tabDetails');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle('Add Articles');
  }, [setTitle]);

  useEffect(() => {
    setData(prevData => ({ ...prevData, image }));
  }, [image]);

  useEffect(() => {
    setData(prevData => ({ ...prevData, content: data.content }));
  }, [data.content]);

  useEffect(() => {
    generateSlug();
  }, [data.title]);

  const generateSlug = () => {
    const slugUrl = data.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    setData(prevData => ({ ...prevData, slug: slugUrl }));
  };

  const handleSubmit = async () => {
    setPending(true);
    const formData = new FormData();

    // Agregar los campos de data al formData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Solo agregar la imagen si hay una seleccionada
    if (image) {
      formData.append('image', image);
    }

    try {
      const result = await createArticleAction(formData);
      const resultado = JSON.parse(result);
      setSaving(true);

      if (resultado.success) {
        setErrors({});
        setData({
          title: "",
          authors: "",
          description: "",
          slug: "",
          section: "0",
          image: "",
          status: ArticleStatusOptions[0].value,
          content: defaultValue,
        });
        toastifAlert.success(resultado.msg);
      } else {
        setErrors(prevErrors => ({ ...prevErrors, ['saved']: resultado.errors }));
      }
      console.log('result save article', resultado);
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    } finally {
      setPending(false);
      setSaving(false);
    }
  };

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
  };

  useEffect(() => {
    if (errors?.error) {
      const name = Object.keys(errors.error.keyValue)[0];
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  }, [errors]);

  return (
    <>
      {saving ? (
        <LoadingSpinner />
      ) : (
        <div className="relative overflow-x-auto">
          <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
          <div>
            {errors && (
              <span className="errorMessageLabel">
                {mongoErrrors[errors?.saved?.code]?.message}
              </span>
            )}
          </div>

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

          {/* Editor */}
          <div className={`mb-5 ${activeTab === 'tabWrite' ? '' : 'hidden'}`} id='tabWrite'>
            <Editor initialValue={data.content || defaultValue} onChange={content => setData(prevData => ({ ...prevData, content }))} />
            {errors?.saved?.errors?.content && (
              <span className="errorMessageLabel">
                {errors.saved.errors.content.message}
              </span>
            )}
          </div>

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
            <div className={` mb-5 `}>
                <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>


                <select onChange={onchangeHandler} id="section" name="section" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                  {
                    sections.map((item, idx) => (
                      item.value.length === 0
                        ? <option key={idx * 2} defaultValue="0">Select a section</option>
                        : <option key={idx} value={item.value}>{item.title}</option>
                    ))
                  }

                </select>
                {errors?.saved?.errors?.section && (
                  <>
                    <span className="errorMessageLabel">{
                      errors.saved.errors.section.message
                    }  </span>
                  </>
                )}
              </div>
              
          </div>

          <div className={` mb-5  ${activeTab === 'tabPictures' ? ' ' : 'hidden'}`} id='tabPictures'>
              <div className=" mb-5 flex flex-col  z-0 w-full mb-5 group text-center items-center">

                <label htmlFor="image">
                  <Image
                    className="mt-4"
                    src={image ? URL.createObjectURL(image) : assets.upload_area}
                    alt=""
                    width={image ? 400 : 100}
                    height={image ? 300 : 145}
                  />

                </label>
                <input
                  onChange={(event) => setImage(event.target.files[0])}
                  type="file"
                  id="image"
                  name="image"
                  hidden
                />
              </div>
            </div>

          <div className="mb-5">
            <ButtonDefault
              textButton={pending ? 'Loading...' : 'Save Article'}
              handleButton={handleSubmit}
              iconButton='fa fa-save'
              className='cursor-pointer'
              typeButton='submit'
              
            />
              
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

"use client"
import React, { useContext, useEffect, useState } from 'react'
import { TitleComponentContext } from "@/context/TitleComponentContext";
import { toast } from 'sonner';
import { toast as toastifAlert } from "react-toastify";
import Editor from '@/components/editor/editor';
import { Button } from "@/components/editor/ui/Button";
import { ButtonDefault } from '@/components/ui/Buttons';
import { createArticleAction, updateArticleAction } from '@/app/api/articles/addArtile';
import { sections, assets, ArticleStatusOptions } from '@/components/ui/assets/assets';
import Image from 'next/image';
import { mongoErrrors } from '@/utils/helpers';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import axios from 'axios';

const Page: React.FC<ArticleProps> = (params) => {
  const defaultValue = {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": []
      }
    ]
  }
  const [image, setImage] = useState(null);
  const { setTitle } = useContext(TitleComponentContext);
  const [title, setTitleArticle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState(defaultValue); // En lugar de string, usa un objeto JSON
  // JSON.stringify(content)
  // Guardar el contenido del editor aquí
  const [pending, setPending] = useState(false);
  const initialDataForm = {
    _id:"",
    title: "",
    authors: "",
    description: "",
    slug: "",
    section: "0",
    image: "",
    status: ArticleStatusOptions[0].value,
    content: defaultValue, // Guarda el contenido inicial como un JSON.
  }
  const [dataArticle, setDataArticle] = useState(initialDataForm);
  const [saving, setSaving] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(ArticleStatusOptions[0].value); // Estado por defecto


  const [activeTab, setActiveTab] = useState('tabDetails');
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setTitle('Edit Article');
  }, []);
  useEffect(() => {
    setDataArticle((prevData) => ({ ...prevData, image: image }));
  }, [image]);



  useEffect(() => {
    setDataArticle((data) => ({ ...data, content }));
  }, [content]);

  useEffect(() => {
    generateSlug()
  }, [dataArticle.title]);

  const generateSlug = () => {
    const slugUrl = dataArticle.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    setSlug(slugUrl);
    setDataArticle((prevData) => ({ ...prevData, slug: slugUrl }));
  };


  const handleSubmit = async () => {
    setPending(true);

    const formData = new FormData();

    // Agregar los campos de data al formData
    formData.append('articleId', dataArticle._id);
    formData.append('title', dataArticle.title);
    formData.append('authors', dataArticle.authors);
    formData.append('description', dataArticle.description);
    formData.append('slug', dataArticle.slug);
    formData.append('section', dataArticle.section);
    formData.append('status', dataArticle.status);

    // Solo agregar la imagen si hay una seleccionada
    if (image) {
      formData.append('image', image);
    }

    // Convertir el contenido a una cadena JSON 
    // formData.append('content', JSON.stringify(content));
    formData.append('content', JSON.stringify(content));
     
    try {

      const result: any = await updateArticleAction(formData); // Envía el FormData
      const resultado = JSON.parse(result);
      setSaving(true);
      if (resultado.success === false) {
        setErrors((prevErrors) => ({ ...prevErrors, ['saved']: resultado.errors }));
        setSaving(false);
      }
      if (resultado.success === true) {
        setErrors({});
        setDataArticle(initialDataForm);
        toastifAlert.success(resultado.msg);
        setSaving(false);
      }
      console.log('result save article', resultado)
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      return error;
    } finally {
      setPending(false);
    }
  };


  const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setDataArticle((data) => ({ ...data, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  useEffect(() => {
    if (errors?.error) {
      const name = Object.keys(errors?.error?.keyValue)[0];
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      console.log('los errores', errors)
    }
  }, [errors?.error]);
  
  useEffect(() => {
    fetchDataArticle()
  }, []);
  const fetchDataArticle = async () => {
    const { id } = params.params;
    const urlArticleApi = process.env.APP_URL + `/api/articles?id=${id}`;

    try {
      const response = await axios.get(urlArticleApi);
      const dataArticle = response.data.articles[0];
       
      setDataArticle({
        _id:dataArticle._id,
        title: dataArticle.title ,
        authors: dataArticle.authors,
        description: dataArticle.description,
        slug: dataArticle.slug,
        section: dataArticle.section,
        image: dataArticle.image,
        content: JSON.parse(dataArticle.content),
        status: dataArticle.status
      }); 
      setContent(JSON.parse(dataArticle.content)); 
      let contenteditable = document.querySelector('[contenteditable="true"]');
      if (contenteditable) {
        contenteditable.innerHTML = JSON.parse(dataArticle.content); // Asignar el contenido
      }
      setImage(response.data.image);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user");
    }
  };
  // useEffect(() => {
  //   if (dataArticle) {
  //     setContent(dataArticle.content); // Establecer el contenido en el estado si es necesario
  //     let contenteditable = document.querySelector('[contenteditable="true"]');
  //     if (contenteditable) {
  //       contenteditable.innerHTML = dataArticle.content; // Asignar el contenido
  //     }
  //   }
  // }, []);

  return (
    <>
      {
        saving ? (<LoadingSpinner />) : (
          <div className="relative overflow-x-auto">


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
            <div >

              {errors && (
                <>
                  <span className="errorMessageLabel">
                    {mongoErrrors[errors?.saved?.code]?.message || null}
                  </span>
                </>
              )}
            </div>

            <div className={`tabsContainer relative z-0 w-full mb-5 group mt-4 ${activeTab === 'tabDetails' ? ' ' : 'hidden'}`}>
              <div className={` mb-5  ${activeTab === 'tabDetails' ? ' ' : 'hidden'}`} id='tabDetails'>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                  onChange={onchangeHandler}
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Set the title post here!"
                  required
                  value={dataArticle.title}
                />
                {errors?.saved?.keyValue?.slug && (
                  <>
                    <span className="errorMessageLabel">{
                      mongoErrrors[errors?.saved?.code]?.message
                    }</span>
                  </>
                )}

                {errors?.saved?.errors?.title && (
                  <>
                    <span className="errorMessageLabel">{
                      errors.saved.errors.title.message
                    }  </span>
                  </>
                )}
              </div>
              <div className={` mb-5 `}>
              <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>                
                <select id="satus" name="satus" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedStatus} onChange={onchangeHandler}>
                  {ArticleStatusOptions.map(option => (
                    <option key={option._id} value={option.value}>
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className={` mb-5 `}>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Authors</label>
                <input
                  onChange={onchangeHandler}
                  type="text"
                  name="authors"
                  id="authors"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Set the author post here!"
                  required
                  value={dataArticle.authors}
                />
                {errors?.saved?.errors?.authors && (
                  <>
                    <span className="errorMessageLabel">{
                      errors.saved.errors.authors.message
                    }  </span>
                  </>
                )}
              </div>

              <div className={` mb-5 `}>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea onChange={onchangeHandler} id="description" name='description' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a summary here..." defaultValue={dataArticle.description}></textarea>
                {errors?.saved?.errors?.description && (
                  <>
                    <span className="errorMessageLabel">{
                      errors.saved.errors.description.message
                    }  </span>
                  </>
                )}
              </div>
            </div>

            {/* Editor */}
            <div className={` mb-5  ${activeTab === 'tabWrite' ? ' ' : 'hidden'}`} id='tabWrite'>
              <Editor initialValue={content || defaultValue} onChange={setContent} />
              
              {errors?.saved?.errors?.content && (
                <>
                  <span className="errorMessageLabel">{
                    errors.saved.errors.content.message
                  }  </span>
                </>
              )}
            </div>
            <div className={` mb-5  ${activeTab === 'tabMetadata' ? ' ' : 'hidden'}`} id='tabMetadata'>
              <div className={` mb-5 `}>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>

                <input
                  onChange={onchangeHandler}
                  type="text"
                  name="slug"
                  id="slug"
                  disabled={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                  value={slug}
                />
                {errors?.saved?.keyValue?.slug && (
                  <>
                    <span className="errorMessageLabel">{
                      mongoErrrors[errors?.saved?.code]?.message
                    } ({errors?.saved?.keyValue?.slug})</span>
                  </>
                )}

                {errors?.saved?.errors?.slug && (
                  <>
                    <span className="errorMessageLabel">{
                      errors.saved.errors.slug.message
                    }  </span>
                  </>
                )}


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



            <ButtonDefault handleButton={handleSubmit} typeButton='submit' textButton={pending ? 'Submitting...' : 'Save'} iconButton='fa fa-save' className=' mt-2' />
          </div>
        )
      }
    </>
  );
}

export default Page;

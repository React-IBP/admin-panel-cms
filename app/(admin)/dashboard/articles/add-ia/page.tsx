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
import extractJsonLd from './extractArticleContent';
import { Geminis } from './processArticleGemini';


import TabDetails from './TabDetails';
import TabMetadata from './TabMetadata';
import TabPictures from './TabPictures';
import { ExtractImagesGemini } from './ExtractImagesGemini';
import { uploadImageCloudinary } from './uploadImageCloudinary.js';
const Page = () => {
  const [defaultValue, setDefaultValue] = useState({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "" }]
      }
    ]
  });

  const [url, setUrl] = useState('https://www.semana.com/politica/articulo/exclusivo-ferney-lozano-quien-gestiono-la-avioneta-de-papa-pitufo-para-gustavo-petro-rompe-su-silencio-y-revela-lo-que-ocurrio/202504/');
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const handleExtract = async () => {
    setLoading(true); // Activar el estado de carga
    setArticle(null); // Reiniciar el estado del artículo para forzar la re-renderización
    const content = await extractJsonLd(url);

    if (content.withNewsArticle != null && content.withNewsArticle !== "" && content.withNewsArticle !== "undefined" && content.withNewsArticle !== undefined) {
      let articleGenerate = await Geminis(content.withNewsArticle);
      articleGenerate = articleGenerate.replace(/```/g, ''); // Limpiar el contenido
      const jsonArticle = JSON.parse(articleGenerate);
      console.log('jsonArticle', jsonArticle);
      
      let titleArticle = jsonArticle['content'][0]['content'][0]['text']
          let slugUrlArticle = titleArticle
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

      

      let articleImages = await ExtractImagesGemini(content.withNewsArticle);
      articleImages = articleImages.replace(/```/g, ''); // Limpiar el contenido
      console.log('las imagenes', articleImages);

      try {
        const parsedImages = JSON.parse(articleImages);
        console.log("json parse", parsedImages);
    
        if (parsedImages.imagenes_principales && parsedImages.imagenes_principales.length > 0) {
            const imageUrl = parsedImages.imagenes_principales[0];
            console.log("URL de la imagen a subir:", imageUrl);
    
            const responseImg = await uploadImageCloudinary(imageUrl, slugUrlArticle);
            console.log("Respuesta de Cloudinary:", responseImg);
    
            if (responseImg && responseImg.secure_url) {
                setImage(responseImg.secure_url);
            } else {
                console.log("No se encontró secure_url en la respuesta de Cloudinary.");
            }
        } else {
            console.log("No hay imágenes principales.");
        }
    } catch (error) {
        console.error("Error al convertir JSON:", error);
    }
    

      try {
        // Verifica si es string y parsea a objeto
        const parsedContent = typeof articleGenerate === 'string'
          ? JSON.parse(articleGenerate)
          : articleGenerate;

        setArticle(parsedContent); // Actualizar el estado del artículo
        setDefaultValue(parsedContent); // Actualizar el valor por defecto del editor
        //setData(prevData => ({ ...prevData, content: parsedContent })); // Actualizar el estado de los datos
        // Extraer el título del artículo (primer heading de nivel 2)


        if (parsedContent) {
          let titleArticle = parsedContent['content'][0]['content'][0]['text']
          let slugUrlArticle = titleArticle
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          
          setData(prevData => ({
            ...prevData,
            title: titleArticle,
            urlArticle: slugUrlArticle,
            authors: "IA-Generated",
            description: "description",
            slug: slugUrlArticle,
            section: "colombia",
            image: "",
            status: "draft",
            content: parsedContent
          }));
          console.warn('la data', data)
        }

      } catch (error) {
        console.error('Error al parsear contenido:', error);
      }
    }
    setLoading(false); // Desactivar el estado de carga
  };

  const [image, setImage] = useState(null);
  const { setTitle } = useContext(TitleComponentContext);
  const [data, setData] = useState({
    urlArticle: "",
    title: "",
    authors: "",
    description: "",
    slug: "",
    section: "0",
    image: "",
    status: ArticleStatusOptions[0].value,
    content: defaultValue, // Inicializar con defaultValue
  });

  const [pending, setPending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(ArticleStatusOptions[0].value);
  const [activeTab, setActiveTab] = useState('tabUrl');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle('Add Articles-');
  }, [setTitle]);

  useEffect(() => {
    setData(prevData => ({ ...prevData, image }));
  }, [image]);

  useEffect(() => {
    setData(prevData => ({ ...prevData, content: defaultValue }));
    //console.log(`El articulo en json ${defaultValue}`); 
  }, [defaultValue]); // Se ejecuta cada vez que cambia defaultValue
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
    const editorElement = document.querySelector('[contenteditable="true"]');
    const htmlContent = editorElement && editorElement.innerHTML ? editorElement.innerHTML : 'czxc';
    console.log('htmlContent', htmlContent);
    formData.set('content', htmlContent);
    for (const key in data) {
      formData.append(key, data[key]);
    }

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
          urlArticle: "",
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

          <div className={`tabsContainer relative z-0 w-full mb-5 group mt-4 ${activeTab === 'tabUrl' ? '' : 'hidden'}`}>
            <div className={`mb-5 ${activeTab === 'tabUrl' ? '' : 'hidden'}`} id='tabUrl'>
              <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Url para extraer contenido de un artículo</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Ingresa la URL del artículo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                className='cursor-pointer mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                id="btnExtraer"
                onClick={handleExtract}
                disabled={loading} // Deshabilitar el botón mientras se carga
              >
                {loading ? (
                  <i className="fa fa-spinner fa-spin"></i> // Mostrar spinner si está cargando
                ) : (
                  <i className="fa fa-search"></i> // Mostrar ícono de búsqueda si no está cargando
                )}
                {loading ? " Procesando..." : " Extraer"}
              </button>
            </div>
          </div>




          {/* Renderizar el editor solo si hay contenido */}
          {article ? (
            <div className={`mb-5 ${activeTab === 'tabWrite' ? '' : 'hidden'}`} id='tabWrite'>
              <Editor initialValue={defaultValue} onChange={content => setData(prevData => ({ ...prevData, content }))} />
              {errors?.saved?.errors?.content && (
                <span className="errorMessageLabel">
                  {errors.saved.errors.content.message}
                </span>
              )}
            </div>
          ) : (
            <div className={`mb-5 ${activeTab === 'tabWrite' ? '' : 'hidden'}`} id='tabWrite'>
              <p>Esperando contenido...</p>
            </div>
          )}

          <TabDetails
            activeTab={activeTab}
            onchangeHandler={onchangeHandler}
            data={data}
            errors={errors}
          />

          <TabMetadata
            activeTab={activeTab}
            onchangeHandler={onchangeHandler}
            data={data}
            errors={errors}
          />

          <TabPictures
            activeTab={activeTab}
            image={image}
            setImage={setImage}
          />



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
'use server'

import { ConnectDB } from "@/utils/config/db";
import ArticleModel from "@/models/articleModel";
import { redirect } from 'next/navigation';
import { writeFile } from 'fs/promises'; // Utiliza el módulo fs/promises para trabajar con promesas.
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

 // Importa tu modelo de artículo

export async function updateArticleAction(data: FormData) {
  console.log('Form Data:', data);
  const timestamp = Date.now();
  let fileName = null;
  let imgUrl = null;
  const image = data.get("image");
  const articleId = data.get("articleId");

  console.log("Image:", typeof image);

  
  // Si existe una imagen en el formulario
  if (image && image.arrayBuffer) {
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const extension = image.name.split(".").pop();

    fileName = `${timestamp}_article_image`;

    if (!fileName.toLowerCase().endsWith(`.${extension}`)) {
      fileName = `${fileName}.${extension}`;
    }

    const path = (nameFile: string, extension: string) => {
      let fileName = `./public/images/articles/${nameFile}`;
      if (!fileName.toLowerCase().endsWith(extension)) {
        fileName = `${fileName}.${extension}`;
      }
      return fileName;
    };

    const filePath = path(fileName, extension);
    await writeFile(filePath, buffer);
    imgUrl = filePath.replace("./public/", "/");
  } else {
    imgUrl = `/public/images/articles/placeholder_article.png`; // Imagen por defecto
  }

  // Estructura de los datos para actualizar en la base de datos
  const articleData = {
    title: `${data.get("title")}`,
    slug: `${data.get("slug")}`,
    description: `${data.get("description")}`,
    section: `${data.get("section")}`,
    authors: `${data.get("authors")}`,
    status: `${data.get("status")}`,
    image: `${imgUrl}`,
    content: data.get("content"),
  };

  console.log("Data to update in db", articleData);

  try {
    // Buscar el artículo existente por ID
    const article = await ArticleModel.findById(articleId);

    if (!article) {
      return JSON.stringify({
        success: false,
        msg: "Article not found",
      });
    }

    // Actualizar los campos del artículo
    Object.assign(article, articleData);

    // Guardar el artículo actualizado
    await article.save();
    console.log("Article updated successfully");

    const response = {
      success: true,
      msg: "Article updated successfully",
      article,
    };
    return JSON.stringify(response);
  } catch (error: any) {
    console.log('Error updating article:', error);
    const response = {
      success: false,
      msg: error?.message || "Error updating the article",
      errors: error,
    }
    return JSON.stringify(response);
  }
}

 
export async function createArticleAction(data: FormData) {
  console.log('daaaaaa', data)
  const timestamp = Date.now();
  let fileName = null;
  let imgUrl = null;
  const image = data.get("image");

  console.log("Image:", typeof image);

  // Si existe una imagen en el formulario
  if (image && image.arrayBuffer) {
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const extension = image.name.split(".").pop();

    fileName = `${timestamp}_article_image`;

    if (!fileName.toLowerCase().endsWith(`.${extension}`)) {
      fileName = `${fileName}.${extension}`;
    }

    const path = (nameFile: string, extension: string) => {
      let fileName = `./public/images/articles/${nameFile}`;
      if (!fileName.toLowerCase().endsWith(extension)) {
        fileName = `${fileName}.${extension}`;
      }
      return fileName;
    };

    const filePath = path(fileName, extension);
    await writeFile(filePath, buffer);
    imgUrl = filePath.replace("./public/", "/");
  } else {
    imgUrl = `/public/images/articles/placeholder_article.png`;
  }

  // Estructura de los datos para guardar en la base de datos
  const articleData = {
    title: `${data.get("title")}`,
    slug: `${data.get("slug")}`,
    description: `${data.get("description")}`,
    section: `${data.get("section")}`,
    authors: `${data.get("authors")}`,
    status: `${data.get("status")}`,
    image: `${imgUrl}`,
    content: data.get("content"),
  };

  console.log("Data to save in db", articleData);

  try {
    // Guardar el artículo en la base de datos
    const article = await ArticleModel.create(articleData);
    console.log("Article created");
    const response = {
      success: true,
      msg: "Article created successfully",
      article,
    };
    return JSON.stringify(response);
  } catch (error: any) {
    console.log('error response to create article', error);
    const response = {
      success: false,
      msg: error?.message || "Error creating the article",
      errors: error,
    }
    return JSON.stringify(response);
  }
}

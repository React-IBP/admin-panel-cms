import { ConnectDB } from "@/utils/config/db";
import ArticleModel from "@/models/articleModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
import { Buffer } from 'buffer';
const { exec } = require('child_process');

const fs = require("fs");
const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

  // Reemplaza espacios con guiones, elimina guiones al principio y al final, y recorta los espacios sobrantes
  const segmenter = (slug) => {
    // Convertir a minúsculas
    slug = slug.toLowerCase();
    // Reemplazar caracteres especiales
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina acentos
    // Reemplazar cualquier carácter que no sea una letra, número o espacio por un guion
    slug = slug.replace(/[^a-z0-9\s-]/g, "");
    // Reemplazar uno o más espacios o guiones por un solo guion
    slug = slug.replace(/[\s-]+/g, "-");
    // Eliminar guiones al principio o al final
    slug = slug.replace(/^-+|-+$/g, "");
    return slug;
  };


export async function GET(request) {
  try {
    const paramsRequest = request.nextUrl.searchParams;
    const title = paramsRequest.get("title");
    const id = paramsRequest.get("id");
    const slug = request.nextUrl.pathname.split("/").pop();

    let articles;
     
     
      
     
     
     
     
     
    // Validar el tipo de búsqueda por parámetro
    if (title) {
      // Encontrar el artículo por el título
      articles = await ArticleModel.find({ slug: title });
    } else if (id) {
      // Encontrar el artículo por el id
      articles = await ArticleModel.find({ _id: id });
    } else {
      // Obtener todos los artículos de la base de datos y ordenar por id descendente
      articles = await ArticleModel.find({}).sort({ _id: -1 });
    }

    console.log("data response --------------------->", articles);
    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching articles --------------------->", error);
    return NextResponse.json(
      { error: "Error fetching articles" },
      { status: 500 }
    );
  }
}

//Create a post on db

export async function POST(request) {
  try {
    // Obtener los datos JSON del cuerpo de la solicitud
    const data = await request.json();

    // Verificar que los datos necesarios estén presentes
    if (!data.title || !data.description || !data.category || !data.author || !data.authorImg || !data.image) {
      return NextResponse.json({
        success: false,
        msg: "Faltan campos obligatorios",
      }, { status: 400 });
    }

    const timestamp = Date.now();

    // Obtener la imagen en formato base64
    const base64Image = data.image;
    const imageBuffer = Buffer.from(base64Image, 'base64');

    // Obtener la extensión del archivo (asumiendo que es jpg/png)
    const extension = data.imageType || 'jpg'; // Puedes enviar el tipo de imagen desde el frontend

    // Crear el nombre de archivo con timestamp
    const fileName = `${timestamp}_article_image.${extension}`;

    // Ruta donde se guardará la imagen
    const filePath = `./public/images/articles/${fileName}`;

    // Guardar la imagen en el servidor
    await writeFile(filePath, imageBuffer);

    // Generar la URL de la imagen para la base de datos
    const imgUrl = `/images/articles/${fileName}`;

    // Crear el objeto con los datos del artículo
    const blogData = {
      title: data.title,
      slug: segmenter(data.title), // Asegúrate de que `segmenter` esté definido
      description: 'desc',
      content:data.description,
      section: data.category.toLowerCase(),
      authors: data.author,
      image: imgUrl,
      authorImg: data.authorImg,
      status:'draft'
    };

    console.log("Data to save in db", blogData);

    // Guardar los datos en la base de datos
    await ArticleModel.create(blogData);
    console.log("Article created");
	  restartApp()
    const response = await fetch('https://admin.laprensa-ia.tech/api/pm2', {
      method: 'GET',
    });
    const result = await response.json();
    console.log('Fetch response:-------->', result);

    return NextResponse.json({
      success: true,
      msg: "Article created successfully",
    });
  } catch (error) {
    console.error('Error al crear el artículo:', error);
    return NextResponse.json({
      success: false,
      msg: "Error to create article entry",
    }, { status: 500 });
  }
}


function restartApp() {
  // Reiniciar la aplicación usando PM2
  console.log('Reiniciando la aplicación...');

  exec('pm2 restart astro-cms', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al reiniciar la aplicación: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}


// update an existing article 
export async function PUT(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const articleId = formData.get("id");
  const image = formData.get("image");

  // Obtener los datos del artículo
  const existingArticle = await ArticleModel.findById(articleId);
  if (!existingArticle) {
    return NextResponse.json({
      success: false,
      msg: "Article not found",
    });
  }

  let imgUrl = existingArticle.image;

  if (image && image.size > 0) {  // Verifica si la imagen está presente y tiene tamaño
    let imageByteData;

    if (image.arrayBuffer) {
      imageByteData = await image.arrayBuffer();
    } else {
      imageByteData = Buffer.from(await image.text());
    }

    const buffer = Buffer.from(imageByteData);
    const extension = image.name.split(".").pop();
    let fileName = `${timestamp}_${image.name.toLowerCase()}`;

    if (!fileName.toLowerCase().endsWith(`.${extension}`)) {
      fileName = `${fileName}.${extension}`;
    }

    const segmenter = (slug) => {
      slug = slug.toLowerCase();
      slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      slug = slug.replace(/[^a-z0-9\s-]/g, "");
      slug = slug.replace(/[\s-]+/g, "-");
      slug = slug.replace(/^-+|-+$/g, "");
      return slug;
    };

    const path = (nameFile, extension) => {
      let fileName = `./public/images/articles/${segmenter(nameFile)}`;
      if (fileName.toLowerCase().endsWith(`${extension}`)) {
        fileName = fileName.replace(extension, `.${extension}`);
      }
      return fileName;
    };

    const filePath = path(fileName, extension);
    await writeFile(filePath, buffer);
    imgUrl = filePath.replace("./public/", "/");

    // Eliminar la imagen antigua si existe
    if (existingArticle.image) {
      const oldFilePath = `./public${existingArticle.image}`;
      await fs.unlink(oldFilePath, () => {});
    }
  }

  const updatedData = {
    title: formData.get("title"),
    slug: segmenter(formData.get("title")),
    description: formData.get("description"),
    category: formData.get("category").toLowerCase(),
    author: formData.get("author"),
    image: imgUrl,
    authorImg: formData.get("authorImg"),
  };

  try {
    await ArticleModel.findByIdAndUpdate(articleId, updatedData, { new: true });
    return NextResponse.json({
      success: true,
      msg: "Article updated successfully",
    });
  } catch (error) {
    console.log('An error occurred while updating article', error);

    return NextResponse.json({
      success: false,
      msg: "Error updating article",
    });
  }
}


// functionality to delete a article entry from the database

export async function DELETE(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  console.log("data delete--------------------->", blogId);
  if (blogId) {
    // Find the article by th id
    const article = await ArticleModel.findById(blogId);
    // Delete the article entry from the database
    fs.unlink(`./public/images/articles/${article.image}`, () => {});
    await ArticleModel.findByIdAndDelete(blogId);
    console.log("data response --------------------->", article);
    return NextResponse.json({
      success: true,
      msg: "article deleted successfully",
    });
  }
}



/**
 * Handles GET requests to fetch an article by its slug.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a JSON response containing the article data or an error message.
 *
 * @throws {Error} - If there is an error fetching the article.
 */
// export async function GET(request) {
//   try {
//     const slug = request.nextUrl.pathname.split("/").pop();

//     if (!slug) {
//       return NextResponse.json(
//         { error: "Slug not provided" },
//         { status: 400 }
//       );
//     }

//     const article = await ArticleModel.findOne({ slug });

//     if (!article) {
//       return NextResponse.json(
//         { error: "Article not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ article });
//   } catch (error) {
//     console.error("Error fetching article by slug --------------------->", error);
//     return NextResponse.json(
//       { error: "Error fetching article" },
//       { status: 500 }
//     );
//   }
// }
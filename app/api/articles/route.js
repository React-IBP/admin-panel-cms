import { ConnectDB } from "@/libs/config/db";
import ArticleModel from "@/libs/models/articleModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
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
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  // save image to your storage
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  // Obtener la extensión del archivo
  const extension = image.name.split(".").pop();
  console.log("La extensión del archivo", extension);
  // Crear el nombre de archivo con extensión
  let fileName = `${timestamp}_${image.name.toLowerCase()}`;

  // Si fileName no incluye la extensión, agregarla
  if (!fileName.toLowerCase().endsWith(`.${extension}`)) {
    fileName = `${fileName}.${extension}`;
  }



  const path = (nameFile, extension) => {
    let fileName = `./public/images/articles/${segmenter(nameFile)}`;
    // Asegurar que fileName termine con la extensión correcta
    if (fileName.toLowerCase().endsWith(`${extension}`)) {
      fileName = fileName.replace(extension, `.${extension}`);
    }
    return fileName;
  };

  // Suponiendo que writeFile es una función que escribe un archivo
  // Necesitas invocar la función path para obtener el nombre de archivo completo
  const filePath = path(fileName, extension);
  await writeFile(filePath, buffer);
  const imgUrl = filePath.replace("./public/", "/");
  const blogData = {
    title: `${formData.get("title")}`,
    slug: `${segmenter(formData.get("title"))}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`.toLowerCase(),
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get("authorImg")}`,
  };
  console.log("Data to save in db", blogData);
  // Save article data to db
  try {
    await ArticleModel.create(blogData);
    console.log("Article article created");
    return NextResponse.json({
      success: true,
      msg: "Article created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: "Error to create article entry",
    });
  }
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


// funtionally to delete a article entry from the database

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

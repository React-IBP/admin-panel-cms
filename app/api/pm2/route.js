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

 


export async function GET(request) {
  try {
    restartApp()
    return NextResponse.json({ success: true, msg: "App restarted successfully" });
  } catch (error) {
    console.error("Error fetching articles --------------------->", error);
    return NextResponse.json(
      { error: "Error fetching articles" },
      { status: 500 }
    );
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
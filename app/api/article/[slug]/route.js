import { ConnectDB } from "@/utils/config/db";
import ArticleModel from "@/models/articleModel";
import { describe } from "node:test";
import { Section } from "lucide-react";

// Conectar a la base de datos
await ConnectDB();

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    // Buscar el artículo en la base de datos usando el slug
    const article = await ArticleModel.findOne({ slug });
    console.log('Article', article);
    if (article) {
      // Si el artículo existe, devolverlo como respuesta
      return new Response(
        JSON.stringify({
          _id: article._id,
          title: article.title,
          slug: article.slug,
          description: article.description,
          section: article.section,
          authors: article.authors,
          image: article.image,
          content: article.content,
          date: article.date,
          status: article.status,
         
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // Si el artículo no existe, devolver un error 404
      return new Response(
        JSON.stringify({ message: "Artículo no encontrado" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    // Si hay un error en el servidor, devolver un error 500
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error al obtener el artículo" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
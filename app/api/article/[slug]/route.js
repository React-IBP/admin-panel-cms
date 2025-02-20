import { ConnectDB } from "@/utils/config/db";
import ArticleModel from "@/models/articleModel";

// Conectar a la base de datos
await ConnectDB();

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    // Buscar el artículo en la base de datos usando el slug
    const article = await ArticleModel.findOne({ slug });

    if (article) {
      // Si el artículo existe, devolverlo como respuesta
      return new Response(
        JSON.stringify({
          title: article.title,
          content: article.content,
          author: article.author,
          date: article.date,
          slug: article.slug
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
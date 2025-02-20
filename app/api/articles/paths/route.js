import { ConnectDB } from "@/utils/config/db";
import ArticleModel from "@/models/articleModel";
const { NextResponse } = require("next/server");

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || null, 10);
    const limit = parseInt(searchParams.get("limit") || null, 10);

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Los valores de page y limit deben ser mayores a 0" },
        { status: 400 }
      );
    }

    // Obtener el total de artículos
    const totalArticles = await ArticleModel.countDocuments();

    // Calcular el total de páginas
    const totalPages = Math.ceil(totalArticles / limit);

    // Evitar que la página solicitada sea mayor que las disponibles
    if (page > totalPages) {
      return NextResponse.json(
        { error: "La página solicitada no existe", totalPages },
        { status: 404 }
      );
    }

    // Obtener los artículos con paginación
    let  articles = await ArticleModel.find({})
      .sort({ _id: -1 }) // Ordenar por ID descendente
      .skip((page - 1) * limit) // Saltar registros según la paginación
      .limit(limit) // Límite de artículos por página
      .select("slug"); // Solo seleccionar el campo slug

    return NextResponse.json({
      slugs: articles, // Retornar solo los slugs
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching articles --------------------->", error);
    return NextResponse.json(
      { error: "Error fetching articles" },
      { status: 500 }
    );
  }
}

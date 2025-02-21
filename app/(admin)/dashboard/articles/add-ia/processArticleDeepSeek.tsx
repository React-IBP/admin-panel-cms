import OpenAI from 'openai';

console.log('------------->', process.env.DEEPSEEK_API_KEY )
// Solo usa esta API Key en el servidor, no en el cliente
const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: process.env.DEEPSEEK_API_KEY,
	dangerouslyAllowBrowser: true
});




export async function DeepSeek(content) {
	const promptContent1 = `
      {
    "prompt": {
        "instructions": [
            "Analiza el contenido proporcionado en formato ld+json (${content}) y genera un artículo atractivo y bien estructurado en formato HTML.",
            "Genera **exclusivamente** un artículo dentro de la etiqueta <article itemscope itemtype='https://schema.org/NewsArticle'>. No incluyas etiquetas adicionales como <html>, <body>, <head>, ni explicaciones antes o después del artículo.",
            "Asegúrate de que el contenido comience con <article> y termine con </article>.",
            "No incluyas etiquetas HTML innecesarias como <h1>, <meta>, <img>, o enlaces externos.",
            "No incluyas símbolos extraños o caracteres que no sean propios del idioma español.",
            "Elimina cualquier mención del autor, fuentes o referencias externas.",
            "Sé realista y coherente con la información generada, evitando errores en fechas o detalles.",
            "Enriquece el contenido con información relevante y veraz, simulando fuentes confiables como Google News, El Tiempo, Semana, El Universal y Vanguardia Liberal.",
            "Estructura el artículo en HTML utilizando las siguientes etiquetas:",
            "- <h2> para subtítulos principales.",
            "- <h3> para sub-subtítulos.",
            "- <p> para párrafos.",
            "- <ul> o <ol> para listas, si es necesario.",
            "Incluye un párrafo introductorio que responda a las preguntas básicas: ¿Qué? ¿Quién? ¿Dónde? ¿Cuándo? ¿Por qué?.",
            "Amplía la información con un párrafo de desarrollo que proporcione detalles interesantes.",
            "Brinda contexto adicional en un párrafo separado para ayudar a comprender el tema.",
            "Incluye un párrafo de análisis que presente diferentes perspectivas y posibles consecuencias.",
            "Finaliza con un párrafo de cierre que resuma los puntos principales y ofrezca una conclusión impactante.",
            "Utiliza un lenguaje claro, conciso y atractivo, incluyendo técnicas de escritura persuasiva como preguntas retóricas o datos impactantes.",
            "Invita al usuario a reflexionar, comentar o compartir el contenido al final del artículo."
        ]
    },
    "format": "html",
    "safety": "lax",
    "length": "long",
    "temperature": 0.8,
    "presence_penalty": 0.4,
    "translate": false
}
        `;

	const promptContent = `
{
  "prompt": {
    "instructions": [
      "Analiza el contenido proporcionado en formato ld+json (${content}) y genera un artículo atractivo, bien estructurado y coherente en formato HTML.",
      "Genera **exclusivamente** un artículo dentro de la etiqueta <article itemscope itemtype='https://schema.org/NewsArticle'>. No incluyas etiquetas adicionales como <html>, <body>, <head>, ni explicaciones antes o después del artículo.",
      "Asegúrate de que el contenido comience con <article> y termine con </article>.",
      "No incluyas etiquetas HTML innecesarias como <h1>, <meta>, <img> o enlaces externos.",
      "No agregues información no verificable o que pueda inducir a error. La narrativa debe ser realista y basada en hechos dentro del contenido analizado.",
      "Evita mencionar nombres de periodistas, autores o fuentes específicas que no estén en el contenido proporcionado.",
      "Si el contenido es ambiguo, redacta el artículo con neutralidad y contexto sin hacer suposiciones infundadas.",
      "Estructura el artículo en HTML de la siguiente manera:",
      "- <h2> para títulos principales.",
      "- <h3> para subtítulos que organicen la información.",
      "- <p> para párrafos con información detallada.",
      "- <ul> o <ol> para listas cuando sea necesario, asegurando que sean relevantes.",
      "Incluye un párrafo introductorio que explique el tema de manera clara y responda a las preguntas clave: ¿Qué ocurrió? ¿Quién está involucrado? ¿Dónde y cuándo pasó? ¿Por qué es relevante?",
      "Desarrolla el cuerpo del artículo con detalles adicionales, proporcionando contexto relevante para mejorar la comprensión.",
      "Añade un párrafo de análisis que explore diferentes perspectivas y posibles implicaciones del tema tratado.",
      "Finaliza con un párrafo de cierre que resuma los puntos clave y proponga una reflexión o pregunta abierta para el lector.",
      "Usa un lenguaje claro, preciso y atractivo, evitando exageraciones o términos sensacionalistas.",
      "Invita al lector a reflexionar, comentar o compartir el artículo sin forzar la interacción."
    ]
  },
  "format": "html",
  "safety": "lax",
  "length": "long",
  "temperature": 0.8,
  "presence_penalty": 0.4,
  "translate": false
}
`;
 
const promptContent2 = `
{
  "prompt": {
    "instructions": [
      "Analiza el contenido proporcionado en formato ld+json (${content}) y genera un artículo atractivo, bien estructurado y coherente en formato JSON compatible con TipTap/ProseMirror.",
      "Genera **exclusivamente** un artículo en formato JSON con la siguiente estructura:",
      "{",
      "  \"type\": \"doc\",",
      "  \"content\": [",
      "    {",
      "      \"type\": \"paragraph\",",
      "      \"content\": [{ \"type\": \"text\", \"text\": \"Este es un párrafo.\" }]",
      "    }",
      "  ]",
      "}",
      "No incluyas etiquetas HTML como <article>, <h2>, <p>, ni explicaciones antes o después del JSON.",
      "Asegúrate de que el contenido comience con { y termine con }.",
      "No incluyas información no verificable o que pueda inducir a error. La narrativa debe ser realista y basada en hechos dentro del contenido analizado.",
      "Evita mencionar nombres de periodistas, autores o fuentes específicas que no estén en el contenido proporcionado.",
      "Si el contenido es ambiguo, redacta el artículo con neutralidad y contexto sin hacer suposiciones infundadas.",
      "Estructura el artículo en JSON de la siguiente manera:",
      "- Usa \"type\": \"heading\" con \"attrs\": { \"level\": 2 } para títulos principales.",
      "- Usa \"type\": \"heading\" con \"attrs\": { \"level\": 3 } para subtítulos que organicen la información.",
      "- Usa \"type\": \"paragraph\" para párrafos con información detallada.",
      "- Usa \"type\": \"bulletList\" o \"type\": \"orderedList\" para listas cuando sea necesario, asegurando que sean relevantes.",
      "Incluye un párrafo introductorio que explique el tema de manera clara y responda a las preguntas clave: ¿Qué ocurrió? ¿Quién está involucrado? ¿Dónde y cuándo pasó? ¿Por qué es relevante?",
      "Desarrolla el cuerpo del artículo con detalles adicionales, proporcionando contexto relevante para mejorar la comprensión.",
      "Añade un párrafo de análisis que explore diferentes perspectivas y posibles implicaciones del tema tratado.",
      "Finaliza con un párrafo de cierre que resuma los puntos clave y proponga una reflexión o pregunta abierta para el lector.",
      "Usa un lenguaje claro, preciso y atractivo, evitando exageraciones o términos sensacionalistas.",
      "Invita al lector a reflexionar, comentar o compartir el artículo sin forzar la interacción."
    ]
  },
  "format": "json",
  "safety": "lax",
  "length": "long",
  "temperature": 0.8,
  "presence_penalty": 0.4,
  "translate": false
}
`;

	//   console.log('El prompt ', promptContent)
	try {
		const completion = await openai.chat.completions.create({
			messages: [{ role: "user", content: `Responde promt en el mismo idioma que se hace: ${promptContent2}` }],
			model: "deepseek/deepseek-r1:free",
		});
		//console.log('LA  respuesta', completion.choices[0]?.message?.content)
		return completion.choices[0]?.message?.content || "No se pudo obtener respuesta.";
	} catch (error) {
		console.error("Error en DeepSeek:", error);
		return "Error al obtener la respuesta.";
	}
}

export async function proccessArticleDeepSeek(dataArticle) {
    let respuesta = null;
    console.log('Interactuando con DeepSeek');

    if (!dataArticle || dataArticle.length === 0) {
        return null;
    }

    try {
        // Ejecutar la pregunta y esperar la respuesta
        respuesta = await DeepSeek(dataArticle);

        // Expresión regular para extraer el contenido dentro de <article>...</article>
        const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/i;
        const match = respuesta.match(articleRegex);

        // Si se encuentra el tag <article>, retornar su contenido
        if (match && match[0]) {
            respuesta = match[0];
            console.log('El dato', respuesta );
        } else {
            console.warn("No se encontró el tag <article> en la respuesta de DeepSeek.");
            respuesta = null;
        }

    } catch (error) {
        console.error("Error en proccessArticleDeepSeek:", error);
    }

    return respuesta;
}

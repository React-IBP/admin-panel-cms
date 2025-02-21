export const promptContent1 =  (content) => `
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

export const promptContent = (content) => `
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
//o fuentes específicas que no estén en el contenido proporcionado.",

export const promptGeraArticle = (content) => `
{
  "prompt": {
    "instructions": [
      "Título Impactante: Crea un título llamativo, SEO-friendly y que incluya palabras clave relevantes. Usa emojis para generar curiosidad y atraer la atención del lector.",
      "Introducción Atrapante: Escribe un párrafo introductorio que capture la atención del lector. Responde a las preguntas clave: ¿Qué ocurrió? ¿Quién está involucrado? ¿Dónde y cuándo pasó? ¿Por qué es relevante? Incluye un dato impactante o una estadística relevante.",
      "Desarrollo del Contenido: Divide el artículo en secciones claras y bien estructuradas. Usa subtítulos (h2 y h3) para organizar la información. Asegúrate de incluir:",
      "- Contexto detallado: Proporciona antecedentes y explica por qué el tema es importante.",
      "- Datos y cifras: Incluye estadísticas, estudios o datos verificables para respaldar la información.",
      "- Análisis profundo: Explora diferentes perspectivas, causas y consecuencias del tema.",
      "- Ejemplos y casos prácticos: Usa ejemplos reales o hipotéticos para ilustrar los puntos clave.",
      "Listas y Puntos Clave: Cuando sea relevante, usa listas con viñetas (bullet points) o numeradas para facilitar la lectura y resaltar información importante.",
      "Cierre con Impacto: Resume los puntos principales del artículo y ofrece una conclusión impactante. Incluye una llamada a la acción (CTA) que invite al lector a reflexionar, comentar o compartir el contenido.",
      "Extensión del Artículo: El artículo debe tener al menos 800 palabras. Asegúrate de que el contenido sea sustancioso, bien investigado y detallado.",
      "Lenguaje y Estilo: Usa un lenguaje claro, preciso y atractivo. Evita exageraciones o términos sensacionalistas. Mantén un tono profesional pero accesible.",
      "SEO y Palabras Clave: Incluye palabras clave relevantes de manera natural en el título, los subtítulos y el cuerpo del artículo. Asegúrate de que el contenido sea optimizado para motores de búsqueda.",
      "Emojis y Atractivo Visual: Usa emojis de manera estratégica para resaltar puntos clave y hacer el contenido más atractivo visualmente.",
      "Fuentes y Veracidad: Asegúrate de que toda la información sea verificable y esté respaldada por fuentes confiables. No inventes datos ni detalles.",
      "Analiza el contenido proporcionado en formato ld+json (${content}) y genera un artículo atractivo",
      "Formato JSON: Genera el artículo en formato JSON compatible con TipTap/ProseMirror. Sigue la estructura proporcionada y asegúrate de que el contenido comience con { y termine con }.",
      "Estructura del JSON:",
      "- Usa \"type\": \"heading\" con \"attrs\": { \"level\": 2 } para títulos principales.",
      "- Usa \"type\": \"heading\" con \"attrs\": { \"level\": 3 } para subtítulos.",
      "- Usa \"type\": \"paragraph\" para párrafos con información detallada.",
      "- Usa \"type\": \"bulletList\" o \"type\": \"orderedList\" para listas cuando sea necesario.",
      "No incluyas etiquetas HTML como <article>, <h2>, <p>, ni explicaciones antes o después del JSON.",
      "Evita mencionar nombres de periodistas, autores o fuentes específicas que no estén en el contenido proporcionado.",
      "Si el contenido es ambiguo, redacta el artículo con neutralidad y contexto sin hacer suposiciones infundadas.",
      "No uses esto en la respuesta: \`\`\`"
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

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
"Título Impactante: Usa palabras clave llamativas y emojis para generar curiosidad, ademas debe ser SEO Friendly.",
"Introducción Atrapante: Explica el tema de forma breve pero intrigante, incluyendo un dato clave.",
"Explicación Clara y Estructurada: Divide el contenido en secciones con subtítulos y usa listas para facilitar la lectura.",
"Datos y Pruebas de Manera Accesible: Explica términos técnicos de forma sencilla y resalta información importante.",
"Cierre con Impacto y Llamada a la Acción: Resume el impacto de la noticia y motiva al lector a estar atento o tomar acción.",
"Elimina esto Introducción: o este Cierre:   no es necesario osea no coloques como si fuera un documento de texto para imprimir",
"solo introduce o cierra sin usar Introducción:   o este Cierre:  en el texto",
"Busca contenido en la web para enrriqueser el articulo y hacerlo mas atractivo",
"Usa palabras clave y emojis para generar curiosidad y atraer la atención del lector.",
"Genera una articulo sustancioso y atractivo para el lector",
"Analiza el contenido proporcionado en formato ld+json (${content}) y genera un artículo atractivo, bien estructurado y coherente en formato JSON compatible con TipTap/ProseMirror.",
"**Nota:** Asegúrate de que la noticia sea clara, precisa y respete los hechos originales sin agregar información inventada.",
"Genera **exclusivamente** un artículo en formato JSON con la siguiente estructura: para editor nobel editor",
 "{",
"  \"type\": \"doc\",",
"  \"content\": [",
"    {",
"      \"type\": \"heading\",",
"      \"attrs\": { \"level\": 2 },",
"      \"content\": [{ \"type\": \"text\", \"text\": \"Título principal\" }]",
"    },",
"    {",
"      \"type\": \"paragraph\",",
"      \"content\": [{ \"type\": \"text\", \"text\": \"Este es un párrafo introductorio que explica el tema.\" }]",
"    },",
"    {",
"      \"type\": \"heading\",",
"      \"attrs\": { \"level\": 3 },",
"      \"content\": [{ \"type\": \"text\", \"text\": \"Subtítulo\" }]", 
"    },",
"    {",
"      \"type\": \"paragraph\",",
"      \"content\": [{ \"type\": \"text\", \"text\": \"Este es un párrafo con detalles adicionales.\" }]",
"    }",
"  ]",
"}",
"usa el ejemplo anterior para generar la respuesta es solo un ejemplo puedes agregar mas contenido"
"No incluyas etiquetas HTML como <article>, <h2>, <p>, ni explicaciones antes o después del JSON.",
"Asegúrate de que el contenido comience con { y termine con }.",
"No incluyas información no verificable o que pueda inducir a error. La narrativa debe ser realista y basada en hechos dentro del contenido analizado.",
"Evita mencionar nombres de periodistas, autores",
"Usa contenido de la web para enriquecer la noticia",
"Si el contenido es ambiguo, redacta el artículo con neutralidad y contexto sin hacer suposiciones infundadas.",
"Segun el ld+json incluye el lugar de la noticia y fechas del suceso o evento segun el contexto del ld+json",
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
"no uses esto en la respuesta \`\`\`"
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

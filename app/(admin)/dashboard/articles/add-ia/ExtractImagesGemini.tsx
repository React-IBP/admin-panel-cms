import OpenAI from 'openai';
  
export async function ExtractImagesGemini(content) {
	 

const promptContent = `
{
  "prompt": {
    "instructions": [
      "Analiza el contenido proporcionado en formato JSON-LD (${content}).",
      "Genera un objeto JSON que contenga dos arreglos:",
      "1. **imagenes_principales**: Un arreglo con las URLs de las imágenes principales extraídas directamente del JSON-LD proporcionado.",
      "2. **imagenes_secundarias**: Un arreglo con URLs de imágenes generadas por inteligencia artificial (IA). Estas imágenes deben estar relacionadas con el contenido del JSON-LD y deben ser simuladas ( es necesario que existan realmente).",
      "genera un prompt logico para generar imagenes secundarias teniendo en cuenta el contenido del JSON-LD.",
      "Por favor, asegúrate de que las URLs de las imágenes sean accesibles y válidas.",
      "El JSON generado debe seguir el siguiente formato:",
      "{",
      "  \"imagenes_principales\": [\"url1\", \"url2\", ...],",
      "  \"imagenes_secundarias\": [\"url_ia1\", \"url_ia2\", ...]",
      "  \"prompt_imagenes\": ["prompt de la generación de imágenes secundarias"]",
      "}",
      "Ejemplo de respuesta:",
      "{",
      "  \"imagenes_principales\": [\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"],",
      "  \"imagenes_secundarias\": [\"https://example.com/ia_image1.jpg\", \"https://example.com/ia_image2.jpg\"]",
      "}",
      "No incluyas delimitadores de código como \`\`\` en la respuesta."
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
		     return new Promise((resolve, reject) => {
				 
        const requestData = {
            contents: [{
                parts: [{
                    text: promptContent
                }]
            }]
        };

        console.log("Prompt refineArticle  ----------->:", requestData);

        fetch(process.env.GEMINI_FLASH_API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(responseData => {
            console.log('Response: HTML', responseData);

            let dataCandidates = responseData.candidates[0].content.parts[0].text
                .replace(`JSON\n{`, '{')
                .replace(`json\n{`, '{')
                .replace(`html\n{`, '{')
                .replace(`HTML\n{`, '{')
                .replace('```', '');
 
            resolve(dataCandidates); // Resuelve la promesa con el contenido procesado
        })
        .catch(error => {
             
            console.error('Error:', error);
            reject(error); // Rechaza la promesa en caso de error
        });
    });
	} catch (error) {
		console.error("Error en Geminis:", error);
		return "Error al obtener la respuesta.";
	}
}

 

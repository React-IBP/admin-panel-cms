import OpenAI from 'openai';
import { sections } from '@/components/ui/assets/assets';
  
export async function SetSectionArticle(content) {

const promptContent = `
{
  "prompt": {
    "instructions": [
      "Analiza el contenido proporcionado en formato JSON-LD (${content}).",
      "Regresame el nombre de la seccion a la que debe pertenecer el articulo aqui tienes las secciones que puedes usar${sections}",
      "Regresa el nombre exacto de la seccion, no incluyas comillas ni caracteres especiales.",
      "no agregues informacion adicional en la respuesta.",
      "Ejemplo de respuesta:",
        "colombia" o "cartagena" ,
      "solo usa una palabra" ,
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

 

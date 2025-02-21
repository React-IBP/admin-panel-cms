import OpenAI from 'openai';

console.log('------------->', process.env.GEMINI_PRO_API_KEY)
 
import {promptGeraArticle} from './prompts.js';

export async function Geminis(content) {


	//   console.log('El prompt ', promptContent)
	try {
		     return new Promise((resolve, reject) => {
				 
        const requestData = {
            contents: [{
                parts: [{
                    text: promptGeraArticle(content)
                }]
            }]
        };

        console.log("Prompt refineArticle  ----------->:", requestData);

        fetch(process.env.GEMINI_PRO_API_KEY, {
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

export async function proccessArticleGeminis(dataArticle) {
    let respuesta = null;
    console.log('Interactuando con Geminis');

    if (!dataArticle || dataArticle.length === 0) {
        return null;
    }

    try {
        // Ejecutar la pregunta y esperar la respuesta
        respuesta = await Geminis(dataArticle);

        // Expresión regular para extraer el contenido dentro de <article>...</article>
        const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/i;
        const match = respuesta.match(articleRegex);

        // Si se encuentra el tag <article>, retornar su contenido
        if (match && match[0]) {
            respuesta = match[0];
            console.log('El dato', respuesta );
        } else {
            console.warn("No se encontró el tag <article> en la respuesta de Geminis.");
            respuesta = null;
        }

    } catch (error) {
        console.error("Error en proccessArticleGeminis:", error);
    }

    return respuesta;
}

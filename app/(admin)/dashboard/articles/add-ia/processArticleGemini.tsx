import { promptGeraArticle } from './prompts.js';

export async function Geminis(content) {
    try {
        const requestData = {
            contents: [{
                parts: [{ text: promptGeraArticle(content) }]
            }]
        };

        console.log("Prompt refineArticle ----------->:", requestData);//GEMINI_PRO_API_KEY

        const response = await fetch(process.env.GEMINI_FLASH_API_KEY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Response: HTML', responseData);

        // Limpiar el contenido de la respuesta
        const dataCandidates = responseData.candidates[0].content.parts[0].text
            .replace(/(JSON|json|html|HTML)\n\{/, '{')
            .replace(/```/g, '');

        return dataCandidates; //retorna el contenido procesado
    } catch (error) {
        console.error("Error en Geminis:", error);
        throw new Error("Error al obtener la respuesta."); //  Rechaza la promesa en caso de error
    }
}
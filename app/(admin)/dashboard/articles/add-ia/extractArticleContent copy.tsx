"use server";
import { chromium } from 'playwright';

async function extractJsonLd(url) {
	// url ='https://www.eluniversal.com.co/cartagena/2025/02/19/que-ha-pasado-con-el-edificio-ocean-tower-alcaldia-dio-detalles/';
	    let browser;
    try {
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

      /*  page.on("console", (msg) => {
            console.log("Consola del navegador:", msg.text());
        });*/

        await page.goto(url, { waitUntil: "networkidle" ,
            timeout: 60000,});

        const jsonLdElements = await page.evaluate(() => {
            const scripts = document.querySelectorAll('script[type="application/ld+json"]');
            console.log('los escrpt', scripts)
            return Array.from(scripts).map(script => {
                try {
                    return JSON.parse(script.textContent);
                } catch (error) {
                    return null;
                }
            }).filter(item => item !== null);
        });

        let html1 = ``;
        let html2 = ``;
        
        jsonLdElements.forEach((item, index) => {
            // Asegurar que `item` tiene la clave @type y que puede ser un string o un array
            const tipo = Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]];

            if (tipo.includes("NewsArticle")) {
                html2 += `${JSON.stringify(item, null, 2)}`;
            } else {
                html1 += `No posee NewsArticle`;
            }
        });

        console.log("Elementos JSON-LD extraídos:", html2);

        await browser.close();
        return { withNewsArticle: html2, withoutNewsArticle: html1 };

    } catch (error) {
        console.error("Error al extraer JSON-LD:", error);
        if (browser) await browser.close();
        return null;
    }
}

export default extractJsonLd;

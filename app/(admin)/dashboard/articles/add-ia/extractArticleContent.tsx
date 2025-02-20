"use server";
import { chromium } from 'playwright';

async function extractJsonLd(url) {
    let browser;
    try {
        browser = await chromium.launch({ headless: true });
        
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        });
        const page = await context.newPage();

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

        const jsonLdElements = await page.evaluate(() => {
            const scripts = document.querySelectorAll('script[type="application/ld+json"]');
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
        
        jsonLdElements.forEach((item) => {
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

import { Router, Request, Response } from "express";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

async function resolveRedirectWithPuppeteer(url: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const resolvedUrl = page.url();
  await browser.close();
  return resolvedUrl;
}

const misc_router = Router();

misc_router.post("/parse-product-url", async (req: Request, res: Response) => {
  const inputUrl = req.body.url;
  if (!inputUrl || typeof inputUrl !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  let finalUrl = inputUrl;
  if (inputUrl.includes("amzn.eu") || inputUrl.includes("amzn.to")) {
    try {
      finalUrl = await resolveRedirectWithPuppeteer(inputUrl);
    } catch {
      return res.status(400).json({ error: "Failed to resolve shortlink" });
    }
  }

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.goto(finalUrl, { waitUntil: "domcontentloaded" });

    const html = await page.content();
    const $ = cheerio.load(html);

    let title = "",
      image = "",
      price = "";

    if (finalUrl.includes("amazon")) {
      title = $("span#productTitle").text().trim();
      image =
        $("img#landingImage").attr("src") ||
        $("div#imgTagWrapperId img").attr("data-old-hires") ||
        $("div#imgTagWrapperId img").attr("src") ||
        "";
      price = $("span.a-price span.a-offscreen").first().text().trim();
    } else if (finalUrl.includes("etsy")) {
      title = $("h1[data-buy-box-listing-title]").text().trim();
      image = $('img[data-index="0"]').attr("src") || "";
      price = $('[data-buy-box-region="price"]').first().text().trim();
    } else {
      return res.status(400).json({ error: "Unsupported URL" });
    }

    if (!title || !image || !price) {
      return res.status(422).json({ error: "Failed to extract product data" });
    }

    return res.json({ title, image, price });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (browser) await browser.close();
  }
});

export default misc_router;

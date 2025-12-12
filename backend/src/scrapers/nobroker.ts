import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeNoBroker(url: string) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  const $ = cheerio.load(data);

  const title = $("h1").first().text().trim();
  const price = $("span[class*='rupee']").first().text().trim();
  const location = $("span[class*='locality']").first().text().trim();
  const bhk = $("h1").text().match(/\d+\s*BHK/)?.[0] || null;
  const area = $("span:contains('sqft')").first().text().trim();
  const builder = $("span:contains('Builder')").first().text().trim();

  return { title, price, location, bhk, area, builder };
}

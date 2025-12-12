import axios from "axios";
import * as cheerio from "cheerio";

export async function scrape99Acres(url: string) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  const $ = cheerio.load(data);

  const title = $("h1").first().text().trim();
  const price = $("span:contains('₹')").first().text().trim();
  const location = $("span[class*='loc']").first().text().trim();
  const bhk = title.match(/\d+\s*BHK/)?.[0] || null;
  const area = $("span:contains('sqft')").first().text().trim();
  const builder = $("a:contains('Builder')").first().text().trim();

  return { title, price, location, bhk, area, builder };
}

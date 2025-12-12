import axios from "axios";

export async function scrapeMagicBricks(url: string) {
  try {
    const idMatch = url.match(/(\d+).html/);

    if (!idMatch) return null;

    const propId = idMatch[1];

    const apiUrl = `https://www.magicbricks.com/mbsrp/propertyDetail/mbsrp/propertyDetailApi?propId=${propId}`;

    const { data } = await axios.get(apiUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    return {
      title: data.propertyTitle || null,
      price: data.price || null,
      location: data.locality || null,
      bhk: data.bedrooms ? data.bedrooms + " BHK" : null,
      area: data.superArea ? data.superArea + " sqft" : null,
      builder: data.builderName || null,
    };

  } catch (err) {
    console.log("MagicBricks scrape error:", err);
    return null;
  }
}

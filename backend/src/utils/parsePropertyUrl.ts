export function parsePropertyUrl(rawUrl: string) {
  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    return {
      portal: "unknown",
      title: null,
      bhk: null,
      location: null,
    };
  }

  const hostname = url.hostname.toLowerCase();
  const pathParts = url.pathname.split("/").filter(Boolean);

  let portal = "unknown";
  if (hostname.includes("magicbricks")) portal = "magicbricks";
  else if (hostname.includes("99acres")) portal = "99acres";
  else if (hostname.includes("nobroker")) portal = "nobroker";

  let slug = pathParts[pathParts.length - 1] || "";
  slug = decodeURIComponent(slug).replace(/\.html?$/i, "");
  const slugText = slug.replace(/-/g, " ").toLowerCase();

  const bhkMatch = slugText.match(/(\d+)\s*bhk/);
  const bhk = bhkMatch ? `${bhkMatch[1]} BHK` : null;

  let title = slugText
    .replace(/(\d+)\s*bhk/g, "")
    .replace(/\bfor sale\b/g, "")
    .replace(/\bfor rent\b/g, "")
    .replace(/\bin\b/g, "")
    .trim();

//   if (!title) title = null;

  let location: string | null = null;
  if (pathParts.length >= 2) {
    const loc = decodeURIComponent(pathParts[pathParts.length - 2]);
    location = loc.replace(/-/g, " ");
  }

  return { portal, title, bhk, location };
}

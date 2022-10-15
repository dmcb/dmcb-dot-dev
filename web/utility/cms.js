import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_DATASET,
  apiVersion: "2022-03-25",
  useCdn: false
});

const fetchSiteSettings = async () => {
  const siteSettings = await client.fetch(`*[_type == "siteSettings"]{
    title,
    portrait,
    "portraitUrl": portrait.asset->url
  }`);
  return siteSettings[0];
}

module.exports = {
  fetchSiteSettings
}
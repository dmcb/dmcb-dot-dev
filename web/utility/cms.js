import { createClient } from "next-sanity";

const client = createClient({
  projectId: "t71u3cfy",
  dataset: "production",
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
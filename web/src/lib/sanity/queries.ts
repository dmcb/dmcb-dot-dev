import groq from 'groq';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;
export const projectsQuery = groq`*[_type == "projects"]|order(orderRank)`;

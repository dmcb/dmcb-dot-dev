import type { ImageAsset } from '@sanity/types';
import groq from 'groq';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  "portraitUrl": portrait.asset->url,
  "portraitAlt": portrait.alt
}`;

export const projectsQuery = groq`*[_type == "projects"]`;

export interface siteSettings {
	title?: string;
	description?: string;
	portraitUrl?: string;
	portraitAlt?: string;
}

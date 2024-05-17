import type { ImageAsset } from '@sanity/types';
import groq from 'groq';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  "portraitUrl": portrait.asset->url,
  "portraitAlt": portrait.alt
}`;

export interface siteSettings {
	title?: string;
	portraitUrl?: string;
	portraitAlt?: string;
}

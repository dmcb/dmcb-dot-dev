import type { ImageAsset } from '@sanity/types';
import groq from 'groq';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const projectsQuery = groq`*[_type == "projects"]`;

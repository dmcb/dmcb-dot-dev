import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';
import { siteSettingsQuery } from '$lib/sanity/queries';

export const prerender = true;

export async function load() {
	const siteSettings_promise = client.fetch(siteSettingsQuery);
	const siteSettings = await siteSettings_promise;
	if (siteSettings) {
		return {
			siteSettings,
		};
	}

	throw error(500, 'Error retrieving content');
}

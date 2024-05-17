import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';
import { siteSettingsQuery, type siteSettings } from '$lib/sanity/queries';

export const prerender = true;

export async function load({ setHeaders }) {
	setHeaders({
		'X-Frame-Options': 'SAMEORIGIN'
	});

	const siteSettings_promise = client.fetch(siteSettingsQuery);
	const siteSettings = await siteSettings_promise;
	if (siteSettings) {
		return {
			siteSettings
		};
	}

	throw error(500, 'Error retrieving content');
}

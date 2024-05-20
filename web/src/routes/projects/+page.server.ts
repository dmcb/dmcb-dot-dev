import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';
import { projectsQuery } from '$lib/sanity/queries';

export const prerender = true;

export async function load() {
	const projects_promise = client.fetch(projectsQuery);
	const projects = await projects_promise;
	if (projects) {
		return {
			projects,
		};
	}

	throw error(500, 'Error retrieving content');
}

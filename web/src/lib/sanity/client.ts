import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, projectId, dataset, studioUrl } from '$lib/sanity/api';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
	stega: {
		studioUrl,
	},
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export const urlFor = (source: SanityImageSource) => {
	return builder.image(source);
};

<script>
  import { urlFor } from '$lib/sanity/client';

  export let image;
  export let width = 640;
</script>

<img src={urlFor(image).width(width).url()} alt={image.alt} />
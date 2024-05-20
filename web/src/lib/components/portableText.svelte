<script lang="ts">
  import { PortableText } from '@portabletext/svelte';

  export let value: Sanity.PageContent;
</script>

<PortableText value={value} />
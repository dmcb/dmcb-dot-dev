<script>
  import '../../node_modules/modern-normalize/modern-normalize.css';
  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import Header from '$lib/components/header.svelte';

  export let data;

  injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
    <title>{data.siteSettings.title}</title> 
    <meta name="description" content={data.siteSettings.description} />
</svelte:head>

<Header />
<main id="content">
  <div class="wrapper">
    <slot />
  </div>
</main>

<style>
  :root {
		/* Colours */
    --background-color: #fff;
    --faint-background-color: #f5f5f5;
    --dark-text-color: #000;
		--text-color: #555;
    --nav-background-color: #000;
    --nav-text-color: #999;
    --nav-hover-color: #fff;
    --link-color: #bd41a6;
    --link-hover-color: #8628b5;
  }

  @media (prefers-color-scheme: dark) {
		:root {
			--background-color: #000;
			--faint-background-color: #111;
			--dark-text-color: #fff;
      --text-color: #999;
		}
	}

  :global(body) {
    font-family: Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic",
      source-sans-pro, sans-serif;
    color: var(--text-color);
    background-color: var(--background-color);
    line-height: 1.4em;
    font-weight: 400;

    @media only screen and (min-width: 720px) {
      font-size: 18px;
    }

    @media only screen and (min-width: 1200px) {
      font-size: 19px;
    }

    @media only screen and (min-width: 1600px) {
      font-size: 20px;
    }
  }

  :global(a) {
    font-weight: 500;
    color: var(--link-color);
    transition: color 0.3s;

    &:active,
    &:focus,
    &:hover {
      color: var(--link-hover-color);
    }
  }

  :global(h1), :global(h2), :global(strong) {
    font-size: 1em;
    font-weight: 500;
    color: var(--dark-text-color);
  }

  :global(h1) {
    font-weight: 600;
    font-size: 1.25em;
    margin-top: 0;
    margin-bottom: 0.5em;
  }

  :global(.wrapper) {
    margin-left: auto;
    margin-right: auto;
    max-width: calc(100% - 4rem);

    @media only screen and (min-width: 480px) {
      max-width: 380px;
    }

    @media only screen and (min-width: 720px) {
      max-width: 640px;
    }

    @media only screen and (min-width: 1200px) {
      max-width: 800px;
    }

    @media only screen and (min-width: 1600px) {
      max-width: 920px;
    }
  }

  main {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>

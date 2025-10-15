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
  <slot />
</main>

<style>
  :root {
		/* Colours */
    --background-color: #fff;
    --faint-background-color: #f5f5f5;
    --dark-text-color: #28232c;
		--text-color: #49474b;
    --nav-background-color: #000;
    --nav-text-color: #999;
    --nav-hover-color: #fff;
    --link-color: #bd41a6;
    --link-hover-color: #8628b5;
    --font-size-small: 0.65rem;
  }

  @media (prefers-color-scheme: dark) {
		:root {
			--background-color: #1f1b22;
			--faint-background-color: #2f2934;
			--dark-text-color: #fff;
      --text-color: #c7becb;
		}
	}

  :global(body) {
    font-family: Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic",
      source-sans-pro, sans-serif;
    color: var(--text-color);
    background-color: var(--background-color);
    line-height: 1.4em;
    font-weight: 400;
    font-size: 16px;
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

  :global(h1, h2, strong) {
    font-weight: 500;
    color: var(--dark-text-color);
  }

  :global(h1, h2) {
    letter-spacing: -0.03rem;
    margin: 0 0 0.325rem 0;
  }

  :global(h1) {
    font-size: 1.2rem;
  }

  :global(h1 + p) {
    margin: 0;
  }

  :global(p:first-child) {
    margin-top: 0;
  }

  :global(p:last-child) {
    margin-bottom: 0;
  }

  :global(h2) {
    font-size: 1.6rem;
  }

  :global(.wrapper, main) {
    margin-left: auto;
    margin-right: auto;
    max-width: calc(920px - 4rem);
    padding: 0 2rem;
  }

  :global(.narrow) {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  :global(.extra-narrow) {
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }

  :global(section) {
    padding: 3rem 0;
  }
</style>

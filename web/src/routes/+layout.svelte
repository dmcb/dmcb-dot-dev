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

<style>
  :global(body) {
    font-family: Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic",
      source-sans-pro, sans-serif;
    color: #555;
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

    @media (prefers-color-scheme: dark) {
      background-color: #000;
      color: #999;
    }
  }

  :global(a) {
    font-weight: 500;
    color: #bd41a6;
    transition: color 0.3s;

    &:active,
    &:focus,
    &:hover {
      color: #8628b5;
    }
  }

  :global(h1), :global(h2), :global(strong) {
    font-size: 1em;
    font-weight: 500;
    color: #000;

    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
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

<Header />
<main id="content">
  <div class="wrapper">
    <slot />
  </div>
</main>
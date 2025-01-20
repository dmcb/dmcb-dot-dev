<script>
  import AccessibleImage from '$lib/components/accessibleImage.svelte';

  export let data;
</script>

<section>
  <div class="wrapper">
    <div class="profile">
      {#if data.siteSettings.portrait}
      <div class="portrait">
        <AccessibleImage image={data.siteSettings.portrait} width={198} />
      </div>
      {/if}
      <div class="inline">
        <h1>I&apos;m Derek McBurney</h1><p>, Head of Technology at <a href="https://www.evanshunt.com/">Evans Hunt</a>.</p>
      </div>
    </div>
    <p>I&apos;ve been a web geek forever. I care about inclusive and positive developer culture, and I love meaningful technology experiences.</p>
    <a class="button" href="https://calendly.com/d-mcburney/office-hours">Schedule a chat <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
  </div>
</section>


<style lang="scss">
  div.profile {
    display: flex;
    align-items: center;
  }

  div.portrait {
    width: 5em;
    height: 5em;
    border-radius: 100%;
    background-color: #bd41a6;
    flex-shrink: 0;
    transition: transform 0.3s;
    margin-right: 1em;

    :global(img) {
      width: 90%;
      height: 90%;
      margin-left: 5%;
      margin-top: 5%;
      border-radius: 100%;
      padding: 0;

    }

    &:hover {
      transform: scale(1.06);
    }

    @media (prefers-reduced-motion) {
      &:hover {
        transform: none;
      }
    }
  }

  a.button {
    display: inline-flex;
    padding: 0.5em 0.8em 0.5em 1em;
    background-color: #bd41a6;
    color: white;
    text-decoration: none;
    border-radius: 0.5em;
    margin-top: 1em;
    transition: background-color 0.3s;

    svg {
      margin-left: 0.25em;
      width: 1em;
      animation: arrow-pulse 3s infinite;

      @media (prefers-reduced-motion) {
        animation: none;
      }
    }

    &:hover, &:focus {
      background-color: #a82f8f;

      svg {
        animation: arrow-loop 0.6s infinite;

        @media (prefers-reduced-motion) {
          animation: none;
        }
      }
    }
  }

  @keyframes arrow-pulse {
    80% {
      transform: translateX(0);
    }
    90% {
      transform: translateX(0.25em);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes arrow-loop {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(0.25em);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
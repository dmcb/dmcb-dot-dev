<script>
  import AccessibleImage from '$lib/components/accessibleImage.svelte';

  export let data;
</script>

<section class="narrow">
  <div class="profile">
    {#if data.siteSettings.portrait}
    <div class="portrait">
      <AccessibleImage image={data.siteSettings.portrait} width={198} />
    </div>
    {/if}
    <div class="text">
      <h1>I&apos;m Derek McBurney</h1><p>Head of Technology at <a href="https://www.evanshunt.com/">Evans Hunt</a></p>
    </div>
  </div>
  <p>I&apos;ve been a web geek forever, and love building meaningful technology experiences and the teams to grow them.</p>
  <div class="actions">
    <a class="button" href="https://calendly.com/d-mcburney/office-hours"><span>Schedule a chat <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span></a>
  </div>
</section>


<style>
  div.profile {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  div.portrait {
    width: 6em;
    height: 6em;
    border-radius: 100%;
    background-color: #bd41a6;
    flex-shrink: 0;
    transition: transform 0.3s;
    margin-right: 1em;

    & > img {
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

  div.actions {
    display: flex;
    justify-content: flex-end;
  }

  a.button {
    display: inline-flex;
    text-decoration: none;
    margin-top: 1em;
    position: relative;

    & span {
      display: inline-flex;
      padding: 0.5em 0.8em 0.5em 1em;
      color: white;
      background-color: var(--link-color);
      border-radius: 1.5em;
      transition: transform 0.15s;
    }

    &::after {
      width: 100%;
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      top: 4px;
      left: 0;
      border-radius: 1.5em;
      background-color: var(--link-hover-color);
      z-index: -1;
    }

    & svg {
      margin-left: 0.25em;
      width: 1em;
      animation: arrow-pulse 3s infinite;

      @media (prefers-reduced-motion) {
        animation: none;
      }
    }

    &:hover, &:focus {
      & span {
        transform: translateY(4px);
      }

      & svg {
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
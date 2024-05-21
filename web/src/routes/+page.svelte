<script>
  import AccessibleImage from '$lib/components/accessibleImage.svelte';

  export let data;
</script>

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
</style>

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
  </div>
</section>
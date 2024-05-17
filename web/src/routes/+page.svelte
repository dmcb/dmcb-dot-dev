<script>
  export let data;
</script>

<svelte:head>
    <title>{data.siteSettings.title}</title> 
</svelte:head>

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

    img {
      width: 90%;
      height: 90%;
      margin-left: 5%;
      margin-top: 5%;
      border-radius: 100%;
      padding: 0;
    }

    + * {
      margin-left: 1em;
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

  section.about {
    div.wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>

<section class="about">
  <div class="wrapper">
    <div class="profile">
      {#if data.siteSettings.portraitUrl}
      <div class="portrait">
        <img src={data.siteSettings.portraitUrl + "?fm=webp&w=216"} alt={data.siteSettings.portraitAlt} />
      </div>
      {/if}
      <div class="inline">
        <h1>I&apos;m Derek McBurney</h1><p>, Head of Technology at <a href="https://www.evanshunt.com/">Evans Hunt</a>.</p>
      </div>
    </div>
    <p>I&apos;ve been a web geek forever. I care about inclusive and positive developer culture, and I love meaningful technology experiences.</p>
  </div>
</section>
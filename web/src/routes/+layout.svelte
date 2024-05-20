<script>
  import '../../node_modules/modern-normalize/modern-normalize.css';
  import { page } from '$app/stores';

  export let data;
  
  let navExpanded = false;
</script>

<svelte:head>
    <title>{data.siteSettings.title}</title> 
    <meta name="description" content={data.siteSettings.description} />
</svelte:head>

<style lang="scss">
    :global(*) {
      transform: translate3d(0, 0, 0);
      z-index: 1;
    }

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
        font-size: 21px;
      }

      @media only screen and (min-width: 1600px) {
        font-size: 24px;
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

    :global(section) {
      padding-top: 2em;
      padding-bottom: 2em;
    }

    :global(div.wrapper) {
      position: relative;
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

    :global(div.inline h1) {
      font-size: 1em;
      font-weight: 500;
    }

    :global(div.inline h1), :global(div.inline h1 + p) {
      display: inline;
    }

    nav {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3.75rem;
      font-weight: 500;
      background-color: #000;
      font-size: 1.25rem;

      #nav-content {
        background-color: #000;
        transition: transform 0.3s;
        transform: translateY(-100%);
        padding: 1rem 0;
      }

      a {
        text-decoration: none;
        color: #999;

        &:active,
        &:focus,
        &:hover {
          color: #fff;
        }

        &.skip {
          position: absolute;
          top: -1000px;
          left: -1000px;
          height: 1px;
          width: 1px;
          overflow: hidden;
          display: block;
          margin-bottom: 1em;

          &:active,
          &:focus,
          &:hover {
            position: static;
            width: auto;
            height: auto;
            overflow: visible;
            display: inline-block;
          }
        }

        svg {
          transition: fill 0.3s, color 0.3s;
          fill: #999;
          color: #999;
          height: 1.5em;

          path {
            transition: fill 0.3s, color 0.3s;
            fill: #999;
            color: #999;
          }
        }

        &:active svg,
        &:focus svg,
        &:hover svg {
          fill: #fff;
          color: #fff;

          path {
            fill: #fff;
            color: #fff;
          }
        }
      }

      ul {
        opacity: 0;
        margin: 0;
        padding: 0;
        transition: transform 0.3s, opacity 0.3s;
        transform: translateY(-2em);

        li {
          display: block;
          margin-bottom: 1em;

          &.active a {
            color: #fff;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }

        + ul {
          margin-top: 1em;
          display: flex;

          li {
            margin-bottom: 0;
            margin-right: 1em;
          }
        }
      }

      &.open {
        #nav-content {
          transform: translateY(0);
        }

        ul {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media only screen and (min-width: 720px) {
        font-size: 1rem;
        padding: 0.75rem 0;
        height: auto;

        #nav-content {
          transform: none;
          padding: 0;
        }

        a.skip {
          margin-bottom: 0;
        }

        ul {
          transform: translateY(0);
          opacity: 1;
          display: flex;

          li {
            display: inline;
            padding: 0;
            margin: 0 2em 0 0;

            &:last-child {
              margin-right: 0;
            }
          }

          + ul {
            margin-top: 0;
            position: absolute;
            right: 0;
            height: 1.6em;
            bottom: 0;

            li {
              margin-right: 1em;
              display: inline-block;
              height: 100%;

              a {
                display: inline-block;
                height: 100%;

                svg {
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }

    #nav-toggle {
      background-color: transparent;
      color: #fff;
      margin: 0;
      padding: 0;
      border: 0;
      position: absolute;
      top: 0.75em;
      right: 0;
      width: 2em;
      height: 1.5em;
      cursor: pointer;

      div {
        display: block;
        position: absolute;
        height: 0.25em;
        width: 100%;
        background: #fff;
        border-radius: 0.25em;
        opacity: 1;
        left: 0;
        transition: all 0.3s;

        &:nth-child(1) {
          top: 0;
        }

        &:nth-child(2),
        &:nth-child(3) {
          top: calc(50% - 0.125em);
        }

        &:nth-child(4) {
          top: calc(100% - 0.25em);
        }
      }

      &.open {
        div {
          &:nth-child(2) {
            transform: rotate(45deg);
          }

          &:nth-child(1),
          &:nth-child(4) {
            top: calc(50% - 0.125em);
            width: 0%;
            left: 50%;
          }

          &:nth-child(3) {
            transform: rotate(-45deg);
          }
        }
      }

      @media only screen and (min-width: 720px) {
        display: none;
      }
    }

    div.banner {
      display: block;
      background-image: url("/battlestation.webp");
      background-size: cover;
      background-position: bottom center;
      height: 36vh;
      width: 100%;
      transition: height 0.3s;

      @media (prefers-color-scheme: dark) {
        background-image: url("/battlestation-dark.webp");
      }

      @media (prefers-reduced-motion) {
        transition: none;
      }
    }

    header.index {
      div.banner {
        height: 52vh;
      }
    }

    // section.on-tap {
    //   .things {
    //     margin: 0;
    //     padding: 0;
    //     display: grid;
    //     column-gap: 2em;
    //     row-gap: 1em;
    //     place-items: center;
    //     place-content: center;
    //     grid-template-columns: 1fr 1fr;
    //   }

    //   .thing {
    //     display: block;
    //     aspect-ratio: 1;

    //     h2 {
    //       margin-top: 0;
    //     }
    //   }

    //   img {
    //     width: 100%;
    //     height: 100%;
    //     object-fit: contain;
    //     transform: scale(0.93);
    //     filter: drop-shadow(8px 0 0 #bd41a6) drop-shadow(0 8px 0 #bd41a6)
    //       drop-shadow(-8px 0 0 #bd41a6) drop-shadow(0 -8px 0 #bd41a6);
    //   }

    //   @media only screen and (min-width: 720px) {
    //     .things {
    //       grid-template-columns: 1fr 1fr 1fr;
    //       column-gap: 3em;
    //       row-gap: 1.5em;
    //     }
    //   }

    //   @media only screen and (min-width: 1200px) {
    //     .things {
    //       column-gap: 4em;
    //       row-gap: 2em;
    //     }
    //   }
    // }

</style>

<header class={$page.data.bannerType}>
  <nav class={navExpanded ? "open" : "closed"}>
    <div class="wrapper">
      <button id="nav-toggle" on:click={() => { navExpanded = !navExpanded}} aria-hidden="true" tabIndex="-1" class={navExpanded ? "open" : "closed"}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
    <div id="nav-content">
      <div class="wrapper">
        <a href="#content" on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} class="skip">Skip Navigation</a>
        <ul>
          <li class={$page.url.pathname == "/" ? "active" : ""}>
            <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="/">About Me</a>
          </li>
          <!-- <li class={$page.url.pathname == "/on-tap" ? "active" : ""}>
            <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="/on-tap">What's On Tap</a>
          </li> -->
          <li class={$page.url.pathname == "/projects" ? "active" : ""}>
            <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="/projects">Projects</a>
          </li>
          <li>
            <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="https://medium.com/@d.mcburney">Writing</a>
          </li>
          <li>
            <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="https://calendly.com/d-mcburney/office-hours">Office Hours</a>
          </li>
        </ul>
        <ul class="icons">
          <li>
            <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="https://hachyderm.io/@dmcb" title="Mastodon" target="_blank" rel="me">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 417.8 512" >
                <path xmlns="http://www.w3.org/2000/svg" d="M417.8 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.5-28.4-290.4 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54-.6-4.4-.9-9-.9-13.9 85.6 20.9 158.6 9.1 178.7 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6V190.1c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H75.1c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z"></path>
              </svg>
            </a>
          </li>
          <li>
            <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }}  href="https://www.linkedin.com/in/derekmcburney/" title="LinkedIn" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#999" d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </a>
          </li>
          <li>
            <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="https://github.com/dmcb" title="GitHub" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill="#999" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="banner">
  </div>
</header>

<main id="content">
  <slot />
</main>
<script>
  import { page } from '$app/stores';
    
  let navExpanded = false;
</script>

<header class={$page.data.bannerType}>
  <nav class={navExpanded ? "open" : "closed"}>
    <div id="nav-toggle">
      <button on:click={() => { navExpanded = !navExpanded}} aria-hidden="true" tabIndex="-1" class={navExpanded ? "open" : "closed"}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
    <div id="nav-content">
      <div class="wrapper">
        <a href="#content" on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} class="skip">Skip Navigation</a>
        <div class="menu">
          <ul class="links">
            <li class={$page.url.pathname == "/" ? "active" : ""}>
              <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="/">About Me</a>
            </li>
            <li class={$page.url.pathname == "/stuff" ? "active" : ""}>
              <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="/stuff">Stuff</a>
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
              <a on:click={() => {navExpanded = false}} on:focus={() => {navExpanded = true}} on:blur={() => { navExpanded = false }} href="https://bsky.app/profile/dmcb.dev" title="Bluesky" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="#999" d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565C.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479c.815 2.736 3.713 3.66 6.383 3.364c.136-.02.275-.039.415-.056c-.138.022-.276.04-.415.056c-3.912.58-7.387 2.005-2.83 7.078c5.013 5.19 6.87-1.113 7.823-4.308c.953 3.195 2.05 9.271 7.733 4.308c4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056c2.67.297 5.568-.628 6.383-3.364c.246-.828.624-5.79.624-6.478c0-.69-.139-1.861-.902-2.206c-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8"></path>
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
    </div>
  </nav>
  <div class="banner">
  </div>
</header>

<style>
  nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-weight: 500;
    background-color: var(--nav-background-color);
    font-size: 1.1rem;
    z-index: 10;
    padding: 2rem 0;
  }

  nav a {
    text-decoration: none;
    color: var(--nav-text-color);

    &:active,
    &:focus,
    &:hover {
      color: var(--nav-hover-color);
    }

    & svg {
      transition: fill 0.3s, color 0.3s;
      fill: var(--nav-text-color);
      color: var(--nav-text-color);
      width: 100%;
      line-height: 0;

      & path {
        transition: fill 0.3s, color 0.3s;
        fill: var(--nav-text-color);
        color: var(--nav-text-color);
      }
    }

    &:active svg,
    &:focus svg,
    &:hover svg {
      fill: var(--nav-hover-color);
      color: var(--nav-hover-color);

      & path {
        fill: var(--nav-hover-color);
        color: var(--nav-hover-color);
      }
    }
  }

  nav a.skip {
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


  #nav-toggle {
    position: absolute;
    top: 1rem;
    right: 2rem;
  }

  #nav-toggle button {
    background-color: transparent;
    color: var(--nav-text-color);
    margin: 0;
    padding: 0;
    border: 0;
    width: 2rem;
    height: 1.5rem;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }

  #nav-toggle button div {
    display: block;
    position: absolute;
    height: 0.25rem;
    width: 100%;
    background: var(--nav-hover-color);
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

  #nav-toggle button.open div {
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

  #nav-content {
    opacity: 0;
    transition: opacity 0.3s, margin-top 0.3s;
    margin-top: -11em;
  }

  #nav-content ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  #nav-content ul li {
    display: block;

    &.active a {
      color: #fff;
    }
  }

  #nav-content ul.icons {
    margin-top: 1em;
    flex-direction: row;
  }

  #nav-content ul.icons li {
    width: 1.5em;
    height: 1.5em;
  }

  nav.open #nav-content {
    margin-top: 0;
    opacity: 1;
  }

  div.banner {
    display: block;
    background-image: url("/battlestation.webp");
    background-size: cover;
    background-position: bottom center;
    height: 4rem;
    opacity: 0;
    width: 100%;
    transition: height 0.2s, opacity 0.2s;

    @media (prefers-color-scheme: dark) {
      background-image: url("/battlestation-dark.webp");
    }

    @media (prefers-reduced-motion) {
      transition: none;
    }
  }

  header.index div.banner {
    height: 52vh;
    opacity: 1;
  }

  @media only screen and (min-width: 640px) {
    nav {
      font-size: 1rem;
      padding: 0.75rem 0;
      height: auto;
    }

    #nav-toggle {
      display: none;
    }

    #nav-content {
      margin-top: 0;
      transform: translate3d(0, 0, 0);
      position: static;
      padding: 0;
      opacity: 1;
    }

    #nav-content .menu {
      display: flex;
      justify-content: space-between;
    }

    #nav-content ul {
      flex-direction: row;
      gap: 2em;
    }

    #nav-content ul.icons {
      margin-top: 0;
      gap: 1em;
    }

    div.banner {
      height: 3rem;
    }
  }
</style>
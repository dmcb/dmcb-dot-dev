<script>
  import PortableText from '$lib/components/portableText.svelte';
  import AccessibleImage from '$lib/components/accessibleImage.svelte';

  export let data;
</script>

<section class="extra-narrow">
  <h1>I like making stuff</h1>
  <p>When I'm not doing professional work I try to find time for hobby projects and other things.</p>
</section>

<article>
  <a href="https://5e-spellbook.app">
    <div class="content">
      <div class="meta">
        <span class="category">Making</span>
        <h2>5e Spellbook Builder</h2>
        <p>
          I love D&D and wanted to build the fastest, most frictionless web app to build spellbooks, look up 2024 and 2014 rules, and play with digital cards or print them.
        </p>
      </div>
      <div class="tags">
        <span class="tag">Sveltekit</span>
      </div>
    </div>
    <div class="feature spellbook">
      <img src="/images/blight.png" alt="Blight 5e spell card" />
      <img src="/images/fireball.png" alt="Fireball 5e spell card" />
    </div>
  </a>
</article>

<ul>
  <li>
    <a href="https://boardgamegeek.com/boardgame/359871/arcs" style="--background-image: url('/images/arcs.png')">
      <div class="content">
      <div class="meta">
        <span class="category">Enjoying</span>
        <span class="title">Arcs</span>
      </div>
      <div class="tags">
        <span class="tag">Board game</span>
      </div>
    </div>
    </a>
  </li>
  <li>
    <a href="https://landfall.se/peak" style="--background-image: url('/images/peak.png')">
      <div class="content">
      <div class="meta">
        <span class="category">Enjoying</span>
        <span class="title">PEAK</span>
      </div>
      <div class="tags">
        <span class="tag">Video game</span>
      </div>
    </div>
    </a>
  </li>
  <li>
    <a href="https://tv.apple.com/ca/show/slow-horses/umc.cmc.2szz3fdt71tl1ulnbp8utgq5o" style="--background-image: url('/images/slow-horses.png')">
      <div class="content">
        <div class="meta">
          <span class="category">Enjoying</span>
          <span class="title">Slow Horses</span>
        </div>
        <div class="tags">
          <span class="tag">TV show</span>
        </div>
      </div>
    </a>
  </li>
</ul>

<style>
  section {
    text-align: center;
  }

  .category {
    display: block;
    font-size: var(--font-size-small);
    text-transform: uppercase;
  }

  .title {
    display: block;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--dark-text-color);
  }

  article, ul li {
    display: block;
    padding: 0.5rem;
    background-color:  var(--faint-background-color);
    border-radius: 0.75rem;
    transition: background-color 0.3s;
    overflow: hidden;
  }

  article:has(a:hover), ul li:has(a:hover), article:has(a:focus), ul li:has(a:focus) {
    background-color: var(--link-color);
  }

  article a, ul li a {
    padding: 1.5rem;
    background-color:  var(--faint-background-color);
    border-radius: 0.5rem;
    text-decoration: none;
    color: inherit;
    height: 100%;
    display: block;
    position: relative;
  }

  article a {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    container-type: inline-size;
  }

  ul {
    margin: 1rem 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  ul li {
    width: 100%;
  }

  ul li a * {
    z-index: 2;
  }

  ul li a:before {
    content: "";
    display: block;
    position: absolute;
    top: 0.5rem;
    left: 50%;
    right: 0.5rem;
    bottom: 0.5rem;
    border-radius: 0.5rem;
    background-image: var(--background-image);
    background-size: 100%;
    background-position: top;
    background-repeat: no-repeat;
  }

  ul li a:after {
    content: "";
    display: block;
    position: absolute;
    top: 3.75rem;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
  }

  ul li .content {
    height: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .feature {
    overflow: hidden;
    height: 20cqw;
  }

  .feature.spellbook img {
    max-width: 40%;
    margin-left: auto;
    position: absolute;
    transition: transform 0.3s;
  }

  .feature.spellbook img:first-child {
    transform: rotate(-5deg);
    right: 30%;
  }

  .feature.spellbook img:last-child {
    transform: rotate(13deg);
    right: 10%;
  }

  article a:hover .feature.spellbook img:first-child, article a:focus .feature.spellbook img:first-child {
    transform: rotate(-10deg) translateY(-2cqw) translateX(-0.5cqw);
  }

  article a:hover .feature.spellbook img:last-child, article a:focus .feature.spellbook img:last-child {
    transform: rotate(18deg) translateY(-2.5cqw) translateX(0.5cqw);
  }

  .tag {
    display: inline-block;
    font-size: var(--font-size-small);
    text-transform: uppercase;
    color: var(--link-color);
    border-radius: 0.5rem;
    padding: 0.3rem 0.5rem;
    background-color: var(--background-color);
    line-height: 1rem;
    margin-top: 1rem;
  }

  @media only screen and (min-width: 640px) {
    article .content {
      width: 50%;
    }

    ul li {
      max-width: calc(100% / 3 - 0.67rem);
      min-height: clamp(10rem, 30vw, 15rem);
    }

    ul li a:before {
      top: 5.5rem;
      left: 0.5rem;
    }

    /* ul li a:after {
      background: radial-gradient(170% 100% at 100% 100%, transparent 85%, var(--faint-background-color) 100%);
    } */
  }
</style>

<!-- 
<section>
  <div class="wrapper">
    <h1 class="sr-only">Stuff</h1>
    <p>I love to build. Here are some recent hobby projects.</p>
    <ul class="projects">
      {#each data.projects as project}
        <li>
          <h2>{project.title}</h2>
          <div class="content">
            {#if project.images}
            <div class="images">
              {#each project.images.slice(0, 3) as image}
                <AccessibleImage image={image} width={896} />
              {/each}
            </div>
            {/if}
            <div class="text">
              <PortableText value={project.description} />
              <a href="{project.link}" class="button" target="_blank">
                <div><span>See the project</span></div>
              </a>
              {#if project.github}
                <a href="{project.github}" class="button" target="_blank">
                  <div>
                    <span>GitHub</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path fill="#999" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                  </div>
                </a>
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section> -->
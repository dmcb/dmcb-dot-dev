<script>
  import PortableText from '$lib/components/portableText.svelte';
  import AccessibleImage from '$lib/components/accessibleImage.svelte';

  export let data;
</script>

<style lang="scss">
  ul.projects {
    list-style: none;
    padding: 0;
    margin-top: 2em;

    li {
      margin-bottom: 2em;
      margin-left: -2em;
      margin-right: -2em;
      padding: 1.5em 2em;
      background-color: #eee;

      h2 {
        margin-top: 0;
      }

      @media (prefers-color-scheme: dark) {
        background-color: #222;
      }
    }
    @media only screen and (min-width: 720px) {
      .content {
        font-size: 0.9em;
      }
    }
  }

  .images {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    :global(img) {
      width: calc(33% - 0.1em);
      aspect-ratio: 1;
      object-fit: cover;
    }
  }

  a.button {
    display: inline-block;
    padding: 0.5em 1em;
    margin-top: 0.5em;
    border: 1px solid #333;
    border-radius: 0.25em;
    background-color: #333;
    color: white;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
    font-size: 1rem;

    &:hover {
      background-color: white;
      color: #333;
    }

    svg {
      width: 1rem;
      height: 1rem;
      margin-left: 0.5em;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>

<section>
  <div class="wrapper">
    <h1>Projects</h1>
    <p>You can learn more about my professional projects at <a href="https://evanshunt.com" target="_blank">evanshunt.com</a>.</p>
    <p>This is a space for my personal projects that I think are fun. Rough and in progress, these exist here in plain sight purely as motivation for me to keep going, but may serve as a useful reference for someone — your results may vary.</p>
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
</section>
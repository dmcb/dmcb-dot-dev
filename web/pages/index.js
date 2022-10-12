import Head from 'next/head'
import { createClient } from "next-sanity";

export default function Home({ siteSettings }) {
  return (
    <>
      <Head>
        <title>{siteSettings[0].title}</title>
      </Head>

      <header>
        <section class="banner">
        </section>
      </header>

      <main>
        <section class="about">
          <div class="wrapper">
            <h1>I&apos;m Derek McBurney</h1>
            <p>, currently Head of Technology at <a href="https://www.evanshunt.com/">Evans Hunt</a>.</p>
            <p>I&apos;ve been a web geek forever. I care about inclusive and positive developer culture, and I love meaningful technology.</p>
          </div>
        </section>
      </main>

      <footer>
      </footer>
    </>
  )
}

const client = createClient({
  projectId: "t71u3cfy",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false
});

export async function getStaticProps() {
  const siteSettings = await client.fetch(`*[_type == "siteSettings"]`);

  return {
    props: {
      siteSettings
    }
  };
}
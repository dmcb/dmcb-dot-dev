import Head from 'next/head'
const { fetchSiteSettings } = require("../utility/cms");
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from 'next/link'

export default function Home({ siteSettings }) {
  const router = useRouter();
  const [navExpanded, setNavExpanded] = React.useState(false);

  return (
    <>
      <Head>
        <title>{siteSettings.title}</title>
      </Head>

      <header className="index" onFocus={() => setNavExpanded(true)} onBlur={() => setNavExpanded(false)}>
        <nav className={navExpanded ? "open" : "closed"}>
          <div className="wrapper">
            <a href="#content" className="skip">Skip Navigation</a>
            <ul>
              <li className={router.pathname == "/" ? "active" : ""}>
                <Link href='/'>About Me</Link>
              </li>
              <li>
                <Link href='https://medium.com/@d.mcburney'>Writing</Link>
              </li>
              <li>
                <Link href='https://www.linkedin.com/in/derekmcburney/'>LinkedIn</Link>
              </li>
              <li>
                <Link href='https://github.com/dmcb'>GitHub</Link>
              </li>
            </ul>
            <button onClick={() => setNavExpanded(!navExpanded)} id="toggle-nav" aria-hidden="true" tabIndex="-1">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </button>
          </div>
        </nav>
        <section className="banner">
        </section>
      </header>

      <main id="content">
        <section className="about">
          <div className="wrapper">
            <div className="profile">
              {siteSettings.portrait &&
              <div className="portrait">
                <img src={siteSettings.portraitUrl} alt={siteSettings.portrait.alt} />
              </div>
              }
              <div className="inline">
                <h1>I&apos;m Derek McBurney</h1>
                <p>, Head of Technology at <a href="https://www.evanshunt.com/">Evans Hunt</a>.</p>
              </div>
            </div>
            <p>I&apos;ve been a web geek forever. I care about inclusive and positive developer culture, and I love meaningful technology experiences.</p>
          </div>
        </section>
      </main>

      <footer>
      </footer>
    </>
  )
}

export async function getStaticProps() {
  const siteSettings = await fetchSiteSettings();

  return {
    props: {
      siteSettings
    }
  };
}
import Head from 'next/head'
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from 'next/link'

const Layout = (props) => {
  const router = useRouter();
  const [navExpanded, setNavExpanded] = React.useState(false);

  return (
    <>
      <Head>
        <title>{props.siteSettings.title}</title>
      </Head>

      <header className={props.bannerType} onFocus={() => setNavExpanded(true)} onBlur={() => setNavExpanded(false)}>
        <nav className={navExpanded ? "open" : "closed"}>
          <div className="wrapper">
            <a href="#content" className="skip">Skip Navigation</a>
            <ul>
              <li className={router.pathname == "/" ? "active" : ""}>
                <Link href='/'>
                  <a onClick={() => setNavExpanded(false)}>About Me</a>
                </Link>
              </li>
              {/* <li className={router.pathname == "/on-tap" ? "active" : ""}>
                <Link href='/on-tap'>
                  <a onClick={() => setNavExpanded(false)}>What's On Tap</a>
                </Link>
              </li> */}
              <li className={router.pathname == "/projects" ? "active" : ""}>
                <Link href='/projects'>
                  <a onClick={() => setNavExpanded(false)}>Projects</a>
                </Link>
              </li>
              <li>
                <Link href='https://medium.com/@d.mcburney'>
                  <a onClick={() => setNavExpanded(false)}>Writing</a>
                </Link>
              </li>
              <li>
                <Link href='https://www.linkedin.com/in/derekmcburney/'>
                  <a onClick={() => setNavExpanded(false)}>LinkedIn</a>
                </Link>
              </li>
              <li>
                <Link href='https://github.com/dmcb'>
                  <a onClick={() => setNavExpanded(false)}>GitHub</a>
                </Link>
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
        <div className="banner">
        </div>
      </header>

      <main id="content">{props.children}</main>
    </>
  );
};

export default Layout;
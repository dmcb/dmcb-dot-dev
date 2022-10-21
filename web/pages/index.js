import Layout from '../components/layout'
const { fetchSiteSettings } = require("../utility/cms");

export default function Page({ siteSettings }) {
  return (
    <>
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
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout bannerType="index" siteSettings={page.props.siteSettings}>
      {page}
    </Layout>
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
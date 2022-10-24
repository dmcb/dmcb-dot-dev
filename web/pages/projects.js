import Layout from '../components/layout'
import Thing from '../components/thing'
const { fetchSiteSettings, fetchThings } = require("../utility/cms");
export default function Page({ things }) {
  return (
    <>
      <section className="projects">
        <div className="wrapper">
          <h1>Projects</h1>
          <p>I'll try to share a mix of personal and professional projects that I think are fun. Some projects will be entirely aspirational, possibly with early and rough progress, existing solely as motivation for me to keep experimenting. Some projects may actually be completed and out in the wild to serve as a useful reference or case study — your results may vary.</p>
          <p><em>*Coming soon*</em></p>
        </div>
      </section>
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout bannerType="detail" siteSettings={page.props.siteSettings}>
      {page}
    </Layout>
  )
}

export async function getStaticProps() {
  const siteSettings = await fetchSiteSettings()

  return {
    props: {
      siteSettings
    }
  };
}
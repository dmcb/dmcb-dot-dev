import Layout from '../components/layout'
const { fetchSiteSettings } = require("../utility/cms");

export default function Page({ siteSettings }) {
  return (
    <>
      <main id="content">
        <section class="on-tap">
          <div class="wrapper">
            <h1>What's On Tap</h1>
          </div>
        </section>
      </main>

      <footer>
      </footer>
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
  const siteSettings = await fetchSiteSettings();

  return {
    props: {
      siteSettings
    }
  };
}
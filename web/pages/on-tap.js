import Layout from '../components/layout'
import Thing from '../components/thing'
const { fetchSiteSettings, fetchThings } = require("../utility/cms");
export default function Page({ things }) {
  return (
    <>
      <section className="on-tap">
        <div className="wrapper">
          <h1>What&apos;s On Tap</h1>
          <p>The stuff I&apos;m into at the moment.</p>
          <ul className="things">
            {things.map((thing, i) => {
              return <Thing {...thing} key={i} />
            })}
          </ul>
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
  const things = await fetchThings()

  return {
    props: {
      siteSettings,
      things
    }
  };
}
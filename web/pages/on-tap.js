import Layout from '../components/layout'
import Thing from '../components/thing'
const { fetchSiteSettings } = require("../utility/cms");
export default function Page({ things }) {
  return (
    <>
      <section className="on-tap">
        <div className="wrapper">
          <h1>What's On Tap</h1>
          <p>The stuff I'm into at the moment.</p>
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
  const siteSettings = await fetchSiteSettings();
  const things = [
    { 
      type: 'Board Game',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0417/9964/7393/products/FFGMC32-Marvel-Champions-Mutant-Genesis_300x300.png?v=1664377472',
      imageAlt: 'Marvel Champions: Mutant Genesis'
    },
    { 
      type: 'Board Game',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0417/9964/7393/products/FFGMC32-Marvel-Champions-Mutant-Genesis_300x300.png?v=1664377472',
      imageAlt: 'Marvel Champions: Mutant Genesis'
    },
    { 
      type: 'Board Game',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0417/9964/7393/products/FFGMC32-Marvel-Champions-Mutant-Genesis_300x300.png?v=1664377472',
      imageAlt: 'Marvel Champions: Mutant Genesis'
    },

  ]

  return {
    props: {
      siteSettings,
      things
    }
  };
}
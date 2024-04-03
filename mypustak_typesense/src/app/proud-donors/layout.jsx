// "use client"

export async function generateMetadata({ params,  }) {

  const body = {
    url: 'https://www.mypustak.com/proud-donors'
  };
  const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const seo_data = await seo_res.json()

  let title_tag = ""
  let meta_description = ""
  if (seo_data.title_tag) {
    title_tag = seo_data.title_tag
    meta_description = seo_data.meta_desc

  }
  else {
    // title_tag = 'free books online |used books online India !'
    title_tag = 'Books Online India, Buy Online Book In India –mypustak.com'
    meta_description = ' Books are the hub of knowledge. Get the books online in India with us. We aimed to aid (help) the needy one with education and knowledge.'
  }
  console.log(title_tag, "||", meta_description)


  return {
    title: title_tag,
    description: meta_description,
    openGraph: {
      description: meta_description,
      type: "website",
      url: "https://www.mypustak.com/proud-donors",
      title: title_tag,
      image: "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
    }
  }
}

export default function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}
export async function generateMetadata({ params, searchParams }, parent) {
   const body = {

		url: 'https://www.mypustak.com/pre-loved-book'
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
  if(seo_data.title_tag){
    title_tag = seo_data.title_tag
    meta_description = seo_data.meta_desc
    
  }
  else{
    title_tag = 'free books online |used books online India !'
    meta_description = 'Only online free books used bookstore . Delivering in all pincodes in India. Providing fast delivery. 100% Quality assured. Engineering, medical, government jobs, novels, olympiad, school, children, university and many more books available.'
  }

  let schema_markup = null ;
  if(seo_data.schema_markup){
    schema_markup = seo_data.schema_markup
  }
  console.log(title_tag ,"||", meta_description)


  return {
    title: title_tag,
    description: meta_description,
    openGraph: {
      description: meta_description,
      type: "website",
      url: 'https://www.mypustak.com/free-books',
      title: title_tag,
      image: "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
    }
      // < script type="application/ld+json" >
      // { props.schema_markup }
      //     </script>

  }
}


export default function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}
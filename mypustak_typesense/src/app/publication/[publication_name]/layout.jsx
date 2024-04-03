export async function generateMetadata({ params, searchParams }, parent) {
  // let publicationname = params .split("-")
  //   .join(" ")
  //   .replace("books", "");
  console.log("publicationname..................", params);
  let og_url = "https://www.mypustak.com/publication/" + params
  console.log(og_url , "og_url")
  const body = {
		url: og_url
	};
  const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)

  })
  const seo_data = await seo_res.json()

  if(seo_data.redirect_url){
    
    console.log(seo_data.redirect_url , "seo_data.redirect_url")
    res.setHeader("Location",seo_data.redirect_url);
    res.statusCode = 301;
    res.end();
  }
  let title_tag = ""
  let meta_description = ""
  if(seo_data.title_tag){
    title_tag = seo_data.title_tag
    meta_description = seo_data.meta_desc
    
  }
  else{
    title_tag = 'publication' + params.publication_name+  '|used books online India !'
    meta_description = 'publication' + params.publication_name+ 'Only online free books used bookstore'
  }
  console.log(title_tag ,"||", meta_description)




  return {
    title: title_tag,
    description: meta_description,
    openGraph: {
      description: meta_description,
      type: "website",
      url: og_url,
      title: title_tag,
      image: "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
    }}
}


export default function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}
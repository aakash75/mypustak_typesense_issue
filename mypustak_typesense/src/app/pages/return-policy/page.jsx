"use client"
import React from 'react'
import dynamic from 'next/dynamic'
const ReturnPolicy = dynamic(() => import("../../../components/return_policy/ReturnPolicy"));
import Head from 'next/head'
const NextBreadcrumbs = dynamic(() => import("../../../components/Breadcrumbs/NextBreadcrumbs"), { ssr: false });
function Page(props) {
    return (
        <React.Fragment>
        {/* the SEO code has been moved to the layout.jsx file in the same folder */}
      {/* <Head>
            <title> {props.title_tag}</title>
            <meta
              name='Description'
              property='og:description'
              content={props.meta_description}
            />
            <meta name="title" content={props.title_tag}/>
            <meta name="description" content={props.meta_description}/>

            <meta property="og:type" content="website"/>
            <meta property="og:url" content={props.og_url}/>
            <meta property="og:title" content={props.title_tag}/>
            <meta property="og:description" content={props.meta_description}/>
            <meta property="og:image" content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png'/>

          </Head> */}
            <div>
                <NextBreadcrumbs />
                <ReturnPolicy />
            </div>
        </React.Fragment>

    )
}



// export async function getServerSideProps(context) {
  
//     const body = {
//           url: 'https://www.mypustak.com/pages/return-policy'
//       };
//     const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
  
//     })
//     const seo_data = await seo_res.json()
  
//     let title_tag = ""
//     let meta_description = ""
//     if(seo_data.title_tag){
//       title_tag = seo_data.title_tag
//       meta_description = seo_data.meta_desc
      
//     }
//     else{
//       title_tag = 'free books online |used books online India !'
//       meta_description = 'Only online free books used bookstore . Delivering in all pincodes in India. Providing fast delivery. 100% Quality assured. Engineering, medical, government jobs, novels, olympiad, school, children, university and many more books available.'
//     }
//     console.log(title_tag ,"||", meta_description)
  
  
  
//     return {
//       props: {
//         title_tag,meta_description,
//         og_url:'https://www.mypustak.com/free-books'
//       }
//     }
//   }

export default Page
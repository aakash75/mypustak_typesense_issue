// "use client"
import React from 'react'
import DonateBooks from '../../components/donate-books/DonateBooks'
import { donate_books } from '../../components/mapping_details/Mapping'
import Head from 'next/head'
import NextBreadcrumbs from '../../components/Breadcrumbs/NextBreadcrumbs'
import { NoSsr } from "@mui/material"


export async function generateMetadata({ params, searchParams }, parent) {
  const body = {
    url: 'https://www.mypustak.com/donate-books'
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
    title_tag = 'MyPustak.com - DONATE BOOKS ONLINE IN INDIA IN ONE CLICK!'
    meta_description = "Best place to donate books in India. Your donated books will be used by Indians to read. It can make a huge difference. Just fill up the form and donate used books today. Donate old books online! Free doorstep donate books pick up!"
  }
  console.log(title_tag, "||", meta_description)



  return {
    title: title_tag,
    description: meta_description,
    openGraph: {
      description: meta_description,
      type: "website",
      url: "https://www.mypustak.com/donate-books",
      title: title_tag,
      image: "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
    }
  }
}


async function Page(props) {
  return (
    <div>
      {/* <Head>
        <title> {this.props.title_tag}</title>
        <meta
          name='Description'
          property='og:description'
          content={this.props.meta_description}
        />
        <meta name="title" content={this.props.title_tag} />
        <meta name="description" content={this.props.meta_description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={this.props.og_url} />
        <meta property="og:title" content={this.props.title_tag} />
        <meta property="og:description" content={this.props.meta_description} />
        <meta property="og:image" content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png' />

      </Head> */}
      <NoSsr>
        <NextBreadcrumbs />
      </NoSsr>
      <DonateBooks donate_books={donate_books} />
    </div>
  )
}


export default Page
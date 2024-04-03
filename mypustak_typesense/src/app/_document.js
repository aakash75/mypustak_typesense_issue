// import Document, { Html, Head, Main, NextScript } from "next/document";
// import Script from "next/script";

// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     // ctx.res.setHeader("Cache-Control", "public, max-age=300");
//     const initialProps = await Document.getInitialProps(ctx);
//     return { ...initialProps };
//   }

//   render() {
//     return (
//       <Html lang='en'>
//         <Head>
//           <link rel='shortcut icon' href='/Mypustakfavicon.ico' />

//           <link
//             rel='preconnect'
//             href='https://d1f2zer3rm8sjv.cloudfront.net/'
//           />
//           <link
//             rel='dns-prefetch'
//             href='https://d1f2zer3rm8sjv.cloudfront.net/'
//           />

//           <link rel='preconnect' href='https://api.mypustak.com/' />
//           <link rel='dns-prefetch' href='https://api.mypustak.com/' />
//           {/* <link
//             href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css'
//             rel='stylesheet'
//             integrity='sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1'
//             crossOrigin='anonymous'
//           /> */}

//           <meta name='theme-color' content='#2258ae' />
//           {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}

//           {/* Google Tag Manager  */}
//           <Script
//             id='gtm-script'
//             strategy='afterInteractive'
//             dangerouslySetInnerHTML={{
//               __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//         new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//         j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//         'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);

        
//         })(window,document,'script','dataLayer','GTM-JPWF8');`,
//             }}></Script>
//           {/* End Google Tag Manager  */}

//           <Script
//             id='hotjar-script'
//             strategy='afterInteractive'
//             dangerouslySetInnerHTML={{
//               __html: `(function(h,o,t,j,a,r){ h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; 
//               h._hjSettings={hjid:1015294,hjsv:6}; a=o.getElementsByTagName('head')[0]; 
//               r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; a.appendChild(r); })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}}>
//           </Script>

//           <Script strategy='afterInteractive'
//             // dev
//             // src='https://libraries.unbxdapi.com/sdk-clients/ss-unbxd-dev-mypustak43191684486871/ua-staging/ua.js'
//             // prods
//             // src='https://libraries.unbxdapi.com/sdk-clients/ss-unbxd-prod-mypustak43191684486952/ua/ua.js'
//           ></Script>
//         </Head>
//         <body className='' style={{ backgroundColor: 'whitesmoke' }}>
//           {/* <Script
//             src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js'
//             integrity='sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW'
//             crossOrigin='anonymous'
//           /> */}
//           <noscript
//             dangerouslySetInnerHTML={{
//               __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-JPWF8"
//             height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
//             }}></noscript>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;

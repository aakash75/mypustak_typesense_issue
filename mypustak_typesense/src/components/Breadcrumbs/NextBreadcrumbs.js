"use client"

import React, { useEffect, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import { url } from '../../helper/api_url';
import { useParams, usePathname, useRouter } from 'next/navigation';

const static_url = [
  {
    url: '/customer/Myprofile',
    bread_url: [{ Myprofile: '/customer/Myprofile' }],
  },
  {
    url: '/customer/customer_order',
    bread_url: [
      { Myaccount: '/customer/Myprofile' },
      { Myorder: '/customer/customer_order' },
    ],
  },
  // Add other static URLs here
];

const hide_url = ['/checkout', '/view-cart', '/donate-books'];

const NextBreadcrumbs = () => {
  const router = useRouter()
   
    const pathname = usePathname()
    const params=useParams()
  const [crumbs, setCrumbs] = useState([]);
  const [viewFull, setViewFull] = useState(false);
  const [isStatic, setIsStatic] = useState(false);
  const [isProductPage, setIsProductPage] = useState(false);

  useEffect(()=>{
    // console.log(searchParams, "searchParams2533695");
    console.log(window.location.origin, "pathnames2533695");
    console.log(params, "params2533695");
  },[])
  useEffect(() => {
    const check_url = pathname;
    if (params === '/product/[slug]') {
      setIsProductPage(true);
      let query_data = check_url.split('?');
      let queryString = query_data[0];
      let bookid = query_data[1];
      if (bookid.includes('&')) {
        bookid = bookid.split('&')[0];
      } else {
        bookid = query_data[1];
      }
      fetch_api(bookid);
    } else {
      let new_crumbs = pathname;
      if (new_crumbs.includes('?')) {
        new_crumbs = new_crumbs.split('?')[0];
      }
      if (new_crumbs[new_crumbs.length - 1].includes('?')) {
        new_crumbs[new_crumbs.length - 1] = new_crumbs[new_crumbs.length - 1].split('?')[0];
      }
      new_crumbs = new_crumbs.split('/');
      setCrumbs(new_crumbs);
    }
    for (let x in static_url) {
      if (check_url == static_url[x]['url']) {
        setIsStatic(true);
      }
    }
  }, []);

  const fetch_api = async (bookid) => {
    let result = await fetch(`${url}/api/v1/get/product/v2/new/${bookid}/${0}`);
    let response = await result.json();

    if (response) {
      let is_out_of_stack = response.is_out_of_stack;
      let cat_arr = response['books_details']['category_arr'];
      cat_arr.unshift('category');
      setCrumbs(cat_arr);
    }
  };

  const ResizeBreadcrumbs_title = (title) => {
    if (title.length > 20) {
      return title.substr(0, 20) + '...';
    } else {
      return title;
    }
  };

  const openbreadcrumb = (len) => {
    let newurl = '';

    crumbs.slice(0, len + 1).map((c) => {
      newurl = '/' + newurl + c + '/';
    });
    // router.push(newurl);
    router.push(`${window.location.origin}/${newurl}`);
  };

  return (
    <div>
       {!hide_url.includes(pathname) && params !== '/' && (
        <div className="Breadcrumbs" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
          <Link href="/" legacyBehavior>
            <span className="breadcrumbs_text">Home </span>
          </Link>
          {!isStatic && !isProductPage
            ? crumbs &&
            crumbs.map((data, index) => (
              <span key={index}>
                <span
                  className="breadcrumbs_text"
                  onMouseEnter={() => setViewFull(true)}
                  onMouseOut={() => setViewFull(false)}
                  onClick={() => openbreadcrumb(index)}>
                  {!viewFull ? ResizeBreadcrumbs_title(data) : data}{' '}
                </span>

                {index < crumbs.length - 1 ? <span style={{ margin: '0 0.2rem' }}>{'>'}</span> : ''}
              </span>
            ))
            : null}
          {isProductPage
            ? crumbs &&
            crumbs.map((data, index) => (
              <span key={index}>
                {index < crumbs.length ? (
                  <NavigateNextIcon style={{ fontSize: '1rem', color: 'gray' }} />
                ) : (
                  ''
                )}
                <span
                  className="breadcrumbs_text"
                  onMouseEnter={() => setViewFull(index)}
                  onMouseOut={() => setViewFull('')}
                  onClick={() => openbreadcrumb(index)}>
                  {index != viewFull ? ResizeBreadcrumbs_title(data) : data}{' '}
                </span>
              </span>
            ))
            : null}
          {isStatic &&
            crumbs &&
            !isProductPage &&
            static_url.map((data, index) => (
              <span key={index}>
                {data.url == params ? (
                  data.bread_url.map((data_b, index) => (
                    <span key={index}>
                      <span style={{ margin: '0 0.2rem' }}>{'>'}</span>

                      <Link
                        href={`/${Object.values(data_b)}`}
                        // href={`${window.location.origin}/${Object.values(data_b)}`}
                        legacyBehavior
                        style={{
                          textDecoration: 'none',
                          color: 'black',
                        }}>
                        <span className="breadcrumbs_text">
                          {ResizeBreadcrumbs_title(Object.keys(data_b))}
                        </span>
                      </Link>
                    </span>
                  ))
                ) : null}
              </span>
            ))}
        </div>
      )} 

      <style jsx>
        {`
          .Breadcrumbs {
            margin-left: 3rem;
          }
          .breadcrumbs_text:hover {
            color: #2248ae;
            cursor: pointer;
          }
          @media screen and (max-width: 576px) {
            .Breadcrumbs {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default NextBreadcrumbs;

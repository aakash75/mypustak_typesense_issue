import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

const static_url = [
  {
    url: "/customer/Myprofile",
    bread_url: [{ Myprofile: "/customer/Myprofile" }],
  },
  {
    url: "/customer/customer_order",
    bread_url: [{ Myorder: "/customer/customer_order" }],
  },
  {
    url: "/customer/wishlist",
    bread_url: [{ Mywishlist: "/customer/wishlist" }],
  },
  {
    url: "/customer/manage_address",
    bread_url: [{ Myaddress: "/customer/manage_address" }],
  },
  {
    url: "/donor/donor_donation_request",
    bread_url: [{ Mydonation: "/donor/donor_donation_request" }],
  },
  {
    url: "/mypustak-wallet",
    bread_url: [{ MyWallet: "/mypustak-wallet" }],
  },
  {
    url: "/wallet/passbook",
    bread_url: [{ MyPassbook: "/wallet/passbook" }],
  },
  {
    url: "/pages/privacy-policy",
    bread_url: [{ privacy_policy: "/pages/privacy-policy" }],
  },
  {
    url: "/pages/terms-conditions",
    bread_url: [{ terms_conditions: "/pages/terms-conditions" }],
  },
  {
    url: "/pages/book-condition-guidelines",
    bread_url: [{ book_condition_guidelines: "/pages/book-condition-guidelines" }],
  },
  {
    url: "/pages/return-policy",
    bread_url: [{ return_policy: "/pages/return-policy" }],
  },
];

const hide_url = ["/checkout", "/view-cart", "/donate-books"];

const PageHeader = () => {
  const [crumbs, setCrumbs] = useState([]);
  const [viewFull, setViewFull] = useState(false);
  const [isStatic, setIsStatic] = useState(false);
  const router=useRouter()
  const params=useParams()
  const pathname=usePathname()
  const [isProductPage, setIsProductPage] = useState(false);

  useEffect(() => {
    const checkUrl = pathname;

    if (params === "/product/[slug]") {
      setIsProductPage(true);
      const queryData = checkUrl.split("?");
      const queryString = queryData[0];
      const bookid = queryData[1];

      fetchApi(bookid);
    } else {
      let newCrumbs = checkUrl;

      if (newCrumbs.includes("?")) {
        newCrumbs = newCrumbs.split("?")[0];
      }

      if (newCrumbs[newCrumbs.length - 1].includes("?")) {
        newCrumbs[newCrumbs.length - 1] = newCrumbs[newCrumbs.length - 1].split("?")[0];
      }

      newCrumbs = newCrumbs.split("/");
      setCrumbs(newCrumbs);
    }

    for (let x in static_url) {
      if (checkUrl === static_url[x]["url"]) {
        setIsStatic(true);
      }
    }
  }, []);

  const fetchApi = async (bookid) => {
    let result = await fetch(
      `https://api.mypustak.com/api/v1/get/product/v2/new/${bookid}/${0}`
    );
    let response = await result.json();

    if (response) {
      let catArr = response["books_details"]["category_arr"];
      catArr.unshift("category");
      setCrumbs(catArr);
    }
  };

  const resizeBreadcrumbsTitle = (title) => {
    if (title.length > 10) {
      return title.substr(0, 10) + "...";
    } else {
      return title;
    }
  };

  const openBreadcrumb = (len) => {
    let newurl = "";

    crumbs.slice(0, len + 1).map((c) => {
      newurl = "/" + newurl + c + "/";
    });
    router.push(`${window.location.origin}/${newurl}`);
  };

  return (
    <div>
      {!hide_url.includes(pathname) && (
        <div>
          {params !== "/" && (
            <div className="Breadcrumbs" style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
              {!isStatic && !isProductPage && crumbs.length ? (
                <span>
                  <span
                    style={{ textTransform: "capitalize" }}
                    className="breadcrumbs_text"
                    onMouseEnter={() => setViewFull(true)}
                    onMouseOut={() => setViewFull(false)}
                    onClick={() => openBreadcrumb(index)}>
                    {crumbs[crumbs.length - 1]}
                  </span>
                </span>
              ) : null}
              {isProductPage && crumbs.length ? (
                <span>
                  <span className="breadcrumbs_text" onMouseEnter={() => setViewFull(index)} onMouseOut={() => setViewFull("")} onClick={() => openBreadcrumb(index)}>
                    {crumbs[crumbs.length - 1]}{" "}
                  </span>
                </span>
              ) : null}
              {isStatic && crumbs && !isProductPage ? (
                static_url.map((data, index) => (
                  <span key={index}>
                    {data.url == params ? (
                      data.bread_url.map((data_b, index) => (
                        <span key={index}>
                          <span style={{ margin: "0 0.2rem" }}>
                            {/* <NavigateNextIcon fontSize="small"/> */}
                            {/* {">"} */}
                          </span>
                          <Link href={`${Object.values(data_b)}`} legacyBehavior>
                            <a style={{ textDecoration: "none", color: "#fff" }}>
                              <span className="breadcrumbs_text">
                                {resizeBreadcrumbsTitle(Object.keys(data_b))}
                              </span>
                            </a>
                          </Link>
                        </span>
                      ))
                    ) : null}
                  </span>
                ))
              ) : null}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .Breadcrumbs {
          //   margin-left: 3rem;
        }
        .breadcrumbs_text:hover {
          color: #2248ae;
          cursor: pointer;
        }
        // @media screen and (max-width: 576px) {
        //   .Breadcrumbs {
        //     display: none;
        //   }
        // }
      `}</style>
    </div>
  );
};

export async function getServerSideProps({ context }) {
  return {
    props: {
      url: context.query.url,
    },
  };
}

export default PageHeader;

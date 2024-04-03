import * as React from "react";
// import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import MediaQuery from "react-responsive";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import styles from "../../styles/CategoriesDrawer.module.css";
import ListCategories from "../homepage/ListCategories";
import { KeyboardArrowRightOutlined } from "@mui/icons-material";

import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

import CustomHits from "./CustomCategory";
import { InstantSearch } from "react-instantsearch";
import { CLUSTERHOST, INSTANTSEARCHAPIKEY, INSTANTSEARCHSCHEMA } from "../../helper/helpers";
import CustomHitsCategory from "./CustomHitsCategory";
import { useRouter } from "next/navigation";

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  // server: {
  //   nodes: [
  //     {
  //       host: "usay3xpekim1nrhdp-1.a1.typesense.net",
  //       port: "443",
  //       protocol: "https",
  //     },
  //   ],
  //   apiKey: "XwgcfcpwAj8nO9GnvR0XiaD6N48or9Bz",
  // },
  // server: {
  //   nodes: [
  //     {
  //       host: "kqz2649c7eu1fgn5p-1.a1.typesense.net",
  //       port: '443',
  //       protocol: 'https',
  //     },
  //   ],
  //   apiKey: "KbfAnvyUqKuPfSQMlA5NWxQIEBM7SyfR",
  // },

  // upgraded cluster
  server: {
    nodes: [
      {
        host: CLUSTERHOST,
        port: "443",
        protocol: "https",
      },
    ],
    apiKey: INSTANTSEARCHAPIKEY,
  },
  additionalSearchParameters: {
    q: "190",
    query_by: "parentCategory",
    page: "1",
    sort_by: "num_is_out_of_stack:asc,iDate:desc",
    filter_by: "&& book_type:[0, 2]",
    facet_by:
      "author,publication,category,language,keywords,book_type,binding,bookCondition,subject,class",
    max_facet_values: 30,
    num_typos: 2,
    typo_tokens_threshold: 10,
    per_page: 200,
  },
  connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default function CategoriesDrawer2() {
  const [state, setState] = React.useState({
    left: false,
  });
  const router = useRouter()
  const [hoverChild, sethoverChild] = React.useState("");
  const [parenCat, setparenCat] = React.useState("Engineering & Medical");
  const [hovered, sethovered] = React.useState(false);
  function debounce(func, timeout = 1500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function opendraw() {
    setState({ ...state, ["left"]: true });
  }
  const processchange = debounce(() => opendraw());
  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div className={styles.side_drawer_div}>
      <div
        // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
        role='presentation'
        className={styles.main_div_cat}
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}>
        <div className={styles.reader}>
          {/* <Avatar style={{ marginRight: "1rem" }}></Avatar> */}
          <b>Shop by Categories</b>
        </div>
        <div className={styles.Cat_div}>
          {/* <InstantSearch 
            indexName={INSTANTSEARCHSCHEMA} 
            searchClient={searchClient}> */}
            {/* <CustomHits parenCat={parenCat} setparenCat={setparenCat} /> */}
            <CustomHitsCategory parenCat={parenCat} setparenCat={setparenCat}/>
          {/* </InstantSearch> */}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {["left"].map(anchor => (
        <React.Fragment key={anchor}>
          <div
            // onClick={toggleDrawer(anchor, true)}
            onClick={() => {
              // sethovered(true)
              setState({ ...state, ["left"]: true });
              // setTimeout(() => {
              // }, 500);
            }}
            // onMouseLeave={
            //   () => {
            //     // sethovered(false)

            //     setState({ ...state, ['left']: false });

            //   }
            // }

            // onMouseLeave={() => {
            //   setState({ ...state, ['left']: false });
            // }}
            style={{ fontSize: "0.9rem", color: "#2258AE" }}
            role='button'
            className='text-nowrap'>
            <b style={{display:"flex",alignItems:"center",flexDirection:'column'}}>
              {/* <big>
              </big> */}
                <MenuRoundedIcon style={{ color: "black",padding:0 }} fontSize="large"/>{" "}
              {/* &nbsp; */}
              <span className={styles.allCategoryText} style={{}}>
                All Categories
              </span>
            </b>
          </div>
          <Drawer
            anchor='left'
            BackdropProps={{ invisible: true }}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            swipeAreaWidth={0}
            sx={{
              background: "transparent",
              // marginTop: "3.2rem",
              postion: "absolute",
              top: "7.5rem",
            }}
            PaperProps={{
              sx: {
                postion: "absolute",
                top: "7.5rem",
              },
            }}
            style={{
              zIndex: "3000",
            }}>
            <div className={styles.side_drawer_div}>
              <MediaQuery minWidth={769}>
                <div className={styles.side_drawer_subcat}>
                  {ListCategories.data.map((p_cat, index) => {
                    return parenCat == p_cat.name
                      ? p_cat.children.map(child => (
                          <div
                            className={styles.side_drawer_subcat_div}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                            onMouseEnter={() => {
                              sethoverChild(child.name);
                            }}
                            onMouseLeave={() => {
                              sethoverChild("");
                            }}
                            onClick={() => {
                              setState({ ...state, ["left"]: false });
                              router.push(`${child.url}`);
                            }}
                            key={index}>
                            <span
                              // href={`https://mypustak.com${child.url}`}

                              style={{
                                color:
                                  hoverChild == child.name ? "#2248Ae" : null,
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                              }}
                              className={styles.side_drawer_subcat_name}>
                              <KeyboardArrowRightOutlined
                                fontSize='small'
                                className='ml-auto'
                              />
                              {child.name}
                            </span>
                          </div>
                        ))
                      : null;
                  })}
                </div>
              </MediaQuery>
              <div className={styles.side_drawer_maincat}>{list(anchor)}</div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

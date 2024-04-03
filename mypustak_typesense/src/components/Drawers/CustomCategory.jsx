import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { List, ListItem, ListItemButton } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import React, { useState } from "react";
// import { connectHits } from 'react-instantsearch';
// import { connectHits } from 'instantsearch.js/es/connectors';
import MediaQuery from "react-responsive";
import ListCategories from "../homepage/ListCategories";
import styles from "../../styles/CategoriesDrawer.module.css";
import { useRouter } from "next/navigation";

// function CustomCategory({refine,setparenCat,setQuery,parenCat}) {
function CustomCategory({ setparenCat, setQuery, parenCat }) {
  const [HoverParent, setHoverParent] = useState("");
  const Router= useRouter()
  return (
    <List>
      {ListCategories.data.map((p_cat, index) => (
        <ListItem key={index} className="p-0 d-flex">
          <MediaQuery minWidth={769}>
            <ListItemButton
              onMouseEnter={() => {
                setparenCat(p_cat.name);
                setHoverParent(p_cat.name);
              }}
              // onMouseLeave={() => {
              //   setHoverParent('')
              // }}
              onClick={(event) => {
                event.preventDefault();
                Router.push(p_cat.as);
              }}
              className=" d-flex m-0 justify-content-between"
            >
              <a
                // href={`https://mypustak.com${p_cat.as}`}
                className="align-items-center m-0 my-0 d-flex"
                // onClick={alert("hey")}

                style={{
                  color: HoverParent == p_cat.name ? "#2248Ae" : "#000",
                  textDecoration: "none",
                  flexDirection: "column",
                }}
              >
                <div className="align-items-center m-0 my-0 d-flex">
                  <KeyboardArrowRightOutlined className="ml-auto" />
                  <span>{p_cat.name}</span>
                </div>
              </a>
            </ListItemButton>
          </MediaQuery>
          <MediaQuery maxWidth={768}>
            <ListItemButton
              onClick={() => {
                setparenCat(p_cat.name);
              }}
              // onClick={(event) => {
              //   event.preventDefault();
              //   Router.push(p_cat.as)
              // }}
            >
              <div
                // href={`https://mypustak.com${p_cat.as}`}
                className="d-flex"
                // onClick={alert("hey")}
                style={{ flexDirection: "column" }}
              >
                <div className="align-items-center d-flex">
                  {parenCat == p_cat.name ? (
                    <KeyboardArrowDownOutlinedIcon />
                  ) : (
                    <KeyboardArrowRightOutlined />
                  )}
                  <span>{p_cat.name}</span>
                </div>
                {parenCat == p_cat.name ? (
                  <div className="ml-3">
                    {ListCategories.data.map((p_cat, index) => {
                      return parenCat == p_cat.name
                        ? p_cat.children.map((child) => (
                            <div
                              className={`${styles.side_drawer_subcat_div} `}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                              key={index}
                            >
                              <a
                                // href={`https://mypustak.com${child.url}`}
                                onClick={() => {
                                  toggleDrawer(anchor, false);
                                  Router.push(`${child.url}`);
                                }}
                                style={{ display: "flex" }}
                                className={styles.side_drawer_subcat_name}
                              >
                                <KeyboardArrowRightOutlined
                                  fontSize="small"
                                  // className='ml-auto'
                                />
                                {child.name}
                              </a>
                            </div>
                          ))
                        : null;
                    })}
                  </div>
                ) : null}
              </div>
            </ListItemButton>
          </MediaQuery>
        </ListItem>
      ))}
    </List>
  );
}
// const CustomHits = connectHits(CustomCategory);
export default CustomCategory;

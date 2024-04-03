"use client";
import React, { PureComponent } from "react";
import {
  Card,
  IconButton,
  Snackbar,
  TextField,
  SnackbarContent,
  Alert,
} from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}
import MediaQuery from "react-responsive";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { connect } from "react-redux";
import {
  clear_books_in_popup,
  show_books_in_popup,
} from "../../redux/actions/cartAction";
class AddToCartSnack extends PureComponent {
  state = {
    openSnack: true,
    MyCart: {},
  };
  componentDidMount() {
    // setTimeout(() => {
    //     this.setState({ openSnack: false })
    // }, 10000);
    // this.props.show_books_in_popup({})
  }

  render() {
    const { book_add_to_cart_popup, open_add_to_cart_popup } = this.props;
    console.log(book_add_to_cart_popup, "963258999");
    return <>
      <MediaQuery minWidth={577}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open_add_to_cart_popup}
          autoHideDuration={3000}
          TransitionComponent={SlideTransition}
          onClose={() => {
            // alert("yes")
            this.props.clear_books_in_popup();
          }}
          sx={{ marginTop: "2.2rem" }}
        >
          {/* <SnackbarContent
                      style={{
                          backgroundColor: "green",
                          color: "#000",
                          alignItems: "center",
                      }}
                      message="">
                      <div style={{ color: "white" }}>
                          nhoij
                      </div>
                      {/* <Card elevation={2}>
                          <h1>hfvhfvhjnv</h1>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                              <span
                                  style={{
                                      fontSize: "0.76rem",
                                      backgroundColor: "green",
                                      color: "#fff",
                                      padding: "0.2rem 1rem",
                                      textAlign: "center",
                                      marginTop: "0.5rem",
                                      borderRadius: "5px",
                                      display: "flex",
                                      alignItems: "center",
                                  }}>
                                  <TaskAltIcon
                                      style={{ fontSize: "1rem", marginRight: "0.2rem" }}
                                      fontSize='small'
                                  />
                                  Book added to cart!
                              </span>
                          </div>
                          <div
                              style={{
                                  padding: "0.5rem 1rem",
                                  minWidth: "21rem",
                                  maxWidth: "21rem",
                              }}
                              className='row'>
                              <div
                                  style={{
                                      height: "6rem",
                                      width: "5.5rem",
                                      display: "flex",
                                      justifyContent: "center",
                                  }}>
                                  <img
                                      onError={e => {
                                          e.target.onerror = null;
                                          e.target.src =
                                              "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                      }}
                                      alt='book image'
                                      src={"/"}
                                      style={{
                                          height: "100%",
                                          width: "100%",
                                          boxShadow: "2px 2px 3px #000",
                                      }}
                                  />
                              </div>
                              <div
                                  style={{
                                      display: "flex",
                                      color: "#000",
                                      fontSize: "0.9rem",
                                      flexDirection: "column",
                                  }}
                                  className='col-7'>
                                  <span>
                                      {book_add_to_cart_popup?.bookName
                                          ? book_add_to_cart_popup?.bookName.length > 55
                                              ? book_add_to_cart_popup?.bookName
                                                  .replace(
                                                      /(\w)(\w*)/g,
                                                      (_, firstChar, rest) =>
                                                          firstChar.toUpperCase() + rest.toLowerCase()
                                                  )
                                                  .substring(0, 55)
                                                  .concat("...")
                                              : book_add_to_cart_popup?.bookName.replace(
                                                  /(\w)(\w*)/g,
                                                  (_, firstChar, rest) =>
                                                      firstChar.toUpperCase() + rest.toLowerCase()
                                              )
                                          : null}
                                  </span>
                                  <span>{book_add_to_cart_popup?.bookCondition}</span>
                                  <span style={{ fontSize: "0.9rem", color: "#555" }}>
                                      ₹<s>{book_add_to_cart_popup?.bookPrice}</s>
                                      <b className='text-success'> ₹{book_add_to_cart_popup?.bookShippingCost}</b>
                                  </span>
                              </div>
                          </div>
                      </Card> 
                  </SnackbarContent> */}
          <Alert
            sx={{
              width: "100%",
              "& .MuiAlert-icon": { display: "none", padding: "0px" },
            }}
            style={{
              backgroundColor: "#fff",
              color: "#000",
              alignItems: "center",
            }}
          >
            <Card elevation={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span
                  style={{
                    fontSize: "0.76rem",
                    backgroundColor: "green",
                    color: "#fff",
                    padding: "0.2rem 1rem",
                    textAlign: "center",
                    marginTop: "0.5rem",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    style={{ fontSize: "1rem", marginRight: "0.2rem" }}
                    fontSize="small"
                  />
                  Book added to cart!
                </span>
              </div>
              <div
                style={{
                  padding: "0.5rem 1rem",
                  minWidth: "21rem",
                  maxWidth: "21rem",
                }}
                className="row"
              >
                <div
                  style={{
                    height: "6rem",
                    width: "5.5rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                    }}
                    alt="book image"
                    src={`https://d1f2zer3rm8sjv.cloudfront.net/${book_add_to_cart_popup?.bookThumb}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      boxShadow: "2px 2px 3px #000",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#000",
                    fontSize: "0.9rem",
                    flexDirection: "column",
                  }}
                  className="col-7"
                >
                  <span>
                    {book_add_to_cart_popup?.bookName
                      ? book_add_to_cart_popup?.bookName.length > 55
                        ? book_add_to_cart_popup?.bookName
                            .replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )
                            .substring(0, 55)
                            .concat("...")
                        : book_add_to_cart_popup?.bookName.replace(
                            /(\w)(\w*)/g,
                            (_, firstChar, rest) =>
                              firstChar.toUpperCase() + rest.toLowerCase()
                          )
                      : null}
                  </span>
                  <span>{book_add_to_cart_popup?.bookCondition}</span>
                  <span style={{ fontSize: "0.9rem", color: "#555" }}>
                    ₹<s>{book_add_to_cart_popup?.bookPrice}</s>
                    <b className="text-success">
                      {" "}
                      ₹{book_add_to_cart_popup?.bookShippingCost}
                    </b>
                  </span>
                </div>
              </div>
            </Card>
          </Alert>
        </Snackbar>
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open_add_to_cart_popup}
          autoHideDuration={3000}
          TransitionComponent={SlideTransition}
          onClose={() => {
            // alert("yes")
            this.props.clear_books_in_popup();
          }}
          onTouchStart={() => {}}
          sx={{ marginBottom: "3.2rem" }}
        >
          {/* <SnackbarContent style={{}}>
                      <Card elevation={2}>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                              <span
                                  // className='text-success'
                                  style={{
                                      fontSize: "0.76rem",
                                      backgroundColor: "green",
                                      color: "#fff",
                                      minWidth: "100%",
                                      padding: "0.2rem 0.3rem",
                                      textAlign: "center",
                                      marginBottom: "0.5rem",
                                      // borderRadius: '5px',
                                      display: "flex",
                                      alignItems: "center",
                                  }}>
                                  <TaskAltIcon
                                      style={{ fontSize: "1rem", marginRight: "0.2rem" }}
                                      fontSize='small'
                                  />
                                  Book added to cart!
                              </span>
                          </div>
                          <div
                              style={{
                                  padding: "0.3rem 0.6rem",
                                  minWidth: "19.5rem",
                                  maxWidth: "19.5rem",
                              }}
                              className='row'>
                              <div
                                  style={{
                                      height: "4rem",
                                      width: "4.5rem",
                                      // padding: "2rem",
                                      display: "flex",
                                      justifyContent: "center",
                                  }}>
                                  <img
                                      onError={e => {
                                          e.target.onerror = null;
                                          e.target.src =
                                              "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                          // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                                      }}
                                      alt='book image'
                                      src={"/"}
                                      style={{
                                          height: "100%",
                                          width: "100%",
                                          boxShadow: "2px 2px 3px #000",
                                      }}
                                  />
                              </div>
                              <div
                                  style={{
                                      display: "flex",
                                      color: "#000",
                                      fontSize: "0.8rem",
                                      flexDirection: "column",
                                  }}
                                  className='col-7'>
                                  <span>
                                      {book_add_to_cart_popup?.bookName
                                          ? book_add_to_cart_popup?.bookName.length > 37
                                              ? book_add_to_cart_popup?.bookName
                                                  .replace(
                                                      /(\w)(\w*)/g,
                                                      (_, firstChar, rest) =>
                                                          firstChar.toUpperCase() + rest.toLowerCase()
                                                  )
                                                  .substring(0, 37)
                                                  .concat("...")
                                              : book_add_to_cart_popup?.bookName.replace(
                                                  /(\w)(\w*)/g,
                                                  (_, firstChar, rest) =>
                                                      firstChar.toUpperCase() + rest.toLowerCase()
                                              )
                                          : null}
                                  </span>
                                  <span>{book_add_to_cart_popup?.bookCondition}</span>
                                  <span style={{ fontSize: "0.8rem", color: "#555" }}>
                                      ₹<s>{book_add_to_cart_popup?.bookPrice}</s>
                                      <b className='text-success'> ₹{book_add_to_cart_popup?.bookShippingCost}</b>
                                  </span>
                              </div>
                          </div>
                      </Card>
                  </SnackbarContent> */}
          <Alert
            sx={{
              width: "100%",
              "& .MuiAlert-icon": { display: "none", padding: "0px" },
            }}
            style={{
              backgroundColor: "#fff",
              color: "#000",
              alignItems: "center",
            }}
          >
            <Card elevation={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span
                  style={{
                    fontSize: "0.76rem",
                    backgroundColor: "green",
                    color: "#fff",
                    padding: "0.2rem 1rem",
                    textAlign: "center",
                    marginTop: "0.5rem",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    style={{ fontSize: "1rem", marginRight: "0.2rem" }}
                    fontSize="small"
                  />
                  Book added to cart!
                </span>
              </div>
              <div
                style={{
                  padding: "0.5rem 1rem",
                  minWidth: "21rem",
                  maxWidth: "21rem",
                }}
                className="row"
              >
                <div
                  style={{
                    height: "6rem",
                    width: "5.5rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                    }}
                    alt="book image"
                    src={`https://d1f2zer3rm8sjv.cloudfront.net/${book_add_to_cart_popup?.bookThumb}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      boxShadow: "2px 2px 3px #000",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#000",
                    fontSize: "0.9rem",
                    flexDirection: "column",
                  }}
                  className="col-7"
                >
                  <span>
                    {book_add_to_cart_popup?.bookName
                      ? book_add_to_cart_popup?.bookName.length > 55
                        ? book_add_to_cart_popup?.bookName
                            .replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )
                            .substring(0, 55)
                            .concat("...")
                        : book_add_to_cart_popup?.bookName.replace(
                            /(\w)(\w*)/g,
                            (_, firstChar, rest) =>
                              firstChar.toUpperCase() + rest.toLowerCase()
                          )
                      : null}
                  </span>
                  <span>{book_add_to_cart_popup?.bookCondition}</span>
                  <span style={{ fontSize: "0.9rem", color: "#555" }}>
                    ₹<s>{book_add_to_cart_popup?.bookPrice}</s>
                    <b className="text-success">
                      {" "}
                      ₹{book_add_to_cart_popup?.bookShippingCost}
                    </b>
                  </span>
                </div>
              </div>
            </Card>
          </Alert>
        </Snackbar>
      </MediaQuery>
    </>;
  }
}

// export default AddToCartSnack
const mapStateToProps = (state) => {
  // console.log(state.cartReduc, "state red............................");
  return {
    book_add_to_cart_popup: state.cartReduc.book_add_to_cart_popup,
    open_add_to_cart_popup: state.cartReduc.open_add_to_cart_popup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear_books_in_popup,
    show_books_in_popup,
  };
};

export default connect(mapStateToProps, {
  clear_books_in_popup,
  show_books_in_popup,
})(AddToCartSnack);

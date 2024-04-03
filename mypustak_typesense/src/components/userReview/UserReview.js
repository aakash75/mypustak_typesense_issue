
import React from "react";
import styles from "../../styles/UserReview.module.css";
import Avatar from '@mui/material/Avatar';
// import 'lazysizes';
import MediaQuery from "react-responsive";
import Paper from '@mui/material/Paper';
import Carousel from "react-multi-carousel";
function UserReview(props) {
  const CustomLeftArrow = () => {
    return <button>Left</button>
  }
  const CustomRightArrow = () => {
    return <button>Right</button>
  }
  const sliderresponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      // slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 991, min: 577 },
      items: 2,
      // slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      // slidesToSlide: 3
    },
  };
  return (
    <div className={styles.main_div + "  mx-2 mx-sm-3 "} style={{ marginTop: "1rem", }}>
      <div className="text-primary b pl-5 ml-5  " style={{ marginBottom: "0.3rem", padding: "0.3rem", background: "white" }}>
        <h5 className="" style={{ color: '#2248ae', margin: "0.3rem 0.7rem" }}>User Review</h5>
      </div>
      <div className="container-fluid userReview bg-white">
        <div className="row ">
          <div className="col-lg-4 col-md-5 col-sm-5">
            <div className="videodiv">
              <iframe
                src="https://www.youtube.com/embed/k4H_ry-sOGE"
                frameBorder="0"
                className="lazyload"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="video"
                scrolling="no"
                height="200"
                width="100%"
                style={{ padding: "0.8rem 0rem", borderRadius: "5px" }}
              />
            </div>

          </div>
          <MediaQuery minWidth={577}>
            <div className="col-lg-8 col-md-7 col-sm-7 row mt-2">
              {props.userreviewData ? props.userreviewData.map(u => {
                return (
                  <div key={u.id} className="col-lg-6">
                    <div className="row g-0 align-items-center mt-1">
                      <div className="col-2 col-lg-2"><Avatar sx={{ bgcolor: '#2258ae' }}>{u.user_name[0]}</Avatar></div>
                      <div className="col-10 col-lg-10">
                        <div><b>{u.user_name}</b></div>
                        <div><span className="p">{u.review_description.length > 110 ?
                          u.review_description
                            .substring(0, 110)
                            .concat("...")
                          : u.review_description}</span></div>
                      </div>
                    </div>
                  </div>
                )
              }) : null}
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={576}>
            <div className="col-12 mb-2 " >
              <Carousel
                responsive={sliderresponsive}
                ssr
                infinite={true}
                autoPlay
                showDots={true}
                containerClass='carousel-container mt-2'
                customLeftArrow={<CustomLeftArrow />}
                // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                // beforeChange={() => this.setState({ isMoving: true })}
                // afterChange={() => this.setState({ isMoving: false })}
                // containerClass="first-carousel-container container"
                // deviceType={this.props.deviceType}
                customRightArrow={<CustomRightArrow />}>
                {props.userreviewData ? props.userreviewData.map(u => {
                  return (
                    <div key={u.id} className="col-lg-6 " style={{ minHeight: "8rem" }} >
                      <Paper elevation={0} >
                        <div className="row g-0 align-items-center mt-1 ">
                          <div className="col-2 col-lg-2"><Avatar style={{ marginLeft: "1rem" }} sx={{ bgcolor: '#2258ae', }}>{u.user_name[0]}</Avatar></div>
                          <div className="col-10 col-lg-10">
                            <div><b>{u.user_name}</b></div>
                            <div><span className="p">{u.review_description.length > 110 ?
                              u.review_description
                                .substring(0, 110)
                                .concat("...")
                              : u.review_description}</span></div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  )
                }) : null}
              </Carousel>
            </div>
          </MediaQuery>
        </div>
      </div>
    </div>
  );
}

export default UserReview;
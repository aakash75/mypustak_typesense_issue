import React, { Component } from "react";
import { getfaq } from "../../redux/actions/faqAction";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Head from "next/head";

// import Navbarhoc from "../../../components/higherOrderComponent/Navbarhoc";

class Faqt extends Component {
  state = {
    viewport: "",
    expandedDiv: "",
    category: "",
    clicked: "All",
    mobile_expandad_cat: "",
  };

  handleExpansionChange = divname => {
    if (this.state.expandedDiv === divname) {
      this.setState({ expandedDiv: "" });
    } else {
      this.setState({ expandedDiv: divname });
    }
  };
  ClickedAll() {
    this.setState({ category: "" });
  }
  ClickedDonatedbooks() {
    // alert("ok")
    this.setState({ category: "Donate books" });
  }
  Clickedgeneral() {
    // alert("ok")
    this.setState({ category: "General" });
  }
  Clickedpayments() {
    // alert("ok")
    this.setState({ category: "Payments" });
  }
  Clickedvolunteer() {
    // alert("ok")
    this.setState({ category: "Volunteer" });
  }
  Clickeddeliveryoption() {
    // alert("ok")
    this.setState({ category: "Delivery options" });
  }
  componentDidMount() {
    // console.log(getfaq())
    window.scrollTo(0, 0);
    this.props.getfaq();
  }
  render() {
    const { gfaq } = this.props;

    const sliderresponsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        // slidesToSlide: 1,
      },
      tablet: {
        breakpoint: { max: 991, min: 538 },
        items: 3,
        // slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 538, min: 0 },
        items: 2,
        partialVisibilityGutter: 40,
        // slidesToSlide: 2,
      },
    };

    var DummyContent = "";
    if (this.state.category === "") {
      try {
        DummyContent = gfaq.map((faqs, index) => (
          //  atomic={true}>
          //     <AccordionItem title={faqs.question}>{faqs.answer}</AccordionItem>
          //   </Accordion>

          <Accordion
            expanded={this.state.expandedDiv === index}
            key={faqs.question}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={e => this.handleExpansionChange(index)}>
              <Typography>{faqs.question}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ background: "whitesmoke" }}>
              <Typography dangerouslySetInnerHTML={{ __html: faqs.answer }} />
            </AccordionDetails>
          </Accordion>
        ));
      } catch (error) { }
    } else if (this.state.category === "Donate books") {
      try {
        DummyContent = gfaq.map((faqs, index) =>
          faqs.category !== "Donate books" ? null : (
            <Accordion
              expanded={this.state.expandedDiv === index}
              key={faqs.question}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={e => this.handleExpansionChange(index)}>
                <Typography>{faqs.question}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ background: "whitesmoke" }}>
                <Typography dangerouslySetInnerHTML={{ __html: faqs.answer }} />
              </AccordionDetails>
            </Accordion>
          )
        );
      } catch (error) { }
    } else if (this.state.category === "General") {
      try {
        DummyContent = gfaq.map((faqs, index) =>
          faqs.category !== "General" ? null : (
            <Accordion
              expanded={this.state.expandedDiv === index}
              key={faqs.question}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={e => this.handleExpansionChange(index)}>
                <Typography>{faqs.question}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ background: "whitesmoke" }}>
                <Typography dangerouslySetInnerHTML={{ __html: faqs.answer }} />
              </AccordionDetails>
            </Accordion>
          )
        );
      } catch (error) { }
    } else if (this.state.category === "Payments") {
      try {
        DummyContent = gfaq.map((faqs, index) =>
          faqs.category !== "Payments" ? null : (
            <Accordion
              expanded={this.state.expandedDiv === index}
              key={faqs.question}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={e => this.handleExpansionChange(index)}>
                <Typography>{faqs.question}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ background: "whitesmoke" }}>
                <Typography dangerouslySetInnerHTML={{ __html: faqs.answer }} />
              </AccordionDetails>
            </Accordion>
          )
        );
      } catch (error) { }
    } else if (this.state.category === "Volunteer") {
      try {
        DummyContent = gfaq.map((faqs, index) =>
          faqs.category !== "Volunteer" ? null : (
            <Accordion
              expanded={this.state.expandedDiv === index}
              key={faqs.question}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={e => this.handleExpansionChange(index)}>
                <Typography>{faqs.question}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ background: "whitesmoke" }}>
                <Typography dangerouslySetInnerHTML={{ __html: faqs.answer }} />
              </AccordionDetails>
            </Accordion>
          )
        );
      } catch (error) { }
    } else if (this.state.category === "Delivery options") {
      try {
        DummyContent = gfaq.map((faqs, index) =>
          faqs.category !== "Delivery options" ? null : (
            <Accordion
              expanded={this.state.expandedDiv === index}
              key={faqs.question}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={e => this.handleExpmansionChange(index)}>
                <Typography>{faqs.question}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ background: "whitesmoke" }}>
                <Typography dangerouslySetInnerHTML={{ __html: faqs.answer }} />
              </AccordionDetails>
            </Accordion>
          )
        );
      } catch (error) { }
    }

    return (
      <>
        <div>
          <Head>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1, shrink-to-fit=no'
            />
            <title>
              {" "}
              Books Online India, Buy Online Book In India –mypustak.com
            </title>
            <meta
              name='og:title'
              property='og:title'
              content='Books Online India, Buy Online Book In India –mypustak.com'
            />
            <meta
              name='og:description'
              property='og:description'
              content='  Books are the hub of knowledge. Get the books online in India with us. We aimed to aid (help) the needy one with education and knowledge.'
            />
            <meta
              name='og:image'
              property='og:image'
              content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png'
            />
          </Head>
        </div>

        <style jsx>
          {`
            .main_faq-div {
              padding: 0rem 15rem;
            }
               .breadcrumbs {
              background: white;
              
              margin: 1%;
              border-radius: 5px;
              // min-height: 20px;
            }
            .breadcrumbsUl {
              padding:0.3rem;
              list-style: none;
              display: flex;
            }
            .breadcrumbsUl li {
              padding: 0rem 0.2rem;
              text-transform: lowercase;
            }
       
            .faqbtn {
              margin: 1rem;
              min-width: 5rem;
              font-size: 0.7rem;
            }
            .faqtitle {
              font-size: 1.5rem;
              text-align: center;
              color: #0070e7;
              font-weight: bold;
            }
            .main_table {
              width: 100%;
              margin: 1rem 0rem;
              display: flex;
            }
            .mobile_expansion{
              display:none;
            }
    
            } @media screen and (max-width: 991px) {
              .desktop_view{
                display:none;
              }
              .mobile_expansion{
                display:block;
                margin:1rem 0rem;
              }
              .main_faq-div {
                width: 100%;
                padding: 0rem 1rem;
              }
              .main_table {
                font-size: 0.5rem;
              }
              .faqbtn {
                font-size: 0.5rem;
              }
            }
          `}
        </style>
      </>
    );
  }
}
const mapStateToProps = state => ({
  gfaq: state.faqR.gfaq,
});
export default connect(mapStateToProps, { getfaq })(Faqt);

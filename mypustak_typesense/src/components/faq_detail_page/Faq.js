"use client"
import styles from "../../styles/Faq.module.css"
import { Button, Skeleton } from '@mui/material'
import Image from "next/legacy/image"
import React, { Component } from 'react'
// import { Accordion } from 'react-bootstrap'
import MediaQuery from "react-responsive";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import headphone_helpline from '../../assets/headphone_helpline.svg'
import ques_ans_icon from '../../assets/ques_ans_icon.svg'
import { getfaq, getFaqCategoryData } from "../../redux/actions/faqAction";
import { connect } from "react-redux";
import artwork from '../../assets/artwork.svg'
import ReactPlayer from "react-player";

class Faq extends Component {
    state = {
        viewport: "",
        category: "",
        clicked: "all",
        emptySate: "",
        ServerErrorcat: false,
        ServerErrordata: false,
        CategoryLoader: true,
        FaqDataLoader: true,
        selectedCat: "all",
        faqShowData: [],
        showHideQuestions: false,
        toggleDatas: false,
        currentCategoty: {}
    };

    ClickedAll(cat) {
        let data = this.props.gfaq
        if (cat == "all") {
            // alert("all")
            if (this.state.currentCategoty == "all") {
                this.setState({ showHideQuestions: !this.state.showHideQuestions })
            } else {
                this.setState({ currentCategoty: cat })
                this.setState({ showHideQuestions: true, faqShowData: this.props.gfaq, toggleDatas: true })
            }
        } else {
            // alert("else")
            let filterData = data.filter((faq) => {
                return cat.faqcat_id == faq.faqcat_id
            })
            if (this.state.currentCategoty.faqcat_id == cat.faqcat_id) {
                this.setState({ showHideQuestions: !this.state.showHideQuestions })

            } else {
                this.setState({ currentCategoty: cat })
                this.setState({ showHideQuestions: true, faqShowData: filterData, toggleDatas: true })
            }
        }
    }
    async componentDidMount() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if (params.id) {
            this.setState({ selectedCat: params.id, })
        }
        window.scrollTo(0, 0);
        this.setState({ emptySate: " " })
        await this.props.getfaq()
            ?.then((res) => {
                this.setState({ ServerErrordata: false, FaqDataLoader: false, })
                // checking query param true or not
                if (Number(params.id)) {
                    let data = this.props.gfaq.filter((faq) => {
                        return faq.faqcat_id == params.id
                    })
                    this.setState({ faqShowData: data, clicked: Number(params.id), showHideQuestions: true })
                } else if (params.id == "all") {
                    this.setState({ faqShowData: this.props.gfaq, clicked: "all", showHideQuestions: true })
                }
                else {
                    this.setState({ faqShowData: this.props.gfaq })
                }
            }).catch((err) => {
                this.setState({ ServerErrordata: true, FaqDataLoader: false })
            })
        await this.props.getFaqCategoryData()
            .then((res) => {
                this.setState({ ServerErrorcat: false, CategoryLoader: false, })

            }).catch((err) => {
                this.setState({ ServerErrorcat: true, CategoryLoader: false })

            })
    }
    SelectCategoryhand = (cat) => {
        let data = this.props.gfaq
        if (cat == "all") {
            window.location.replace(`/faq/?id=all`);
            this.setState({ faqShowData: this.props.gfaq, selectedCat: "all" })
        } else {
            window.location.replace(`/faq?id=${cat.faqcat_id}`);
            let filterData = data.filter((faq) => {
                return cat.faqcat_id == faq.faqcat_id

            })
            this.setState({ faqShowData: filterData, selectedCat: cat.faqcat_id })
        }
    }
    render() {
        const { gfaq } = this.props;
        var DummyContent = "";
        DummyContent = this.state.FaqDataLoader ?
            <>
                <Skeleton animation="wave" fullWidth style={{ height: "5.5rem", marginBottom: "-1.8rem" }} />
                <Skeleton animation="wave" fullWidth style={{ height: "5.5rem", marginBottom: "-1.8rem" }} />
                <Skeleton animation="wave" fullWidth style={{ height: "5.5rem", marginBottom: "-1.8rem" }} />
                <Skeleton animation="wave" fullWidth style={{ height: "5.5rem", marginBottom: "-1.8rem" }} />
                <Skeleton animation="wave" fullWidth style={{ height: "5.5rem", marginBottom: "-1.8rem" }} />
                <Skeleton animation="wave" fullWidth style={{ height: "5.5rem", marginBottom: "-1.8rem" }} />
                <Skeleton animation="wave" fullWidth style={{ height: "5.5rem", marginBottom: "-1.8rem" }} />
                <Skeleton animation="wave" fullWidth style={{ height: "5.5rem", marginBottom: "-1.8rem" }} />
                <Skeleton animation="wave" fullWidth style={{ height: "5.5rem", marginBottom: "1rem" }} />

            </>
            : this.state.faqShowData.map((faqs, index) => (
                // <Accordion key={index} >
                //     <Accordion.Item eventKey={index}>
                //         <Accordion.Header>{faqs.question}</Accordion.Header>
                //         <Accordion.Body >
                //             <div dangerouslySetInnerHTML={{ __html: faqs.answer ? faqs.answer : "-" }}></div>
                //             {faqs.video_tutorial ? <div> <ReactPlayer height={"30vh"} width={"100%"} className="VideoPlayer" controls url={faqs.video_tutorial} /></div> : null}

                //         </Accordion.Body>
                //     </Accordion.Item>
                // </Accordion>
                <Accordion
                    key={index}
                    expanded={this.state.open_condition}
                    className=''>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        onClick={this.handleExpansionChange}>
                        <div

                            style={{}}>
                            {faqs.question}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails
                        className='px-3 mb-3 '
                        style={{ background: "whitesmoke", padding: "0px" }}>
                        <div className='bg-white'>
                            <div dangerouslySetInnerHTML={{ __html: faqs.answer ? faqs.answer : "-" }}></div>
                            {faqs.video_tutorial ? <div className={`${styles.WebReactVideo}`}> <ReactPlayer height={"100%"} width={"100%"} controls url={faqs.video_tutorial} /></div> : null}
                        </div>
                    </AccordionDetails>
                </Accordion>

            ));
        return (
            <div className='container-fluid mt-3'>
                {/* for different heading in case of tablet */}
                <div className='bg-color d-none row mx-5 d-sm-flex d-lg-none text-white  align-items-center'>
                    <div className='col-4 px-0 d-flex justify-content-center align-items-center'>
                        <Image src={headphone_helpline} alt='' />
                        <span className='text-nowrap'>MyPustak Help Center </span></div>
                    <div className='col-6 px-0'>
                        <h5 className='mt-3 mb-2 text-center'>FAQ</h5>
                    </div>
                </div>
                <div className={` ${styles.desktop_view} row mx-5`}>
                    <div className='side_tabs col-4  shadow-sm'>
                        <div className='bg-color text-white d-none  d-lg-flex justify-content-center align-items-center'>
                            <Image src={headphone_helpline} alt='' />
                            <span>MyPustak Help Center </span>
                        </div>
                        <div className="mt-4">
                            {this.state.CategoryLoader ?
                                <div className="nav flex-column nav-pills  pr-0" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem", marginTop: "-1.6rem" }} />
                                    <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                    <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                    <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                    <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                    <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                    <Skeleton animation="wave" fullWidth style={{ height: "7rem", }} />
                                </div>
                                : <div className="nav flex-column nav-pills  pr-0" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <Button fullWidth className={` ${this.state.selectedCat == "all" ? "nav-link active" : null} rounded-0 py-3`} style={{ border: "1px solid #00000033", textTransform: "capitalize", background: this.state.selectedCat == "all" ? "#336bc2" : "white" }} onClick={() => { this.SelectCategoryhand("all") }} type="button">All</Button>
                                    {this.props.facCategory ?
                                        this.props.facCategory.map((category) => {
                                            return (<>
                                                <Button fullWidth className={`${this.state.selectedCat == category.faqcat_id ? "nav-link active" : null} rounded-0 py-3`} style={{ border: "1px solid #00000033", textTransform: "capitalize", background: this.state.selectedCat == category.faqcat_id ? "#336bc2" : "white" }} onClick={() => { this.SelectCategoryhand(category) }} >{category.category}</Button>
                                            </>)
                                        })
                                        : null
                                    }
                                </div>}
                        </div>

                        <div className='text-center'>
                            <Image src={ques_ans_icon} alt='' />
                        </div>
                    </div>
                    <div className='details_side col-8 bg-white pb-5'>
                        <div className='bg-color d-none d-lg-block py-2 text-center text-white'>
                            <h5 className='mt-3 mb-2'>Frequently Asked Questions</h5>
                        </div>
                        <div className='mt-4'>
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-All" role="tabpanel" aria-labelledby="v-pills-All-tab">
                                    {this.state.FaqDataLoader ?
                                        <>
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem", marginTop: '-1.7rem' }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                            <Skeleton animation="wave" fullWidth style={{ height: "7rem", marginBottom: "-2.6rem" }} />
                                        </>
                                        : this.state.faqShowData.map((faqs, index) => (
                                            // <Accordion key={index} >
                                            //     <Accordion.Item eventKey={index}>
                                            //         <Accordion.Header>{faqs.question}</Accordion.Header>
                                            //         <Accordion.Body >
                                            //             <div dangerouslySetInnerHTML={{ __html: faqs.answer ? faqs.answer : "-" }}></div>
                                            //             {faqs.video_tutorial ? <div className={`${styles.WebReactVideo}`}> <ReactPlayer height={"100%"} width={"100%"} controls url={faqs.video_tutorial} /></div> : null}

                                            //         </Accordion.Body>
                                            //     </Accordion.Item>
                                            // </Accordion>

                                            <Accordion
                                                key={index}
                                                expanded={this.state.open_condition}
                                                className=''>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    onClick={this.handleExpansionChange}>
                                                    <div

                                                        style={{ textAlign: "center" }}>
                                                        {faqs.question}
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails
                                                    className='px-3 mb-3 '
                                                    style={{ background: "whitesmoke", padding: "0px" }}>
                                                    <div className='bg-white'>
                                                        <div dangerouslySetInnerHTML={{ __html: faqs.answer ? faqs.answer : "-" }}></div>
                                                        {faqs.video_tutorial ? <div className={`${styles.WebReactVideo}`}> <ReactPlayer height={"100%"} width={"100%"} controls url={faqs.video_tutorial} /></div> : null}
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>


                                        ))
                                    }
                                </div>
                                <div className="tab-pane fade" id="v-pills-Donation" role="tabpanel" aria-labelledby="v-pills-Donation-tab">
                                </div>
                                <div className="tab-pane fade" id="v-pills-General" role="tabpanel" aria-labelledby="v-pills-General-tab">
                                </div>
                                <div className="tab-pane fade" id="v-pills-Payments" role="tabpanel" aria-labelledby="v-pills-Payments-tab">
                                </div>
                                <div className="tab-pane fade" id="v-pills-Volunteer" role="tabpanel" aria-labelledby="v-pills-Volunteer-tab">
                                </div>
                                <div className="tab-pane fade" id="v-pills-Delivery" role="tabpanel" aria-labelledby="v-pills-Delivery-tab">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.mobile_expansion} bg-white`}>
                    <div className=' btndiv '>
                        <Button
                            onClick={() => {
                                this.ClickedAll("all");
                                this.setState({ clicked: "all" });
                            }}
                            variant={
                                this.state.clicked === "all" ? "contained" : "outlined"
                            }
                            color='primary'
                            fullWidth
                            className='faqbtn'
                            style={{
                                margin: "0.5rem 0rem",
                                fontSize: "0.8rem",
                                minWidth: "9rem",
                            }}>
                            All
                        </Button>
                        {this.state.showHideQuestions ? this.state.clicked === "all" ? DummyContent : null : null}
                    </div>
                    {this.state.CategoryLoader ?
                        <>
                            <Skeleton animation="wave" fullWidth style={{ height: "3rem", marginBottom: "-1rem" }} />
                            <Skeleton animation="wave" fullWidth style={{ height: "3rem", marginBottom: "-1rem" }} />
                            <Skeleton animation="wave" fullWidth style={{ height: "3rem", marginBottom: "-1rem" }} />
                            <Skeleton animation="wave" fullWidth style={{ height: "3rem", marginBottom: "-1rem" }} />
                            <Skeleton animation="wave" fullWidth style={{ height: "3rem", marginBottom: "-1rem" }} />
                            <Skeleton animation="wave" fullWidth style={{ height: "3rem", marginBottom: "-1rem" }} />
                        </>
                        : this.props?.facCategory.map((category) => {
                            return (
                                <>
                                    <div className=' btndiv'>
                                        <Button
                                            onClick={() => {
                                                this.ClickedAll(category);
                                                this.setState({ clicked: category.faqcat_id });
                                            }}
                                            variant={
                                                this.state.clicked === category.faqcat_id
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                            color='primary'
                                            fullWidth
                                            className='faqbtn'
                                            style={{
                                                margin: "0.5rem 0rem",
                                                fontSize: "0.8rem",
                                                minWidth: "9rem",
                                            }}>
                                            {category.category}
                                        </Button>
                                        {this.state.showHideQuestions ? this.state.clicked === category.faqcat_id
                                            ? DummyContent
                                            : null : null}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>

                <div className='text-center'>
                    <MediaQuery minWidth={876}>
                        <Image src={artwork} alt='artwork' height={550} width={650} />

                    </MediaQuery>
                    <MediaQuery minWidth={576}>
                        <Image src={artwork} alt='artwork' height={450} width={550} />

                    </MediaQuery>
                    <MediaQuery maxWidth={576}>
                        <Image src={artwork} alt='artwork' height={350} width={350} />

                    </MediaQuery>
                </div>


                <style jsx>
                    {`
 
    `}
                </style>
            </div >
        )
    }
}
const mapStateToProps = state => ({
    gfaq: state.faqR.gfaq,
    facCategory: state.faqR.facCategory
});
export default connect(mapStateToProps, { getfaq, getFaqCategoryData })(Faq);


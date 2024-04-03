import { NoSsr } from "@mui/material"
import Link from "next/link"
function NcertUpDiv() {
    return (
        <NoSsr>
            <div>

                <div id='landingBanner'>
                    <div id='leftpartBanner'>
                        <div id='bannertext'>
                            <p id='ncerttitle'> NCERT Books</p>
                            <p id='ncerttext'>
                                Ncert books are widely used in all school and students across
                                the country . We at Mypustak give our consistent effort in
                                making NCERT Books available to all our users . Keeping this
                                in mind along with our Free Ncert Books collection we have
                                brought complete range of Brand New Ncert Books to keep our
                                readers need fullfiled . We insure to keep the price of books
                                as low as possible with best services to help all our fellow
                                Readers round the country .
                            </p>
                        </div>
                    </div>

                    <div id='rightpartBanner'>
                        <Link href='/search?value=ncert%20upsc%20set' legacyBehavior>
                            <a>
                                {" "}
                                <img
                                    src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/banner1.jpeg`}
                                    style={{ width: "100%", height: "100%" }} alt=""></img>
                            </a>
                        </Link>
                    </div>
                </div>
                {/* Ending of Banner */}

                <div id='classncert'>
                    <div id='headingncert'>Class Wise NCERT Books</div>
                    <div className='row'>
                        <div className='col-4 col-lg-1  col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-1'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    {" "}
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>1</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div className='col-4 col-lg-1 col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-2'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    {" "}
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>2</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div className='col-4 col-lg-1 col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-3'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    {" "}
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>3</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div className='col-4 col-lg-1 col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-4'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    {" "}
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>4</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div className='col-4 col-lg-1  col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-5'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    {" "}
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>5</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div className='col-4 col-lg-1  col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-6'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    {" "}
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>6</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div className='col-4 col-lg-1 col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-7'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    {" "}
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>7</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>

                        <div className='col-4 col-lg-1 col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-8'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    {" "}
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>8</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>

                        <div className='col-4 col-lg-1 col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-9'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    {" "}
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>9</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>

                        <div className='col-4 col-lg-1 col-sm-3 col-xs-4'>
                            <Link
                                as='/category/school-children-books/ncert/class-10'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>10</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>

                        <div className='col-4 col-lg-1 col-sm-3 col-xs-6'>
                            <Link
                                as='/category/school-children-books/ncert/class-11'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>11</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>

                        <div className='col-4 col-lg-1 col-sm-3 col-xs-6'>
                            <Link
                                as='/category/school-children-books/ncert/class-12'
                                href='/category/[parent_category]/[sub_category]/[child_category]'
                                legacyBehavior>
                                <a className="ClassesA">
                                    <div className='card' id='card_ncert'>
                                        <h5 className='card-className'>
                                            Class <p>12</p>
                                        </h5>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div id='imagebanner'>
                    <div id='bannertitle'>Ncert Set Wise Books</div>
                    <div
                        className='row '
                        id='rowbanner'
                        style={{ marginLeft: "0%", marginRight: "0%" }}>
                        <div
                            id='rightbanner'
                            className=' col-lg-3 col-md-3 col-sm-12 '
                            style={{ marginTop: "0%" }}>
                            {/* <img src = {require(`./UPSC.jpg`)} style={{width:"100%", boxShadow:"0px 2px 5px #888"}}></img> */}
                        </div>

                        <div
                            id='rightbanner'
                            className=' col-lg-3 col-md-3 col-sm-12'
                            style={{ marginTop: "0%" }}>
                            <Link href='/search?value=ncert%20upsc%20set' legacyBehavior>
                                <a>
                                    {" "}
                                    <img
                                        src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/upsc2.jpg`}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            boxShadow: "0px 2px 5px #888",
                                        }}></img>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <style jsx>
                    {`
            #ncertlanding{
                overflow-x: hidden;
                background: #ebecec;
            }
            #firstCirLoader{
                margin-left: 50%;
            }
            
            #landingBanner{
                width:100%;
                height: 15%;
                /* background: #000; */
                margin-top:3.5%;
                /* margin-left: 2.5%; */
                border-radius: 5px;
                /* box-shadow: 0px 4px 4px gray; */
                /* box-shadow: 5px 0px 2px 1px #888; */
                display: flex;
            }
            
            #leftpartBanner{
               width: 68%;
                
                background-color: #f8f9d2;
                background-image: linear-gradient(315deg, #f8f9d2 0%, #e8dbfc 74%);
                font-family: 'Lato', sans-serif;
            
                /* background: #000; */
                /* box-sizing: border-box; */
             
            
             
            }
            #bannertext{
                margin: 1%;
                margin-left: 5%;
            
                
            }
            #ncerttitle{
                font-weight: bold;
                font-size: 12px;
            }
            #ncerttext{
                text-align: justify;
                width:90%;
                font-size: 12px;
            }
            
            #rightpartBanner{
            
                width: 40%;
                height: 100%;
                /* background: #ff0; */
                /* box-sizing: border-box; */
             
                /* border-bottom: 118px solid transparent;
                background: url(./banner1.jpeg);
                background-repeat: no-repeat; */
                /* background-position: -100px -150px;
                 */
            
            }
            #rightpartBanner img{
                box-sizing: border-box;
            }
            
            
            #classncert{
                /* border: 2px solid red; */
               /* padding: 2%; */
             /* margin-left: 5%; */
               /* padding-top: 1%; */
               padding-left: 3%;
               padding-right: 3%;
               padding-bottom: 2%;
               /* border-bottom: 1px solid rgb(219, 219, 219); */
               background: white;
               /* box-shadow: 0px 2px 4px #888; */
               margin: 1%
            }
            #headingncert{
                /* border-top: 1px solid  rgb(219, 219, 219); */
                font-size: 25px;
                text-align: center;
                margin-top: 1%;
                margin-bottom: 1%;
                color: #002e45;
                font-weight: bold;
            }
            
            #imagebanner{
                /* margin: 1%; */
                /* margin-bottom: -7%; */
                margin-top: 1%;
                margin-left: 1%;
                margin-right: 1%;
                padding-left: 3%;
               padding-right: 3%;
               padding-bottom: 3%;
               background: white;
               /* box-shadow: 0px 2px 4px #888; */
               
               
            }
            #bannertitle{
                font-size: 25px;
                text-align: center;
                margin-top: 1%;
                margin-bottom: 1%;
                color: #002e45;
                font-weight: bold;
            
            }
            
            #rightbanner{
                margin-left:6%;
            }
            #rowbanner > img{ 
                transition: all ease 1s;
            }
             #rowbanner  :hover > img{
                /* opacity: .5; */
               box-shadow: 0px 2px 7px #888;
               transform: scale(1.1);
                
                cursor: pointer;
                /* transition: 2s; */
            }
            
            .ClassesA{
                text-decoration: none;
            }
            #card_ncert{
                margin: 1rem 0rem;
                font-family: Arial, Helvetica, sans-serif;
                /* background-color: #f0ecfc; */
                width:80px;
                height: 70px;
                padding-top: 7%;
                text-decoration: none;
                background-color: #f8f9d2;
                background-image: linear-gradient(315deg, #f8f9d2 0%, #e8dbfc 74%);
                box-shadow: 0px 2px 5px #888;
                font-weight: bold;
                outline: none;
                border:0px;
            /* color: white; */
            }
            
            #card_ncert:hover{
                background: #002e45;
                text-decoration: none;
                color: white;
                text-decoration: none;
            
                font-weight: bold;
            }
            .card-className{
                text-align: center;
                font-size: 16px;
                font-weight: bold;
            }
            .card-className p{
                font-size: 25px;
            }
            .row{
                border:1 px solid purple;
                margin-top: 2%;
            }
            
            #lowerbookcontent{
                /* border:2px solid brown; */
                /* padding-left: 3%; */
                /* padding-right: 2%; */
                /* padding-top: 2%; */
                margin-top: 1%;
                padding:0rem;
                overflow-x: hidden;
            }
            
            #filterbox{
                /* border:2px solid purple; */
                height: 100%;
                padding-right: 1%;
               
            }
            #bookdata{
                
            }
            #cardheader{
                /* background: rgb(219, 219, 219); */
                border-bottom: 1px solid rgb(209, 209, 209);
                text-align: center;
                width: 100%;
                padding: 2px;
            }
            
            #filterform label{
                font-size: 5px;
            }
            #ncertbooktitled{
                font-size: 25px;
                /* text-align: center; */
                padding-left: 5%;
                margin-top: 1%;
                margin-bottom: 1%;
                color: #002e45;
                font-weight: bold;
            }
            #ncertbookimg{
                /* border:2px solid green; */
                background: white;
                /* box-shadow: 0px 2px 5px #888; */
            }
            
            
            #pagination{
                background: white;
                align-items: center;
                color: #002e45;
                padding: 0.5%;
                font-weight: bold;
                border:1px solid #002e45;
                border-radius: 5px;
                transition: 5ms;
                outline: none;
                margin-bottom: 2%;
                text-align:center;
            
            }
            #pagination:hover{
                transition: all ease 0.5s;
            
                
                background: #002e45;
                color: white;
            }
            #up{
                left:90%;
                float: right;
                font-size: 40px;
                color: #e26127;
                cursor: pointer;    
                position: fixed;
                top:85%;
            }
               
            
            @media only screen and (max-width: 991px)  and (min-width:768px){
            
                #landingBanner{
                    margin-top: -4%;
                    flex-direction: column-reverse;
                    box-shadow: 0px 4px 3px rgb(209, 209, 209);
                }
                #leftpartBanner{
                    width: 100%;
                }
            
                #ncertbookimg{
                    padding: 0px;
                }
                #ncerttitle{
                    font-size: 15px;
                }
                #ncerttext{
                    width: 90%;
                    font-size: 15px;
                }
            
              
                #rightpartBanner{
                    width: 100%;
                    height: 100%;
                }
            }
            @media screen and (max-width:767px) and (min-width:539px)
            {
                #landingBanner{
                    margin-top: -8%;
                    flex-direction: column-reverse;
                    box-shadow: 0px 4px 3px rgb(209, 209, 209);
                }
            
                #leftpartBanner{
                    width: 100%;
                }
            
                #ncertbookimg{
                    padding: 0px;
                }
                #ncerttitle{
                    font-size: 15px;
                }
                #ncerttext{
                    width: 90%;
                    font-size: 15px;
                }
            
              
                #rightpartBanner{
                    width: 100%;
                    height: 100%;
                }
            
                #classncert{
                    margin-top: 1%;
                   
                  padding-top: 2%;
                  padding-left: 7%;
                }
                #headingncert{
                    border: 0px;
                    margin-top: 5%;
                    margin-bottom: -3%;
                    font-size: 22px;
                }
            
                #ncertbooktitled{
                    font-size: 20px;
                    margin-bottom: 2%;
                }
                #fliterbtn{
                    border:0px;
                    z-index: 10;
                    left:40%;
                    top:92%;
                    outline: none;  
                    background-color: #e8dbfc; 
                    position: fixed
                  
                }
                #bookdata{
                    padding: 0px;
                    margin: 2%;
                }
            
              #card_ncert {
                    margin-top: 1rem;
                    
                }
                
               
            
                #rightbanner img{
                    margin-top: 5%;
                    /* padding-top: 20%; */
                    /* border:2px solid black; */
                }
            
                #imagebanner{
                    margin: 1%;
                    /* padding-left: 3%; */
                    padding-right: 9%;
                    padding-bottom: 3%;
                    background: white;
            
                }
            
                #ncertbookimg{
                    padding-left: 3%;
                   
                    /* border: 2px solid orange; */
                }
                #cardheader{
                    background: rgb(71, 71, 71);
                    color:white;
                    text-align: center;
                    min-width: 300px;
                    max-width: 500px;
                }
            
                #cardheader title{
                    color: white;
                }
              #headingncert .card{
                  margin-bottom: 5%;
                  padding-bottom: 5%;
              }
              #buttonfilter{
                /* border:2px solid black; */
                width: 100%;
               
                top:50%;
                
            
            }
            #filterApply{
              background: #e26127;
              color:white;
              outline: none;
              margin-right: 2%;
              
            
            }
            #up{
                left:46%;
                float: right;
                font-size: 25px;
                color: #e26127;
                cursor: pointer;    
                position: fixed;
                top:85%;
            }
               
               
            }
            @media only screen and (max-width: 538px){
                #landingBanner{
                    margin-top: 20%;
                    display: flex;
                    flex-direction: column-reverse;
                    box-shadow: 0px 4px 3px rgb(209, 209, 209);
                }
            
            #lowerbookcontent{
                padding:0rem;
            }
                #leftpartBanner{
                    width: 100%;
                }
            
            
                #rightpartBanner{
            
                    width: 100%;
                    height: 100%;
                    /* background: #ff0; */
                    box-sizing: border-box;
                 
                    /* border-bottom: 90px solid transparent; */
                    /* background: url(./banner2.jpeg);
                    background-repeat: no-repeat; */
                    /* background-position: -100px -150px; */
                    
                
                }
                 #card_ncert{
                     margin-top: 1rem;
                 }
                
                #classncert{
                    padding-left: 6%;
                    /* margin-top: -3%;
                    margin-left: 2%; */
                    /* padding: 5%; */
                    /* border: 2px solid purple; */
                }
                #imagebanner{
                    /* border:2px solid blue; */
                }
                #ncertbookimg{
                    padding: 0px;
                    margin-right: 3%;
                    /* border: 2px solid orange; */
                }
                #ncerttitle{
                    font-size: 15px;
                }
                #ncerttext{
                    width: 90%;
                    font-size: 15px;
                } 
            
                #headingncert{
                    border: 0px;
                    margin-top: 5%;
                    padding-top: 3%;
                    margin-bottom: -3%;
                    font-size: 22px;
                }
            
                #ncertbooktitled{
                    font-size: 20px;
                    margin-bottom: 5%;
                }
            
                #up{
                    left:46%;
                    float: right;
                    font-size: 25px;
                    color: #e26127;
                    cursor: pointer;    
                    position: fixed;
                    top:80%;
                }
                #fliterbtn{
                    padding: 2px;
                    border:0px;
                    z-index: 10;
                    left:40%;
                    top:88%;
                    outline: none;  
                    background-color: #e8dbfc; 
                    position: fixed
                  
                }
                #bookdata{
                    padding: 0px;
                    margin: 2%;
                }
            
              #card_ncert {
                    margin-top: 20%;
                    
                }
            #rightbanner{
                margin-left: 0%;
            }
                #rightbanner img{
                    margin-top: 5%;
                    /* padding-top: 20%; */
                }
                #cardheader{
                    background: rgb(71, 71, 71);
                    color:white;
                    text-align: center;
                    min-width: 300px;
                    max-width: 500px;
                }
            
                #cardheader title{
                    color: white;
                }
              #headingncert .card{
                  margin-bottom: 5%;
                  padding-bottom: 5%;
              }
               
              #buttonfilter{
                  /* border:2px solid black; */
                  width: 100%;
                  margin-top:2%;
                  padding: 5%;
                  box-shadow: 0px 2px 5px #888;
                 
                  top:50%;
                  
              
              }
              #filterApply{
                background: #e26127;
                color:white;
                outline: none;
                margin-right: 2%;
                
              }
            
            
              #fixedb{
                  position: fixed;
                  top:0px;
              }
            
              #abc{
                  height:300px;
                  position: fixed;
              }
              
            }
            
            `}
                </style>
            </div>
        </NoSsr>
    );
}
export default NcertUpDiv
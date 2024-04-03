"use client"
import CustomLoader from "../components/CustomLoader/CustomLoader";
import CustomLoaderWithoutText from "../components/CustomLoader/CustomLoaderWithoutText";
import { Backdrop } from "@mui/material";
export default function Loading() {
    // Or a custom loading skeleton component
    return <div>

        <div className='parentDiv'>
            <div>
                <div
                    className='center'
                >
                    <div style={{ minHeight: "80vh " }}>
                
                            <div>
                                <Backdrop
                                    sx={{
                                        backgroundColor: "#fff",
                                        zIndex: "1000",
                                        opacity: 0.5,
                                    }}
                                    style={{ opacity: "0.98" }}
                                    open={true}
                                >
                                    <CustomLoaderWithoutText size='60px' />
                                </Backdrop>
                            </div>
                     
                    </div>
                </div>
            </div>
        </div>
        <style jsx>
            {`
              @media screen and (min-width: 1470px) {
                .parentDiv {

                  display: flex;
                  justify-content: center;
                }
                .center {
                  max-width: 1500px;
                  min-width: 1500px;
                  // border:1px solid red;
                }
              }
            `}
        </style>
    </div>
}
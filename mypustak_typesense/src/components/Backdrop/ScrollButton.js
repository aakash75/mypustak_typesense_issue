import React, { useEffect, useState } from 'react';
import HelpIcon from "@mui/icons-material/Help";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from "@mui/material/Button";
import { NoSsr } from '@mui/base';
const ScrollButton = () => {
    const [screenWidth, setSreenWidth] = useState(0)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setSreenWidth(window.screen.width)
    }, [])
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 400) {
            setVisible(true)
        }
        else if (scrolled <= 400) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
                in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <>{screenWidth < 576 ? null :
            <div style={{
                position: "fixed",
                minWidth: "7.5rem",
                top: 60,
                width: "100%",
                textAlign: "center",
                bottom: "40px",
                height: "20px",
                // background: "white",
                zIndex: 1060,
                cursor: "pointer",
            }}
                className={visible ? `show BacktoTop ` : "toggle-button BacktoTop"}
            >
                <Button
                    variant='text'
                    color='primary'
                    style={{ fontSize: "0.7rem", padding: "0.3rem", margin: "0", background: "white", width: "7.5rem", textTransform: "capitalize", fontWeight: "bold", border: "0.2px solid lightgray" }}
                    onClick={scrollToTop}
                    className='shadow  bg-white rounded'
                    startIcon={<KeyboardArrowUpIcon />}
                >
                    Back To Top
                </Button>
            </div>
        }
            <style jsx>
                {`
                .toggle-button {
                    display: none;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                  }
                  
                  .show {
                    display: inline;
                    opacity: 1;
                  }
                  @media (max-width: 600px) {
                    BacktoTop {
                      border:1px solid red;
                      display:none
                    }
                  }
                `}

            </style>
        </>

    );
}

export default ScrollButton;

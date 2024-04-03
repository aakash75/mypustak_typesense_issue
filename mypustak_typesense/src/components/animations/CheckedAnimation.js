import React from 'react'

function CheckedAnimation() {
    return (
        <div>
            <div
                className="icon-animated icon-animated-tick"
                aria-hidden="true"
                style={{ height: "1rem", width: "1rem", marginBottom: "3px" }}
            >
                <svg
                    className="circle"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                >
                    <circle cx="50" cy="50" r="50" />
                </svg>

                <div className="tick" >
                    <svg
                        className="tick-leg1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 25 52"
                    >
                        <polygon className="" points="1,41 0,48 25,52 25,45" />
                    </svg>
                    <svg
                        className="tick-leg2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 25 52"
                    >
                        <polygon className="" points="18,45 25,47 25,0 18,0" />
                    </svg>
                </div>
            </div>
            <style jsx>
                {`
            .icon-animated {
                width: 80px;
                height: 80px;
                position: relative;
                display: inline-block;
                vertical-align: middle;
                text-align: center;
            }
            
            .icon-animated .tick svg {
                position: absolute;
                left: 0px;
                top: 2px;
                fill: #fff;
                width: 18px;
                height: 14px;
            }
            
            .icon-animated-tick .circle {
                fill: green;
                animation-fill-mode: forwards;
                animation-name: circle-pulse;
                animation-duration: 4s;
                animation-iteration-count: 1;
            }
            
            .tick-leg1 {
                fill: #fff;
                animation-fill-mode: forwards;
                animation-name: tick-swipe1;
                animation-duration: 1s;
                animation-iteration-count: 1;
                transform: scaleX(0);
                transform-origin: left bottom;
                opacity: 0;
            }
            
            .tick-leg2 {
                fill: #fff;
                animation-fill-mode: forwards;
                animation-name: tick-swipe2;
                animation-duration: 2s;
                animation-iteration-count: 1;
                transform: scaleY(0);
                transform-origin: right bottom;
                opacity: 0;
            }
            
            
            @keyframes tick-swipe1 {
                0% {
                    opacity: 0;
                }
                10% {
                    opacity: 0.5;
                }
                20% {
                    opacity: 1;
                }
            
            
                100% {
                    opacity: 1;
                    transform: scaleX(1);
                }
            }
            
            @keyframes tick-swipe2 {
                40% {
                    opacity: 0;
                }
                47% {
                    transform: scaleY(0.15);
                    opacity: 1;
                }
                100% {
                    transform: scaleY(1);
                    opacity: 1;
                }
            }
            
            @keyframes circle-pulse {
                0%, 25%, 75%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            .tick {
                width: 100%;
                height: 100%;
                transform: rotate(45deg) scale(0.8);
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
            }
            
            .tick-holder {
                transform: scale(0.6);
            }
          `}
            </style>
        </div>
    )
}

export default CheckedAnimation

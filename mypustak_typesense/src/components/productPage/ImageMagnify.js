import React from 'react'
import ReactImageMagnify from 'react-image-magnify';
function ImageMagnify() {
    return (
        <div style={{ height: "10rem", width: "8rem" }}>
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: "https://mypustak-6.s3.amazonaws.com/books/medium/34_9788131930779_t1.jpg"
                },
                largeImage: {
                    src: "https://mypustak-6.s3.amazonaws.com/books/medium/34_9788131939123_t1.jpg",
                    width: 1200,
                    height: 1800
                }
            }} />
        </div>
    )
}

export default ImageMagnify

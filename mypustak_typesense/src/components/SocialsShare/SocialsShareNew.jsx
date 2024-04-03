
"use client"
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LinkedinIcon,
    TwitterIcon,
    EmailShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappIcon,
    EmailIcon,
    WhatsappShareButton,
} from "react-share";
const SocialsShareNew = () => {
    const params= useParams()
    const [currentUrl, setPath] = useState('');
    const [slugName, setslugName] = useState('');
    useEffect(() => {
        setPath(window.location.href);
        // setslugName(params?.slug[0])
    }, []);
    // const path = `${window?.location?.href}`
    // const pathname= use
    
    return (
        <div style={{ display: "flex", justifyContent: "space-around", gap: "5px" }}>
            <FacebookShareButton url={currentUrl}
                quote="share this link"
                hashtag="#Book  "
            >
                <FacebookIcon size={36} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={currentUrl}
                quote="share this link"
                hashtag="#Book  ">
                <TwitterIcon size={36} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton url={currentUrl}
                quote="share this link"
                summary={currentUrl}
                source="https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png"
                hashtag="#Book  ">
                <LinkedinIcon size={36} round={true} />
            </LinkedinShareButton>
            <WhatsappShareButton
                url={currentUrl}
                quote="share this link"
                // title={`${slugName} : `}
                separator=":"
                hashtag="#Book  ">
                <WhatsappIcon size={36} round={true} />
            </WhatsappShareButton>
        </div>
    )
}
export default SocialsShareNew
/* eslint-disable */
import React, { Component } from 'react';
import styles from "../../styles/PrivecyPolicy.module.css"
import Head from 'next/head';
import NextBreadcrumbs from '../Breadcrumbs/NextBreadcrumbs';
class PrivacyPolicy extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>
                {/* <Layout> */}
                <React.Fragment>
                    <div>
                        <Head>
                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1, shrink-to-fit=no"
                            />
                            <title>
                                {" "}
                                Books Online India, Buy Online Book In India –mypustak.com
                            </title>
                            <meta
                                name="og:title"
                                property="og:title"
                                content="Books Online India, Buy Online Book In India –mypustak.com"
                            />
                            <meta
                                name="og:description"
                                property="og:description"
                                content="  Books are the hub of knowledge. Get the books online in India with us. We aimed to aid (help) the needy one with education and knowledge."
                            />
                            <meta
                                name="og:image"
                                property="og:image"
                                content="https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png"
                            />
                        </Head>
                        <NextBreadcrumbs />
                        <div className={`${styles.privacyouterdiv}`}>
                            <p className={`${styles.privacyPolicy}`}>Privacy Policy</p>
                            <hr className={`${styles.privacyhr}`} />
                            <div className={`${styles.privacydiv}`}>
                                <p>
                                    Suppose you browse through this website without providing us with any personal information. In that case, we may gather and store some information about your visit, such as IP address, type of browser and operating system used, date and time you accessed our site, pages you visited, and if you linked to our website from another website, the address of that website. This information will not identify you personally and will not be tied back to you. However, there will be times when you submit an auto lead request or fill out our contact form when we need to obtain personally identifiable information from you or about you. Such personally identifiable information may include your name, address, e-mail address, telephone number, and identification number.
                                </p>
                                <p className={`${styles.termspara}`}>Use and Sharing of Information</p>
                                <p>
                                    We will never sell your personally-identifiable data without your permission unless outlined in this Privacy Policy. The information we receive about you or from you may be used by us or shared by us with our corporate affiliates, dealers, agents, vendors, and other third parties to help process your request to comply with any law, regulation, audit, or court order, to help improve our website or the products or services we offer, for research, to understand our customer’s needs better, to develop new offerings, and to alert you to new products and services (of our business associates or us) in which you may be interested. We may also combine the information you provide with information about you that is available to us internally or from other sources to serve you better. We do not share, sell, trade, or rent your personal information to third parties for unknown reasons.
                                </p>
                                <p className={`${styles.termspara}`}>Cookies</p>
                                <p>
                                    Sometimes, we may place “cookies” on your computers. “Cookies” are small identifiers sent from a web server and stored on your computer’s hard drive that help us to recognize you if you revisit our website. Also, our site uses cookies to track how you found our site. To protect your privacy, we do not use cookies to store or transmit personal information about you on the Internet. You can accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, certain site features may not function correctly or at all as a result.
                                </p>
                                <p className={`${styles.termspara}`}>Links</p>
                                <p>
                                    Our website may contains links to other sites. Such other sites may use information about your visit to this website. Our Privacy Policy does not apply to practices of such sites that we do not own or control or to people we do not employ. Therefore, we are not responsible for the privacy practices or the accuracy or the integrity of the content included on such other sites. We encourage you to read the individual privacy statements of such websites.
                                </p>
                                <p className={`${styles.termspara}`}>Security</p>
                                <p>
                                    We safeguard your privacy using known security standards and procedures and comply with applicable privacy laws. Our websites combine industry-approved physical, electronic, and procedural safeguards to ensure that your information is well protected though it’s a life cycle in our infrastructure. Sensitive data is hashed or encrypted when it is stored in our infrastructure. Sensitive data is decrypted, processed, and immediately re-encrypted or discarded when no longer necessary. We host web services in audited data centers, with restricted access to the data processing servers. Controlled access, recorded and live-monitored video feeds, 24/7 staffed security, and biometrics provided in such data centers ensure that we provide secure hosting.

                                </p>
                                <p className={`${styles.termspara}`}>Opt-Out Policy</p>
                                <p>
                                    Please write to us at <a href='mailto:support@mypustak.com' title='support@mypustak.com' style={{ textDecoration: 'none' }}>support@mypustak.com</a> if you no longer wish to receive any information regarding changes to this Privacy Policy. Our privacy policy was last updated on Jan 01, 2023. We may change our Privacy Policy from time to time. If we do, we will update this Privacy Policy on our website. If you have any questions about our Privacy Policy, please write us <a href='mailto:support@mypustak.com' title='support@mypustak.com' style={{ textDecoration: 'none' }}>support@mypustak.com</a>. We will be more than happy to answer your queries
                                </p>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                <style jsx>{`

        
        `}</style>
            </React.Fragment>
        )
    }
}

export default PrivacyPolicy;

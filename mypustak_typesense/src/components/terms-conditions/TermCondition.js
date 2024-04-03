import React, { Component } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from "../../styles/TermCondition.module.css"
const NextBreadcrumbs = dynamic(() => import("../Breadcrumbs/NextBreadcrumbs"), {
    ssr: false,
});
class TermsCondtion extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
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
                    <div className={`${styles.termsandconditionsouterdiv}`}>
                        <p className={`${styles.termsCondition}`} >Terms & Conditions</p>
                        <hr className={`${styles.termshr}`} />
                        <div className={`${styles.termsdiv}`}>
                            <p>
                                {" "}
                                These Terms of Use govern your access to and use of the Site. Your access to and use of the Site are expressly conditioned on your compliance with these Terms of Use. By accessing or using the Site, you agree to be bound by these Terms of Use, our Privacy Policy, and any other terms, guidelines, or rules that apply to any portion of the Site that you may access, without limitation or qualification. If you do not agree to these Terms of Use, you must exit the Site immediately and discontinue any use of information, products, or services from the Site.
                            </p>
                            <p className={`${styles.termspara}`}>Use and Sharing of Information</p>
                            <p>
                                We will never sell your personally-identifiable data without your permission unless outlined in this Privacy Policy. The information we receive about you or from you may be used by us or shared by us with our corporate affiliates, dealers, agents, vendors, and other third parties to help process your request to comply with any law, regulation, audit, or court order, to help improve our website or the products or services we offer, for research, to understand our customer’s needs better, to develop new offerings, and to alert you to new products and services (of our business associates or us) in which you may be interested. We may also combine the information you provide with information about you that is available to us internally or from other sources to serve you better. We do not share, sell, trade, or rent your
                            </p>
                            <p className={`${styles.termspara}`}>Cookies</p>
                            <p>
                                Sometimes, we may place “cookies” on our personal computers. “Cookies” are small identifiers sent from a web server and stored on your computer’s hard drive that help us to recognize you if you revisit our website. Also, our site uses cookies to track how you found our site. To protect your privacy, we do not use cookies to store or transmit personal information about you on the Internet. You can accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, certain site features may not function correctly or at all as a result.
                            </p>
                            <p className={`${styles.termspara}`}>Links</p>
                            <p>
                                Our website may contain links to other sites. Such other sites may use information about your visit to this website. Our Privacy Policy does not apply to practices of such sites that we do not own or control or to people we do not employ. Therefore, we are not responsible for the privacy practices or the accuracy or integrity of the content included on such other sites. We encourage you to read the individual privacy statements of such websites.
                            </p>
                            <p className={`${styles.termspara}`}>Security</p>
                            <p>
                                We safeguard your privacy using known security standards and procedures and comply with applicable privacy laws. Our websites combine industry-approved physical, electronic, and procedural safeguards to ensure that your information is well protected though it’s a life cycle in our infrastructure. Sensitive data is hashed or encrypted when it is stored in our infrastructure. Sensitive data is decrypted, processed, and immediately re-encrypted or discarded when no longer necessary. We host web services in audited data centers, with restricted access to the data processing servers. Controlled access, recorded and live-monitored video feeds, 24/7 staffed security, and biometrics provided in such data centers ensure that we provide secure hosting.
                            </p>
                            <p className={`${styles.termspara}`}>Opt-Out Policy</p>
                            <p>
                                Please write to us at <a href='mailto:info@mypustak.com' title='info@mypustak.com' style={{ textDecoration: 'none' }}>info@mypustak.com</a> if you no longer wish to receive any information regarding changes to this Privacy Policy. Our privacy policy was last updated on Jan 20, 2023. However, we may change our Privacy Policy from time to time. If we do, we will update this Privacy Policy on our website. If you have questions about our Privacy Policy, please get in touch with us at <a href='mailto:info@mypustak.com' title='info@mypustak.com' style={{ textDecoration: 'none' }}>info@mypustak.com</a>. We will be more than happy to answer your queries.

                            </p>
                            <p className={`${styles.termspara}`}>Ownership</p>
                            <p>
                                All of the content on the Site (which includes, without
                                limitation, all graphics, text, images, photographs,
                                illustrations, and the design, selection and arrangement
                                thereof) and/or other intellectual property or proprietary
                                rights owned by, or licensed to,Mypustak.
                            </p>
                            <p className={`${styles.termspara}`}>User Submissions</p>
                            <p>
                                All communications, comments, feedback, bug reports,
                                suggestions, ideas, content, and other submissions submitted
                                to Mypustak through the Site (collectively, “Submissions”)
                                shall be and remain Mypustak’ property with all worldwide
                                rights, titles and interests in all copyrights and other
                                intellectual property in such Submissions hereby being
                                assigned to Mypustak by you. All Submissions, as well as all
                                communications made by you through the Site, including,
                                without limitation, blog and chat messages shall not (i) be
                                illegal, defamatory, trade libelous, threatening invasive of
                                privacy or harassing; (ii) be obscene or contain any
                                pornography; (iii) contain any software viruses, Trojan
                                horses, worms, time bombs, cancelbots or other computer
                                programming routines that are intended to damage,
                                detrimentally interfere with, surreptitiously intercept or
                                expropriate any system, data or personal information; (iv)
                                infringe upon any third party’s copyright, patent, trademark,
                                trade secret or other intellectual property or proprietary
                                rights or rights of publicity or privacy; (v) consist of or
                                contain political campaigning, commercial solicitation, chain
                                letters, mass mailings or any form of “spam”; or (vi)
                                otherwise create or result in any liability for Mypustak. You
                                may not use a false email address, impersonate any person or
                                entity, or otherwise mislead as to the origin of any
                                Submissions. Mypustak reserves the right (but has no
                                obligation) to remove or edit any such Submissions. Mypustak
                                has no responsibility and assumes no liability for any
                                Submissions posted on the Site by you or any third party.
                            </p>
                            <p className={`${styles.termspara}`}>Electronic Communications</p>
                            <p>
                                When you visit the Site, send e-mails, fill out forms, or contact us over WhatsApp, you communicate with us electronically. By doing so, you now consent to receive communications from us electronically. We may communicate with you by e-mail, the abovementioned communication medium, or by posting notices on this Site. You agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communications be in writing.
                            </p>
                            <p className={`${styles.termspara}`}>Registration</p>
                            <p>
                                If you open an Account or register to use this Site, you must select a password consisting of an email address you provide. If you register, you agree to give us accurate and complete registration information and to inform us immediately of any updates or other changes to such information. You are responsible for safeguarding any password you use to access site pages. You agree to take sole responsibility for any activities or actions under your password, whether or not you have authorized such activities or actions. You shall be responsible for any fees incurred under your Account or using your password, whether or not incurred by you or a third party, with or without your authorization, provided that the preceding shall be subject to any remedies or rights you may have under applicable law through your bank or other financial institution. You agree to reimburse us for all costs and expenses, including, without limitation, attorneys, fees, and collection fees, incurred by us in our efforts to collect any outstanding balance from you. You agree to notify Mypustak of any unauthorized use of your password immediately. We reserve the right to refuse registration of or cancel your Account at our discretion.
                            </p>
                            <p className={`${styles.termspara}`}>Order Information</p>
                            <p>
                                By purchasing from the Site, you understand and agree that the Site may share information about you and your transaction with other companies to process your transaction, including, without limitation, for purposes of fraud prevention, vendor direct shipping, and credit card authorization.

                            </p>
                            <p className={`${styles.termspara}`}>Trademarks</p>
                            <p>
                                The trademarks, names, logos, and service marks (collectively “trademarks”) displayed on this Site are registered and unregistered trademarks of Mypustak and its third-party licensors or partners. Nothing on this Site should be construed as granting you any license or right to use any trademark without the prior written permission of Mypustak.
                            </p>
                            <p className={`${styles.termspara}`}>External links</p>
                            <p>
                                The Site contains links to other websites on the Internet. We provide these links for your convenience only. We explicitly disclaim any responsibility for the accuracy, content, or availability of information found on websites that link to or from the Site. We cannot ensure that you will be satisfied with, and we with this disclaim any liability and responsibility concerning, any products or services that you purchase from a third-party website that links to or from the Site or third-party content on our Site. We do not endorse such products or services, nor have we taken any steps to confirm the accuracy or reliability of any information contained in third-party websites or content. We do not make any representations or warranties as to the security of any information (including, without limitation, credit card and other personal information) you might be requested to give any third party, and you now irrevocably waive any claim against us for such websites and third-party content. We strongly encourage you to make whatever investigation you feel necessary or appropriate before proceeding with any online or offline transaction with any third parties. In addition, we disclaim all warranties express or implied, as to the accuracy, legality, reliability, or validity of any content on any such website or that such website will be free from viruses or other harmful elements.
                            </p>
                            <p className={`${styles.termspara}`}>
                                Notice and Procedure for Making Claims of Copyright
                                Infringement
                            </p>
                            <p>
                                If you believe your work has been copied in a way that constitutes copyright infringement, please provide us with the written information specified below. Please note that this procedure is exclusively for notifying Mypustak that your copyrighted material has been infringed. In addition, an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest; A description of the copyrighted work that you claim has been infringed upon; A description of where the material that you claim is infringing is located on the Site, including the ISBN if applicable; Your address, telephone number, and e-mail address; A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf.

                            </p>
                            <p className={`${styles.termspara}`}>Product Descriptions</p>
                            <p>
                                MyPustak attempts to be as accurate as possible about the descriptions of books and other products that it provides on the Site. However, MyPustak does not warrant that such descriptions or other site content are accurate, complete, reliable, current, or error-free. For example, a product offered by Mypustak differs from what is described on the Site. In that case, your sole remedy is to return it in the same condition as received, either for replacement with the same or a comparable product, following our Return Refund and Replacement policy available on our website.
                            </p>
                            <p className={`${styles.termspara}`}>Disclaimer</p>
                            <p>
                                This site and its contents are provided without any representations or warranties, either express or implied. Mypustak disclaims all representations and warranties to the fullest extent permitted by applicable laws. In addition, MyPustak does not represent or warrant that the information, products, and services on or accessible through the site are accurate, complete, or current or that this site will be free of defects, including, without limitation, viruses or other harmful elements. The user of this site assumes all risk of losses or damages arising out of the use of the site.
                            </p>
                            <p className={`${styles.termspara}`}>Limitation of Imitation</p>
                            <p>
                                Mypustak shall not be responsible for and disclaims all liability for any loss, liability, damage (whether direct, indirect, special, or consequential), personal injury, or expense of any nature whatsoever which may be suffered by you or any third party as a result of, or which may be attributable directly or indirectly to, your access to and use of the site, any information contained on the site, or your personal information or material and information transmitted over our system. In particular, neither MyPustak nor any third party or data or content provider shall be liable in any way to you or any third party for any loss, liability, damage (whether direct, indirect, or consequential), personal injury, or expense of any nature whatsoever arising from any delays, inaccuracies, errors in, or omissions of, any information or data or the transmission thereof, or for any actions taken in reliance thereon or occasioned thereby, or because of non-performance or interruption of performance. Furthermore, our aggregate liability and the aggregate liability of any of our suppliers, service providers, or third-party affiliates arising from or relating to these terms of use and your use of the site (regardless of the form of action or claim, whether in contract, warranty, tort, strict liability, negligence, fraud or any other legal theory) is limited to a maximum of  One Thousand Rupees (INR 1000/-).
                            </p>
                            <p className={`${styles.termspara}`}>Indemnification</p>
                            <p>
                                You agree to indemnify and hold harmless Mypustak from and against all liabilities, claims, damages, costs, and expenses, including, without limitation, attorneys’ fees arising out of your use of the Site; any information or other materials you post, upload, e-mail or otherwise transmit using the Site (including, without limitation, credit card information); or your violation, breach, or alleged violation or the breach, of these Terms of Use.
                            </p>
                            <p className={`${styles.termspara}`}>Conflict of terms</p>
                            <p>
                                If there is a direct conflict or contradiction between the provisions of these Terms of use and any other relevant terms and conditions, policies, or notices that apply to a particular section or module of the Site, the other applicable terms, conditions, policies, or statements which relate specifically to a specific area or module of the Site shall prevail in respect of your use of that relevant section or module of the Site.
                            </p>
                            <p className={`${styles.termspara}`}>Severability</p>
                            <p>
                                Any provision of these Terms of Use which is or becomes unenforceable in any jurisdiction, whether due to being void, invalidity, illegality, unlawfulness, or for any reason whatsoever, shall, in such jurisdiction only and only to the extent that it is so unenforceable, be treated as void, and the remaining provisions of any relevant terms and conditions, policies and notices shall remain in full force and effect.
                            </p>
                            <p className={`${styles.termspara}`}>Modification of the Site or Terms of Use</p>
                            <p>
                                You acknowledge and agree that Mypustak reserves the right to change, modify, alter, update or discontinue the terms, conditions, and notices under which the Site is offered and the products, services, features, links, content, information, and any other materials are offered via the Site, at any time and from time to time, without notice or further obligation to you. By continuing to access or use the Site after Mypustak makes any such modifications, alterations, or updates, you agree to be bound by such modifications, alterations, or updates (as applicable).
                            </p>
                            <p className={`${styles.termspara}`}>Waiver; Entire Agreement</p>
                            <p>
                                Any waiver of any provision of these Terms of Use must be in writing and signed by Mypustak to be valid. A waiver of any provision hereunder shall not operate as a waiver of any other provision or a continuing waiver of the same condition in the future. These Terms of Use and our Privacy Policy constitute the entire understanding and agreement between you and us relating to the subject matter hereof and supersede any prior statements, understandings, or agreements, whether oral or written, regarding the such subject matter and shall not be modified except in writing, signed by you and Mypustak.
                            </p>
                            <p className={`${styles.termspara}`}>Termination</p>
                            <p>
                                Your access to the Site and your Account may be terminated immediately without notice from us if, in our sole discretion, you fail to comply with any term or provision of these Terms of Use. Upon termination, you must cease use of the Site and your Account, and neither you nor any third party on your behalf shall access or attempt to access the Site for any purpose whatsoever.
                            </p>
                        </div>
                    </div>
                </div>

                <style jsx>
                    {`
          
          `}
                </style>
            </React.Fragment>
        )
    }
}

export default TermsCondtion;

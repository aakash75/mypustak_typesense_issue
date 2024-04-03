import React from 'react'
import Link from 'next/link'
function ReturnPolicyFooter() {
    return (
        <div
            className='cartpage_footer bg-white row'
            style={{ margin: "0px", }}>
            <div className='col-lg-4 col-sm-6'>
                Policies: &nbsp;
                <Link
                    href='/pages/terms-conditions'
                    style={{ textDecoration: "none" }}>
                    Returns Policy
                </Link>{" "}
                &nbsp;| &nbsp;{" "}
                <Link href='/pages/terms-conditions'>Terms and condition</Link>
            </div>
            <div className='col-lg-4 col-sm-6'>
                Copyright &copy; 2019-2022 MyPustak.com
            </div>
            <div className='col-sm-12 col-lg-4'>
                Need help? Visit <Link href='/contact-us'>Contact Us</Link> or
                whatsapp us 033-418-04333
            </div>
        </div>
    )
}

export default ReturnPolicyFooter

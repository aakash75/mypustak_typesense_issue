import React from 'react'
import dynamic from 'next/dynamic';
const Login = dynamic(() => import('../../../components/login_page/LoginPage'));
function Page() {
    return (
        <div>
            <Login />
        </div>
    )
}
export default Page
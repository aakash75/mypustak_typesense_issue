import React from 'react'
import dynamic from "next/dynamic";

const GetAcess = dynamic(() => import('../../components/get-access/get-access'), { ssr: false });

function Page() {
    return (
        <GetAcess />
    )
}

export default Page 

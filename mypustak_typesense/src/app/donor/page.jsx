"use client"
import { useEffect } from 'react'
import CustomLoaderBorder from '../../components/CustomLoader/CustomLoaderBorder'
function Page() {
    useEffect(() => {
        window.location.replace("/")
    }, [])
    return (
        <div style={{ marginTop: "10rem" }}><CustomLoaderBorder /></div>
    )
}
export default Page
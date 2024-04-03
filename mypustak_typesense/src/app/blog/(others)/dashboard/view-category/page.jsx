import React, { Suspense } from 'react'
import DashboardViewCategory from "../../../../../components/ViewCategory/DashboardViewCategory"
function page() {
    return (
        <Suspense>
            <DashboardViewCategory/>
        </Suspense>
    )
}

export default page

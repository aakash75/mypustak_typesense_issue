import React, { Suspense } from 'react'
import DashboardSubmitPost from '@/components/SubmitPost/DashboardSubmitPost'

function page() {
  return (
   <Suspense>
     <DashboardSubmitPost />
   </Suspense>
  )
}

export default page

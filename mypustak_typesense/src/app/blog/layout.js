'use client'
import "@/styles/index.scss";

import SiteHeader from "./SiteHeader"
export default function RootLayout({ children }) {
    return (
        <div>
            <SiteHeader />
                {children}

        </div>
      
    )
}
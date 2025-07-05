'use client'

import React, { createContext, useContext, useEffect, useState } from "react"

interface siteInfo {
    siteName: string,
    siteLogo: string | null
}

interface contextOptions {
    siteInfo: siteInfo | null,
    setSiteInfo: (info: siteInfo) => void
}

const SiteInfoContext = createContext<contextOptions | undefined>(undefined)

export const SiteInfoProvider = ({ children }: { children: React.ReactNode }) => {
    const [siteInfo, setSiteInfo] = useState<siteInfo | null>(null)

    //set siteInfo on initial mount
    useEffect(() => {
        const fetchSiteInfo = async () => {
            const siteInfo = await fetch('/api/adminSettings/getgeneralsiteinfo')
            const data = await siteInfo.json()
            if (!data.error) setSiteInfo(data.siteInfo)
        }
        fetchSiteInfo()
    }, [])
    console.log(siteInfo, 'siteInfo');

    return (
        <SiteInfoContext.Provider value={{ siteInfo, setSiteInfo }}                                      >
            {children}
        </SiteInfoContext.Provider>
    )

}

export const useSiteInfo = () => {
    const context = useContext(SiteInfoContext)
    if (!context) throw new Error('useContact must be used inside ContactProvider');
    return context;
}

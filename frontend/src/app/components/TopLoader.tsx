'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const TopLoader = () => {
    const pathname = usePathname()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        const timeout = setTimeout(() => {
            setLoading(false)
        }, 500) // fake loading delay

        return () => clearTimeout(timeout)
    }, [pathname])

    return (
        <div className="fixed top-0 left-0 w-full z-[9999]">
            <div
                className={`h-1 bg-secondary transition-all duration-300 ease-out ${loading ? 'w-full' : 'w-0'
                    }`}
            ></div>
        </div>
    )
}

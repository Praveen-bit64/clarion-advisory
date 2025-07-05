'use client'

import { Bars } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <Bars
                height={80}
                width={80}
                color="#6699cc"
                ariaLabel="bars-loading"
                visible={true}
            />
        </div>
    )
}

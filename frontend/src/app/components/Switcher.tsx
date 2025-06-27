'use client' // for app directory usage

import { useEffect, useState } from 'react'

export default function Switcher(props: { enables(value: boolean): void }) {
    const { enables } = props
    const [enabled, setEnabled] = useState(true)

    useEffect(() => {
        enables(enabled)
    }, [enabled])

    return (
        <div className="flex items-center space-x-3">
            <button
                onClick={() => setEnabled(!enabled)}
                role="switch"
                aria-checked={enabled}
                className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-300 ${enabled ? 'bg-primary' : 'bg-gray-300'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white border border-primary shadow-md transition duration-300 ${enabled ? 'translate-x-5' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    )
}

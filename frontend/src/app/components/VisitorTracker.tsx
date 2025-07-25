'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
    useEffect(() => {
        fetch('/api/track-visitor', { method: 'POST' });
    }, []);

    return null;
}

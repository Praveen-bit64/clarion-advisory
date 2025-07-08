'use client';

import { useState } from 'react';

export default function TestImageUpload() {
    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setMessage('');
        }
    };

    const handleUpload = async () => {
        if (!image) {
            setMessage('Please select an image to upload.');
            return;
        }

        setUploading(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('image', image);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(`✅ Uploaded successfully: ${data.imageUrl}`);
            } else {
                setMessage(`❌ Upload failed: ${data.error || data.message}`);
            }
        } catch (err) {
            console.error('Upload error:', err);
            setMessage('❌ An unexpected error occurred.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Test Image Upload</h2>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
            />

            <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {message && <p className="mt-4 text-sm">{message}</p>}
        </div>
    );
}

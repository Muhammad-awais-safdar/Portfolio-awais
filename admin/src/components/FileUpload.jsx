import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

const FileUpload = ({ 
    onFileUpload, 
    currentImage, 
    fieldName = 'image',
    accept = 'image/*',
    maxSize = 5 * 1024 * 1024, // 5MB
    placeholder = 'Click to select an image or drag and drop'
}) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(currentImage || null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB`);
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);

        // Upload file
        uploadFile(file);
    };

    const uploadFile = async (file) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append(fieldName, file);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/single`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Image uploaded successfully');
                onFileUpload(data.data);
            } else {
                toast.error(data.message || 'Upload failed');
                setPreview(currentImage);
            }
        } catch (error) {
            toast.error('Upload failed. Please try again.');
            setPreview(currentImage);
        } finally {
            setUploading(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onFileUpload(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            <div
                className={`
                    relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                    transition-colors duration-200 min-h-[200px] flex flex-col items-center justify-center
                    ${dragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }
                    ${uploading ? 'pointer-events-none opacity-50' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileInputChange}
                    className="hidden"
                />

                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-40 max-w-full object-contain rounded"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeImage();
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <div className="text-gray-500">
                        {uploading ? (
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                                <span>Uploading...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="text-sm">{placeholder}</span>
                                <span className="text-xs text-gray-400 mt-1">
                                    Supports: JPG, PNG, GIF (max {maxSize / 1024 / 1024}MB)
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
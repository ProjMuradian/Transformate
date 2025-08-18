'use client';

import React from 'react';
import Dropzone from '@/components/dropzone';

export default function ConvertComponent() {
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Convert your files to different formats with our powerful online converter
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* File Upload Section */}
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                File Converter
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Transform your files to different formats with our powerful online converter. 
                Support for images, videos, and audio files.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Dropzone />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center space-y-3">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Powered by WebAssembly and FFmpeg for ultra-fast processing
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">100% Secure</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All processing happens locally in your browser
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Limits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Convert unlimited files with no restrictions
              </p>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Supported Formats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Images</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["JPG", "PNG", "GIF", "WebP", "BMP", "TIFF", "SVG", "ICO"].map((format) => (
                    <span key={format} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Videos</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["MP4", "AVI", "MOV", "WMV", "MKV", "FLV", "WebM", "3GP"].map((format) => (
                    <span key={format} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Audio</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["MP3", "WAV", "FLAC", "AAC", "OGG", "WMA", "M4A"].map((format) => (
                    <span key={format} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

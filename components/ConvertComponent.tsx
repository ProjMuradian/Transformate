'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Dropzone from '@/components/dropzone';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { HiOutlineDownload, HiOutlineEye, HiOutlineX } from 'react-icons/hi';
import { MdDone } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import { ImSpinner3 } from 'react-icons/im';
import type { Action } from '@/types';

export default function ConvertComponent() {
  const [previewFile, setPreviewFile] = useState<Action | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = (action: Action) => {
    setPreviewFile(action);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewFile(null);
  };

  const renderPreview = () => {
    if (!previewFile) return null;

    const isImage = previewFile.file_type.includes('image');
    const isVideo = previewFile.file_type.includes('video');
    const isAudio = previewFile.file_type.includes('audio');

    // Check if the converted format might have playback issues
    const hasPlaybackIssues = previewFile.to && ['3gp', '3g2', 'flv', 'wmv'].includes(previewFile.to.toLowerCase());

    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border shadow-lg">
          {/* Preview Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">File Preview</h3>
              <p className="text-sm text-muted-foreground">
                {previewFile.file_name} → {previewFile.to}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = previewFile.url;
                  a.download = previewFile.output;
                  a.click();
                }}
              >
                <HiOutlineDownload className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="sm" onClick={closePreview}>
                <HiOutlineX className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
            {/* File Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Original File */}
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-center text-muted-foreground">
                  Original File ({previewFile.from?.toUpperCase()})
                </h4>
                <div className="bg-muted/30 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                  {isImage && (
                    <div className="relative w-full h-[180px]">
                      <Image
                        src={URL.createObjectURL(previewFile.file)}
                        alt={`Original ${previewFile.file_name}`}
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  {isVideo && (
                    <video
                      controls
                      className="max-w-full max-h-[180px] rounded-lg"
                      src={URL.createObjectURL(previewFile.file)}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {isAudio && (
                    <audio
                      controls
                      className="w-full"
                      src={URL.createObjectURL(previewFile.file)}
                    >
                      Your browser does not support the audio tag.
                    </audio>
                  )}
                </div>
              </div>

              {/* Converted File */}
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-center text-muted-foreground">
                  Converted File ({previewFile.to?.toUpperCase()})
                </h4>
                <div className="bg-muted/30 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                  {isImage && (
                    <div className="relative w-full h-[180px]">
                      <Image
                        src={previewFile.url}
                        alt={`Converted ${previewFile.file_name}`}
                        fill
                        className="object-contain rounded-lg shadow-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  {isVideo && !hasPlaybackIssues && (
                    <video
                      controls
                      className="max-w-full max-h-[180px] rounded-lg shadow-lg"
                      src={previewFile.url}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {isVideo && hasPlaybackIssues && (
                    <div className="text-center space-y-3">
                      <div className="text-6xl text-muted-foreground">🎬</div>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium">Format: {previewFile.to?.toUpperCase()}</p>
                        <p>This format may not preview directly in the browser.</p>
                        <p className="text-xs mt-2">Download to view the converted file.</p>
                      </div>
                    </div>
                  )}
                  {isAudio && (
                    <audio
                      controls
                      className="w-full"
                      src={previewFile.url}
                    >
                      Your browser does not support the audio tag.
                    </audio>
                  )}
                </div>
              </div>
            </div>

            {/* Full Size Converted File Preview */}
            <div className="space-y-3">
              <h4 className="text-md font-semibold text-center">Full Size Preview</h4>
              <div className="bg-muted/30 rounded-lg p-4 flex justify-center">
                {isImage && (
                  <div className="relative w-full h-[40vh]">
                    <Image
                      src={previewFile.url}
                      alt={previewFile.file_name}
                      fill
                      className="object-contain rounded-lg shadow-lg"
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  </div>
                )}
                {isVideo && !hasPlaybackIssues && (
                  <video
                    controls
                    className="max-w-full max-h-[40vh] rounded-lg shadow-lg"
                    src={previewFile.url}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                {isVideo && hasPlaybackIssues && (
                  <div className="text-center space-y-4 py-8">
                    <div className="text-8xl text-muted-foreground">📹</div>
                    <div className="space-y-2">
                      <h5 className="text-lg font-medium">Format: {previewFile.to?.toUpperCase()}</h5>
                      <p className="text-sm text-muted-foreground max-w-md">
                        This video format ({previewFile.to?.toUpperCase()}) may not be directly supported by your browser for preview.
                        The conversion was successful, but you'll need to download the file to view it properly.
                      </p>
                      <div className="pt-4">
                        <Button
                          variant="default"
                          onClick={() => {
                            const a = document.createElement('a');
                            a.href = previewFile.url;
                            a.download = previewFile.output;
                            a.click();
                          }}
                          className="flex items-center gap-2"
                        >
                          <HiOutlineDownload className="h-4 w-4" />
                          Download {previewFile.to?.toUpperCase()} File
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {isAudio && (
                  <audio
                    controls
                    className="w-full max-w-md"
                    src={previewFile.url}
                  >
                    Your browser does not support the audio tag.
                  </audio>
                )}
              </div>
            </div>

            {/* File Info */}
            <div className="mt-6 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Original Format:</span>
                  <span className="ml-2 font-semibold">{previewFile.from?.toUpperCase()}</span>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Converted Format:</span>
                  <span className="ml-2 font-semibold">{previewFile.to?.toUpperCase()}</span>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">File Size:</span>
                  <span className="ml-2 font-semibold">{previewFile.file_size} bytes</span>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Status:</span>
                  <Badge variant="default" className="ml-2">
                    <MdDone className="h-3 w-3 mr-1" />
                    Converted
                  </Badge>
                </div>
              </div>
              
              {/* Format Compatibility Notice */}
              {hasPlaybackIssues && (
                <div className="mt-4 p-4 bg-muted/50 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-muted-foreground text-lg">⚠️</div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        Format Compatibility Notice
                      </p>
                      <p className="text-muted-foreground mt-1">
                        The {previewFile.to?.toUpperCase()} format may not preview directly in your browser. 
                        This is normal for certain video formats. The file has been converted successfully 
                        and can be downloaded and played in compatible media players.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Convert your files to different formats with our powerful online converter
        </p>
      </div>

      {/* Main Content Area */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* File Upload Section */}
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                File Converter
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transform your files to different formats with our powerful online converter. 
                Support for images, videos, and audio files.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Dropzone onPreview={handlePreview} />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center space-y-3">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Powered by WebAssembly and FFmpeg for ultra-fast processing
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">100% Secure</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens locally in your browser
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">No Limits</h3>
              <p className="text-sm text-muted-foreground">
                Convert unlimited files with no restrictions
              </p>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-foreground text-center mb-6">
              Supported Formats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Images</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["JPG", "PNG", "GIF", "WebP", "BMP", "TIFF", "SVG", "ICO"].map((format) => (
                    <span key={format} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Videos</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["MP4", "AVI", "MOV", "WMV", "MKV", "FLV", "WebM", "3GP"].map((format) => (
                    <span key={format} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Audio</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["MP3", "WAV", "FLAC", "AAC", "OGG", "WMA", "M4A"].map((format) => (
                    <span key={format} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && renderPreview()}
    </div>
  );
}

// imports
import Dropzone from "@/components/dropzone";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FiUploadCloud,
  FiZap,
  FiShield,
  FiDownload,
  FiFileText,
  FiVideo,
  FiMusic,
  FiImage,
  FiMic,
} from "react-icons/fi";
import {
  MdOutlineSpeed,
  MdOutlineCloudDone,
  MdOutlineAutoFixHigh,
} from "react-icons/md";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
            {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Transformate
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              by Muradian
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The most powerful online file converter and video transcription tool. 
              Transform your files instantly and free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/convert">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <FiUploadCloud className="mr-2 h-5 w-5" />
                  File Converter
                </Button>
              </Link>
              <Link href="/transcribe">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <FiMic className="mr-2 h-5 w-5" />
                  Video Transcription
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-200 dark:border-purple-800 px-8 py-6 text-lg font-semibold rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                View Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* File Upload Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Tool
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Select the tool that best fits your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/convert">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <FiUploadCloud className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">File Converter</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Convert images, videos, and audio files to different formats with our powerful online converter.
                </p>
              </div>
            </Link>
            <Link href="/transcribe">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <FiMic className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Video Transcription</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Convert your videos to text with our advanced AI transcription technology.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Transformate?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built with cutting-edge technology to provide the best file
              conversion experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FiZap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Powered by WebAssembly and FFmpeg for ultra-fast processing
                directly in your browser.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FiShield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                100% Secure
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All processing happens locally in your browser. Your files never
                leave your device.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <MdOutlineSpeed className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                No Limits
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Convert unlimited files with no size restrictions, registration,
                or hidden fees.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FiImage className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Multiple Formats
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Support for 50+ file formats including images, videos, and audio
                files.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <MdOutlineCloudDone className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Browser Based
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No software installation required. Works perfectly in any modern
                web browser.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <MdOutlineAutoFixHigh className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                High Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced algorithms ensure optimal quality retention during
                conversion process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Converting your files is as easy as 1-2-3
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FiUploadCloud className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  1. Upload Files
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Drag and drop your files or click to browse from your device
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MdOutlineAutoFixHigh className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  2. Choose Format
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Select your desired output format from our extensive list
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FiDownload className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  3. Download
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get your converted files instantly with just one click
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Formats Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Supported File Types
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We support all the popular file formats you need
        </p>
      </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Images */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FiImage className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Images
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["JPG", "PNG", "GIF", "WebP", "BMP", "TIFF", "SVG", "ICO"].map(
                  (format) => (
                    <Badge key={format} variant="secondary" className="text-xs">
                      {format}
                    </Badge>
                  )
                )}
              </div>
            </div>

            {/* Videos */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FiVideo className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Videos
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["MP4", "AVI", "MOV", "WMV", "MKV", "FLV", "WebM", "3GP"].map(
                  (format) => (
                    <Badge key={format} variant="secondary" className="text-xs">
                      {format}
                    </Badge>
                  )
                )}
              </div>
            </div>

            {/* Audio */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FiMusic className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Audio
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["MP3", "WAV", "FLAC", "AAC", "OGG", "WMA", "M4A"].map(
                  (format) => (
                    <Badge key={format} variant="secondary" className="text-xs">
                      {format}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Files?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of users who trust Transformate for their file
              conversion needs
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-12 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <FiUploadCloud className="mr-2 h-6 w-6" />
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

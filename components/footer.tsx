import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                alt="logo"
                className="w-32 cursor-pointer dark:invert"
                src="/images/logo.png"
                height={80}
                width={136}
              />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              The most powerful online file converter and video transcription tool. 
              Transform your files instantly and free.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/mozaddedalfeshani/muradian_convertor.git">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2">
                  <BsGithub className="h-4 w-4" />
                  GitHub
                </Button>
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
              Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/convert"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  File Converter
                </Link>
              </li>
              <li>
                <Link 
                  href="/transcribe"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Video Transcription
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy-policy"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
              Features
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• 100% Free</li>
              <li>• No Registration</li>
              <li>• No Limits</li>
              <li>• Browser Based</li>
              <li>• 50+ Formats</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © 2025 Transformate by Muradian. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-300">
              <Link 
                href="/about"
                className="hover:text-gray-900 dark:hover:text-white transition-colors">
                About
              </Link>
              <Link 
                href="/privacy-policy"
                className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

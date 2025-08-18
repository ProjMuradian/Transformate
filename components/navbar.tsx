// imports
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { LuMenu } from "react-icons/lu";

export default function Navbar({}): any {
  return (
    <nav className="fixed z-50 flex items-center justify-between w-full h-24 px-4 py-10 backdrop-blur-md bg-background bg-opacity-30 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <Link href="/">
        <Image
          alt="logo"
          className="w-40 cursor-pointer dark:invert"
          src="/images/logo.png"
          height={100}
          width={170}
        />
      </Link>
      <div className="hidden gap-1 md:gap-2 lg:gap-4 md:flex">
        <Button variant="ghost" className="font-semibold text-md">
          <Link href="/">Home</Link>
        </Button>
        <Link href="/convert">
          <Button variant="ghost" className="font-semibold text-md">
            Convert
          </Button>
        </Link>
        <Link href="/transcribe">
          <Button variant="ghost" className="font-semibold text-md">
            Transcribe
          </Button>
        </Link>
      </div>
      <div className="items-center hidden gap-2 md:flex">
        <ModeToggle />
        <Link href="/convert">
          <Button
            variant="default"
            className="items-center hidden gap-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 dark:from-orange-400 dark:to-pink-400 dark:hover:from-orange-500 dark:hover:to-pink-500 rounded-full w-fit md:flex shadow-lg hover:shadow-xl transition-all duration-300 text-white"
            size="lg">
            <span>Get Started</span>
            <span className="text-xl">
              ✨
            </span>
          </Button>
        </Link>
      </div>
      {/* MOBILE NAV */}
      <Sheet>
        <SheetTrigger className="block p-3 md:hidden">
          <span className="text-2xl text-slate-950 dark:text-slate-200">
            <LuMenu />
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="flex flex-col w-full h-full">
                <SheetTrigger asChild>
                  <Link href="/">
                    <Button
                      variant="link"
                      className="w-full font-semibold text-md">
                      Home
                    </Button>
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link href="/convert">
                    <Button
                      variant="link"
                      className="w-full font-semibold text-md">
                      Convert
                    </Button>
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link href="/transcribe">
                    <Button
                      variant="link"
                      className="w-full font-semibold text-md">
                      Transcribe
                    </Button>
                  </Link>
                </SheetTrigger>
                <ModeToggle />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

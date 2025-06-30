"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection: React.FC = () => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Scroll to next section
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full relative">
      <Link href="/product" className="block cursor-pointer">
        <div className="w-full relative">
          {/* Desktop Hero Image - Hidden on mobile */}
          <Image
            src="/hero.png"
            alt="Hero section with heading and man"
            width={1920}
            height={700}
            className="w-full h-auto object-cover max-h-[60vh] md:max-h-[700px] hidden md:block"
            priority
          />
          {/* Mobile Hero Image - Hidden on desktop */}
          <Image
            src="/SummerSale.png"
            alt="Hero section with heading and man"
            width={768}
            height={500}
            className="w-full h-auto block md:hidden"
            priority
          />
          {/* Scroll Down Button - Centered and overlapping bottom edge */}
          <button
            onClick={handleButtonClick}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white border border-gray-200 flex items-center justify-center shadow focus:outline-none rounded-full group hover:bg-black"
            aria-label="Scroll down"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-900 transition-transform duration-300 group-hover:translate-y-2 group-hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </Link>
    </section>
  );
};

export default HeroSection;

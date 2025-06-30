"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiSearchLine,
  RiShoppingCartLine,
  RiUser6Line,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

// -----------------------------
// Types
// -----------------------------

// Type for a collection item (for Shop By Collection menu)
interface CollectionItem {
  name: string;
  slug: string;
}

// -----------------------------
// Simulated API (replace with real fetch in backend)
// -----------------------------

/**
 * Simulate fetching collections from backend.
 * Replace this function with a real API call when backend is ready.
 */
const getCollections = async (): Promise<CollectionItem[]> => {
  return [
    { name: "Embroidered Shirt", slug: "embroidered-shirt" },
    { name: "Old Money Polos", slug: "old-money-polos" },
    { name: "Classic Half Sleeves", slug: "classic-half-sleeves" },
    { name: "Essential Linens", slug: "essential-linens" },
  ];
};

// -----------------------------
// Main Navbar Component
// -----------------------------

const MyNavbar: React.FC = () => {
  // -----------------------------
  // State
  // -----------------------------
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); // Mobile menu open/close
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Which dropdown is open
  const [collections, setCollections] = useState<CollectionItem[]>([]); // Dynamic collections
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll position for navbar bg

  // -----------------------------
  // Effects
  // -----------------------------
  // Fetch collections on mount (simulate API)
  useEffect(() => {
    getCollections().then(setCollections);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -----------------------------
  // Handlers
  // -----------------------------

  // Toggle mobile menu open/close
  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  // Toggle dropdowns (e.g., Shop By Collection)
  const toggleDropdown = (dropdown: string): void => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // -----------------------------
  // Render
  // -----------------------------

  return (
    <>
      {/* Header Bar (Logo, Hamburger, Desktop Nav) */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full transition-colors duration-200 ${
          isScrolled ? "bg-white border-b-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Mobile Hamburger Menu - Left Side */}
            <div className="lg:hidden">
              <button
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 p-2 rounded-md"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <RiCloseLine size={28} />
                ) : (
                  <RiMenuLine size={28} />
                )}
              </button>
            </div>
            {/* Logo - Center on Mobile, Left on Desktop */}
            <div className="flex-shrink-0 lg:flex-shrink-0 -mr-8 lg:mr-0">
              <Link href="/" className="block">
                <Image
                  src="/logo.png"
                  alt="NepWears"
                  width={160}
                  height={60}
                  className="h-16 lg:h-24 w-auto"
                  priority
                />
              </Link>
            </div>
            {/* Desktop Navigation - Hidden on Mobile */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Shop By Collection Dropdown (Desktop) */}
              <div className="relative group">
                <button
                  className="relative flex items-center space-x-1 hover:text-gray-600 transition-colors duration-200 uppercase text-xs tracking-wide font-medium py-8"
                  onMouseEnter={() => setActiveDropdown("shop")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span>Shop By Collection</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </button>
                {/* Dropdown Menu (Desktop) */}
                <div
                  className={`absolute top-full left-0 mt-2 w-72 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ${
                    activeDropdown === "shop" ? "opacity-100 visible" : ""
                  }`}
                  onMouseEnter={() => setActiveDropdown("shop")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="py-4">
                    <div className="ml-4">
                      {/* Shop All is always first, then dynamic collections */}
                      <Link
                        href="/product"
                        className="block px-6 py-3 text-sm text-gray-700 hover:text-white transition-all duration-200 relative group/item"
                      >
                        <span className="relative z-10">Shop All</span>
                        <span className="absolute left-0 top-0 w-0 h-full bg-black transition-all duration-300 group-hover/item:w-full"></span>
                      </Link>
                      {collections.slice(0, 4).map((item) => (
                        <Link
                          key={item.slug}
                          href={`/${item.slug}`}
                          className="block px-6 py-3 text-sm text-gray-700 hover:text-white transition-all duration-200 relative group/item"
                        >
                          <span className="relative z-10">{item.name}</span>
                          <span className="absolute left-0 top-0 w-0 h-full bg-black transition-all duration-300 group-hover/item:w-full"></span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Best Sellers */}
              <Link
                href="/best-sellers"
                className="relative hover:text-gray-600 transition-colors duration-200 uppercase text-xs tracking-wide font-medium group py-8"
              >
                <span>Best Sellers</span>
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              {/* Returns and Exchanges */}
              <Link
                href="/returns"
                className="relative hover:text-gray-600 transition-colors duration-200 uppercase text-xs tracking-wide font-medium group py-8"
              >
                <span>Returns & Exchanges</span>
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            </nav>
            {/* Right Side Icons - Search, Cart, Account */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              {/* Account - Hidden on Mobile */}
              <Link
                href="/login"
                className="hidden lg:block text-gray-700 hover:text-gray-900 transition-all duration-200 p-2 rounded-md"
                aria-label="Account"
              >
                <RiUser6Line size={20} />
              </Link>
              {/* Search */}
              <Link
                href="/search"
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 p-2 rounded-md"
                aria-label="Search"
              >
                <RiSearchLine size={20} />
              </Link>
              {/* Cart */}
              <Link
                href="/cart"
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 p-2 rounded-md relative"
                aria-label="Shopping Cart"
              >
                <RiShoppingCartLine size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu Sidebar (slide-in) */}
      <aside
        className={`fixed top-0 left-0 h-full w-96 max-w-[100vw] bg-white z-50 lg:hidden shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Top: Close button */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
          <div />
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-2xl text-gray-700 hover:text-black"
            aria-label="Close menu"
          >
            <RiCloseLine size={28} />
          </button>
        </div>
        {/* Main Menu (Mobile) */}
        <nav className="flex-1 flex flex-col justify-start px-8 pt-6 space-y-6">
          {/* SHOP with submenu (Mobile) */}
          <div>
            <button
              className="flex items-center justify-between w-full text-lg tracking-widest uppercase text-gray-900 hover:text-black py-2 focus:outline-none"
              onClick={() => toggleDropdown("mobile-shop")}
            >
              <span>Shop</span>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                  activeDropdown === "mobile-shop" ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            {/* Dropdown for Shop By Collection (Mobile) */}
            {activeDropdown === "mobile-shop" && (
              <div className="pl-4 pt-2 space-y-2 animate-fadeIn">
                {/* Shop All is always first, then dynamic collections */}
                <Link
                  href="/product"
                  onClick={toggleMobileMenu}
                  className="block text-base text-gray-700 hover:text-black py-1"
                >
                  Shop All
                </Link>
                {collections.slice(0, 4).map((col) => (
                  <Link
                    key={col.slug}
                    href={`/${col.slug}`}
                    onClick={toggleMobileMenu}
                    className="block text-base text-gray-700 hover:text-black py-1"
                  >
                    {col.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* Other main menu items (Mobile) */}
          <Link
            href="/best-sellers"
            onClick={toggleMobileMenu}
            className="block text-lg tracking-widest uppercase text-gray-900 hover:text-black py-2"
          >
            Best Sellers
          </Link>
          <Link
            href="/new-arrivals"
            onClick={toggleMobileMenu}
            className="block text-lg tracking-widest uppercase text-gray-900 hover:text-black py-2"
          >
            New Arrivals
          </Link>
          <Link
            href="/returns"
            onClick={toggleMobileMenu}
            className="block text-lg tracking-widest uppercase text-gray-900 hover:text-black py-2"
          >
            Return and Exchanges
          </Link>
          <Link
            href="/about"
            onClick={toggleMobileMenu}
            className="block text-lg tracking-widest uppercase text-gray-900 hover:text-black py-2"
          >
            About Us
          </Link>
        </nav>
        {/* Bottom: Account & Contact (Mobile) */}
        <div className="px-8 pb-8 mt-auto space-y-4">
          <Link
            href="/login"
            onClick={toggleMobileMenu}
            className="block text-sm tracking-widest uppercase text-gray-700 hover:text-black"
          >
            Account
          </Link>
          <Link
            href="/contact"
            onClick={toggleMobileMenu}
            className="block text-sm tracking-widest uppercase text-gray-700 hover:text-black"
          >
            Contact
          </Link>
        </div>
      </aside>
    </>
  );
};

export default MyNavbar;

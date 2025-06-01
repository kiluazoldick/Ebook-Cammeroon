"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`bg-white shadow-sm fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "py-1" : "py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-orange-600 text-2xl mr-2"
              />
              <span className="text-xl font-bold text-orange-600">
                <Link href="#marketing" onClick={closeMenu}>
                  Ebook Cameroun
                </Link>
              </span>
            </div>
          </div>

          {/* Liens desktop */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <NavLink href="#features" onClick={closeMenu}>
              Avantages
            </NavLink>
            <NavLink href="#how-it-works" onClick={closeMenu}>
              Comment ça marche
            </NavLink>
            <NavLink href="#pricing" onClick={closeMenu}>
              Tarifs
            </NavLink>
            <NavLink href="#testimonials" onClick={closeMenu}>
              Avis clients
            </NavLink>
          </div>

          {/* Bouton mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>

          {/* Bouton CTA */}
          <div className="hidden md:flex items-center">
            <CTAButton onClick={closeMenu} />
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white shadow-lg">
          <MobileNavLink href="#features" onClick={closeMenu}>
            Avantages
          </MobileNavLink>
          <MobileNavLink href="#how-it-works" onClick={closeMenu}>
            Comment ça marche
          </MobileNavLink>
          <MobileNavLink href="#pricing" onClick={closeMenu}>
            Tarifs
          </MobileNavLink>
          <MobileNavLink href="#testimonials" onClick={closeMenu}>
            Avis clients
          </MobileNavLink>
          <div className="mt-4">
            <CTAButton onClick={closeMenu} fullWidth />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Liens classiques
const NavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
  >
    {children}
  </Link>
);

// Liens mobiles
const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
  >
    {children}
  </Link>
);

// Bouton CTA
const CTAButton = ({
  onClick,
  fullWidth = false,
}: {
  onClick: () => void;
  fullWidth?: boolean;
}) => (
  <Link
    href="/ebooks"
    onClick={onClick}
    className={`${
      fullWidth ? "w-full" : ""
    } inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200`}
  >
    Parcourir les ebooks
  </Link>
);

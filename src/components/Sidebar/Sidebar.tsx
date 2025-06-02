"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faFire,
  faStar,
  faUser,
  faBars,
  faTimes,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const mainLinks = [
  { href: "/dashboard", icon: faHome, label: "Accueil" },
  { href: "/dashboard/populaires", icon: faFire, label: "Populaires" },
  { href: "/dashboard/recommandes", icon: faStar, label: "Recommandés" },
  { href: "/dashboard/auteurs", icon: faBookOpen, label: "Auteurs" },
];

const accountLink = {
  href: "/dashboard/account",
  icon: faUser,
  label: "Mon compte",
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-md ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <FontAwesomeIcon icon={faBars} className="text-orange-500 text-lg" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-full w-64 bg-[#fff9f4] shadow-lg p-4 border-r border-gray-100
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <span className="text-2xl font-bold text-orange-500">
                Ebook Cameroun
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-600 hover:text-orange-500"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Liens principaux */}
          <nav className="flex-1 space-y-2">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  pathname === link.href
                    ? "bg-orange-100 text-orange-600 font-semibold"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <FontAwesomeIcon icon={link.icon} className="mr-3 w-5" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Compte */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <Link
              href={accountLink.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center p-3 rounded-lg transition-all ${
                pathname === accountLink.href
                  ? "bg-orange-100 text-orange-600 font-semibold"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <FontAwesomeIcon icon={accountLink.icon} className="mr-3 w-5" />
              {accountLink.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

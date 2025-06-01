"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faChartLine,
  faQuestionCircle,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const mainLinks = [
  { href: "/dashboard/notes", icon: faFileAlt, label: "Notes" },
  { href: "/dashboard/summary", icon: faChartLine, label: "Résumé" },
  { href: "/dashboard/quiz", icon: faQuestionCircle, label: "Quiz" },
  { href: "/dashboard/stats", icon: faChartLine, label: "Stats" },
];

const accountLink = {
  href: "/dashboard/account",
  icon: faUser,
  label: "Compte",
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton Hamburger pour mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-md ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <FontAwesomeIcon icon={faBars} className="text-indigo-600 text-lg" />
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-full w-64 bg-white shadow-lg p-4 border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <span className="text-xl font-bold text-indigo-600">
                CorrigeTesCours
              </span>
            </Link>

            {/* Bouton fermeture mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-600 hover:text-indigo-600"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Navigation principale */}
          <nav className="flex-1 space-y-2">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center p-3 rounded-lg ${
                  pathname === link.href
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={link.icon} className="mr-3" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Section compte en bas */}
          <div className="border-t border-gray-200 pt-2">
            <Link
              href={accountLink.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center p-3 rounded-lg ${
                pathname === accountLink.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FontAwesomeIcon icon={accountLink.icon} className="mr-3" />
              {accountLink.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

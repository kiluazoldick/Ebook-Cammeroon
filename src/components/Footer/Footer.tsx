import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const footerLinks = [
    {
      title: "Produit",
      links: [
        { text: "Catalogue", href: "#catalogue" },
        { text: "Abonnements", href: "#pricing" },
        { text: "Comment ça marche", href: "#how-it-works" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { text: "À propos", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Nous rejoindre", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Aide & FAQ", href: "#" },
        { text: "Contactez-nous", href: "#" },
        { text: "Statut du service", href: "#" },
      ],
    },
    {
      title: "Légal",
      links: [
        { text: "Politique de confidentialité", href: "#" },
        { text: "Conditions d'utilisation", href: "#" },
        { text: "Cookies", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: faFacebookF, href: "#" },
    { icon: faTwitter, href: "#" },
    { icon: faInstagram, href: "#" },
    { icon: faLinkedinIn, href: "#" },
  ];

  return (
    <footer className="bg-orange-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-orange-600 tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-4">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-base text-orange-700 hover:text-orange-900"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-orange-200 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2 space-x-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-orange-400 hover:text-orange-600"
                  aria-label="Lien réseau social"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </Link>
              ))}
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-orange-700">
                &copy; 2025 Ebook Cameroun. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

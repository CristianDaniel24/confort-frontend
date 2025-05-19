import { Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700">
      {/* Decorative Top Border */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Tapiceria Confort
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Expertos en tapicería de alta calidad. Transformamos tus muebles
              con elegancia y confort desde 2008.
            </p>
            <div className="flex space-x-6 mt-2">
              <a
                href="https://www.instagram.com/confort_industri?igsh=czZ1eGN2OHNrZXM5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center space-y-1"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Instagram
                </span>
                <Instagram
                  className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400"
                  size={22}
                />
              </a>

              <a
                href="https://wa.me/573174109274"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center space-y-1"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  WhatsApp
                </span>
                <FaWhatsapp
                  className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                  size={22}
                />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Nuestros Servicios
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-300">
                Tapiceria personalizada
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Modificacion de sillas
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Tapiforros de lujo
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Restauracion de interiores
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Tapetes, pisos, techos, baules y volantes
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Trabajos en madera
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Detailing y mas..
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Contáctanos
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <MapPin
                  className="flex-shrink-0 text-blue-500 dark:text-blue-400"
                  size={18}
                />
                <span className="text-gray-600 dark:text-gray-300">
                  CRA 20a# 26-20📌 Barrio san antonio, Sogamoso - Colombia.
                </span>
              </div>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Phone
                  className="flex-shrink-0 text-blue-500 dark:text-blue-400"
                  size={18}
                />
                <span className="text-gray-600 dark:text-gray-300">
                  +57 317 410 9274
                </span>
              </div>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Mail
                  className="flex-shrink-0 text-blue-500 dark:text-blue-400"
                  size={18}
                />
                <span className="text-gray-600 dark:text-gray-300">
                  confortapiceria@gmail.com.co
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

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
              <Facebook
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                size={22}
              />
              <Instagram
                className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400"
                size={22}
              />
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Nuestros Servicios
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-300">
                Retapizado de Muebles
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Diseño Personalizado
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Restauración de Antigüedades
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Fabricación a Medida
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Asesoría en Decoración
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
                  Magdalena Calle 4 # 24 - 21, Sogamoso, Colombia.
                </span>
              </div>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Phone
                  className="flex-shrink-0 text-blue-500 dark:text-blue-400"
                  size={18}
                />
                <span className="text-gray-600 dark:text-gray-300">
                  +57 322 470 5153
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

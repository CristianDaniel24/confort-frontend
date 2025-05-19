import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsappButton() {
  return (
    <div className="fixed left-4 bottom-6 z-50 group flex flex-col items-center space-y-2">
      {/* Tooltip */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-sm px-2 py-1 rounded-md shadow-lg mb-1 whitespace-nowrap">
        WhatsApp
      </div>
      <a
        href="https://wa.me/573174109274"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all"
        aria-label="Contáctanos por WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
}

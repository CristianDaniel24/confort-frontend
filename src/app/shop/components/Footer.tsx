"use client";

import { useState, useEffect } from "react";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const socialVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
  };

  const gradientVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 overflow-hidden">
      {/* Animated Gradient Border */}
      <motion.div
        className="w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
        initial="hidden"
        animate="visible"
        variants={gradientVariants}
      />

      {/* Main Footer Content */}
      <motion.div
        className="container mx-auto px-6 py-10"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <motion.h3
              className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Tapiceria Confort
            </motion.h3>
            <motion.p
              className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              Expertos en tapicería de alta calidad. Transformamos tus muebles
              con elegancia y confort desde 2008.
            </motion.p>
            <motion.div className="flex space-x-6 mt-2" variants={itemVariants}>
              <motion.a
                href="https://www.instagram.com/confort_industri?igsh=czZ1eGN2OHNrZXM5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center space-y-1 group"
                whileHover={{ y: -3 }}
                variants={socialVariants}
              >
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                  Instagram
                </span>
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Instagram
                    className="text-gray-500 group-hover:text-pink-600 dark:text-gray-400 dark:group-hover:text-pink-400 transition-colors duration-300"
                    size={22}
                  />
                </motion.div>
              </motion.a>

              <motion.a
                href="https://wa.me/573174109274"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center space-y-1 group"
                whileHover={{ y: -3 }}
                variants={socialVariants}
              >
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  WhatsApp
                </span>
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <FaWhatsapp
                    className="text-gray-500 group-hover:text-green-600 dark:text-gray-400 dark:group-hover:text-green-400 transition-colors duration-300"
                    size={22}
                  />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Services */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <motion.h3
              className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Nuestros Servicios
            </motion.h3>
            <motion.ul className="space-y-3" variants={itemVariants}>
              {[
                "Tapiceria personalizada",
                "Modificacion de sillas",
                "Tapiforros de lujo",
                "Restauracion de interiores",
                "Tapetes, pisos, techos, baules y volantes",
                "Trabajos en madera",
                "Detailing y mas..",
              ].map((service, index) => (
                <motion.li
                  key={index}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  variants={itemVariants}
                >
                  {service}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            variants={itemVariants}
          >
            <motion.h3
              className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Contáctanos
            </motion.h3>
            <motion.div className="space-y-4" variants={itemVariants}>
              <motion.div
                className="flex items-center space-x-3 justify-center md:justify-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <MapPin
                    className="flex-shrink-0 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300"
                    size={18}
                  />
                </motion.div>
                <span className="text-gray-600 dark:text-gray-300">
                  CRA 20a# 26-20📌 Barrio san antonio, Sogamoso - Colombia.
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 justify-center md:justify-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Phone
                    className="flex-shrink-0 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300"
                    size={18}
                  />
                </motion.div>
                <span className="text-gray-600 dark:text-gray-300">
                  +57 317 410 9274
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 justify-center md:justify-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Mail
                    className="flex-shrink-0 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300"
                    size={18}
                  />
                </motion.div>
                <span className="text-gray-600 dark:text-gray-300">
                  confortapiceria@gmail.com.co
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-zinc-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {currentYear} Tapiceria Confort. Todos los derechos reservados.
      </motion.div>
    </footer>
  );
}

"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-gray-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center relative z-10">
        
        {/* LOGO VOLUMÉTRICA FLUTUANTE */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative w-32 h-48 md:w-40 md:h-60 mb-10 opacity-90 drop-shadow-2xl"
        >
          <Image 
            src="/images/logo-volumetrica.png" 
            alt="Stangherlin Logo 3D" 
            fill 
            className="object-contain"
          />
        </motion.div>

        <h2 className="text-2xl font-light tracking-[0.3em] uppercase mb-4 text-center">Stangherlin</h2>
        <p className="text-gray-500 text-xs tracking-widest uppercase mb-12 text-center">Arquitetura e Inteligência Construtiva</p>
        
        {/* CITAÇÃO BÍBLICA DEFINITIVA */}
        <div className="max-w-2xl mx-auto text-center mb-16 px-4">
          <p className="text-gray-400 font-light italic leading-relaxed text-sm">
            "Se o Senhor não edificar a casa, em vão trabalham os que a edificam."
          </p>
          <p className="text-gray-500 text-[10px] mt-4 uppercase tracking-[0.2em]">Salmos 127:1</p>
        </div>
        
        {/* LINKS FUNCIONAIS OFICIAIS */}
        <div className="w-full border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 tracking-widest uppercase">
          <p className="mb-6 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} Stangherlin. Todos os direitos reservados.
          </p>
          
          {/* Navegação de Contato (Flex-wrap garante que não quebre no celular) */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 z-20 relative">
            <a 
              href="https://www.instagram.com/stangherlin.arquitetura/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Instagram
            </a>
            <a 
              href="https://www.linkedin.com/in/rodrigo-stangherlin" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors cursor-pointer"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:stangherlin.arquitetura@gmail.com" 
              className="hover:text-white transition-colors cursor-pointer"
            >
              E-mail
            </a>
            <a 
              href="https://api.whatsapp.com/send/?phone=554792106396&text&type=phone_number&app_absent=0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors cursor-pointer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
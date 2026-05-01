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
        
        {/* CITAÇÃO BÍBLICA RESTAURADA */}
        <div className="max-w-2xl mx-auto text-center mb-16 px-4">
          <p className="text-gray-400 font-light italic leading-relaxed text-sm">
            "Se o Senhor não edificar a casa, em vão trabalham os que a edificam." Salmos 127:1
          </p>
        </div>
        
        <div className="w-full border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Stangherlin. Todos os direitos reservados.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#contato" className="hover:text-white transition-colors">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
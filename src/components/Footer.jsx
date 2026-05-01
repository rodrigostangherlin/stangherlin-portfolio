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
        
        {/* CITAÇÃO BÍBLICA */}
        <div className="max-w-2xl mx-auto text-center mb-16 px-4">
          <p className="text-gray-400 font-light italic leading-relaxed text-sm">
            "Com a sabedoria se edifica a casa, e com a inteligência ela se firma; pelo conhecimento se encherão as câmaras de todas as substâncias preciosas e deleitáveis."
          </p>
          <p className="text-gray-500 text-[10px] mt-4 uppercase tracking-[0.2em]">Provérbios 24:3-4</p>
        </div>
        
        {/* LINKS FUNCIONAIS RESTAURADOS */}
        <div className="w-full border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Stangherlin. Todos os direitos reservados.</p>
          <div className="flex space-x-8 mt-6 md:mt-0 z-20 relative">
            {/* Coloque os seus links reais dentro do href="" */}
            <a href="https://instagram.com/stangherlin.arq" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Instagram</a>
            <a href="https://linkedin.com/in/rodrigostangherlin" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">LinkedIn</a>
            <a href="mailto:contato@stangherlin.arq.br" className="hover:text-white transition-colors cursor-pointer">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
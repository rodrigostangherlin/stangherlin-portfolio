"use client";

import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import projetos from '../data/projetos.json';
import React, { useState } from 'react';

// Novo Componente de Item do Portfólio com TILT 3D
function PortfolioItem({ projeto, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Valores de movimento para calcular o tilt
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const intensity = 15; // Intensidade da inclinação

  const rotateX = useTransform(y, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(x, [0, 1], [-intensity, intensity]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width;
    const mouseY = (event.clientY - rect.top) / rect.height;
    
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div 
      key={projeto.id} 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group relative aspect-[1/1.25] bg-gray-50 cursor-pointer overflow-hidden rounded-sm"
      style={{ perspective: "1000px" }} // Ativa a perspectiva 3D
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Container da Imagem que sofre o TILT */}
      <motion.div
        className="relative w-full h-full w-full h-full"
        animate={{ rotateX: isHovered ? rotateX.get() : 0, rotateY: isHovered ? rotateY.get() : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          boxShadow: isHovered 
            ? "0px 15px 35px rgba(0,0,0,0.4)" 
            : "0px 2px 5px rgba(0,0,0,0.1)"
        }}
      >
        <Image 
          src={projeto.imagem_capa} 
          alt={`Projeto Stangherlin Arquitetura: ${projeto.titulo}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={projeto.id === "1"}
        />
        
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end p-6 lg:p-8 z-10">
          <div className="text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-3 group-hover:translate-y-0">
            <h3 className="text-white text-xl lg:text-2xl tracking-wider mb-2 uppercase font-medium">
              {projeto.titulo}
            </h3>
            <p className="text-gray-200 text-sm font-light tracking-wide uppercase">
              {projeto.categoria}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Componente Principal do Grid
export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="p-6 lg:p-12 overflow-hidden bg-white z-0 relative">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-light mb-10 uppercase tracking-widest text-center text-gray-900"
      >
        Obras Selecionadas
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 z-0 relative">
        {projetos.map((projeto, index) => (
          <PortfolioItem projeto={projeto} index={index} key={projeto.id} />
        ))}
      </div>
    </section>
  );
}
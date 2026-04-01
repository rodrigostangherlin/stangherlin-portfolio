"use client";

import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import projetos from '../data/projetos.json';
import React, { useState, useEffect } from 'react';

function PortfolioItem({ projeto, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const intensity = 15;

  const rotateX = useTransform(y, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(x, [0, 1], [-intensity, intensity]);

  // Detecta se o usuário está em um dispositivo touch
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
    }
  }, []);

  function handlePointerMove(event) {
    if (event.pointerType !== "mouse" || isTouchDevice) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width;
    const mouseY = (event.clientY - rect.top) / rect.height;
    
    x.set(mouseX);
    y.set(mouseY);
  }

  function handlePointerLeave(event) {
    if (event.pointerType !== "mouse" || isTouchDevice) return;
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group relative aspect-[1/1.25] bg-gray-50 cursor-pointer overflow-hidden rounded-sm"
      style={{ perspective: "1000px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
    >
      <motion.div
        className="relative w-full h-full"
        // Só aplica rotação se não for celular e estiver em hover
        animate={{ 
          rotateX: isHovered && !isTouchDevice ? rotateX.get() : 0, 
          rotateY: isHovered && !isTouchDevice ? rotateY.get() : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          boxShadow: isHovered && !isTouchDevice
            ? "0px 15px 35px rgba(0,0,0,0.4)" 
            : "0px 2px 5px rgba(0,0,0,0.1)"
        }}
      >
        <Image 
          src={projeto.imagem_capa} 
          alt={`Projeto Stangherlin Arquitetura: ${projeto.titulo}`}
          fill
          className="object-cover transition-transform duration-700 md:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={projeto.id === "1"}
        />
        
        {/* Camada Escura: Sempre visível no celular (opacity-100), escondida no PC até o mouse passar por cima */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 lg:p-8 z-10">
          
          {/* Textos: Sempre no lugar no celular, deslizam no PC */}
          <div className="text-left opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 translate-y-0 md:translate-y-3 md:group-hover:translate-y-0">
            <h3 className="text-white text-xl lg:text-2xl tracking-wider mb-1 uppercase font-medium">
              {projeto.titulo}
            </h3>
            <p className="text-gray-300 text-xs font-light tracking-widest uppercase">
              {projeto.categoria}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
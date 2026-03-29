"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveLogo() {
  // Estados para controlar a inclinação (efeito 3D)
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Função que calcula a inclinação baseada na posição do mouse dentro da logo
  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Calcula o ponto central da logo
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calcula a distância do mouse para o centro (-1 até 1)
    const mouseX = (event.clientX - centerX) / (rect.width / 2);
    const mouseY = (event.clientY - centerY) / (rect.height / 2);
    
    // Define a intensidade da inclinação (quanto maior o número, mais inclina)
    const intensity = 20; 
    
    setRotateX(-mouseY * intensity); // Inclinação Vertical
    setRotateY(mouseX * intensity);  // Inclinação Horizontal
  }

  // Reseta a inclinação quando o mouse sai de cima
  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
  }

  return (
    // O Container com Perspectiva 3D ativada
    <div 
      style={{ perspective: "1000px" }}
      className="cursor-pointer"
    >
      <motion.div
        className="text-xl font-bold tracking-widest uppercase text-white p-2"
        
        // Aplica a rotação calculada em tempo real
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }} // Movimento suave como mola
        
        // Efeito de sombra (profundidade) ao passar o mouse
        whileHover={{ 
          scale: 1.05,
          textShadow: "0px 10px 20px rgba(0,0,0,0.5)", // Sombra projetada para dar profundidade
          filter: "drop-shadow(0px 15px 15px rgba(0,0,0,0.3))"
        }}
        
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        Stangherlin <span className="font-light opacity-80">Arquitetura</span>
      </motion.div>
    </div>
  );
}
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveLogo() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Alterado para onPointerMove para podermos filtrar toques de celular
  function handlePointerMove(event) {
    // SE NÃO FOR MOUSE (for dedo no celular), ABORTA O EFEITO 3D
    if (event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = (event.clientX - centerX) / (rect.width / 2);
    const mouseY = (event.clientY - centerY) / (rect.height / 2);
    
    const intensity = 20; 
    setRotateX(-mouseY * intensity);
    setRotateY(mouseX * intensity);
  }

  function handlePointerLeave() {
    setRotateX(0);
    setRotateY(0);
  }

  return (
    <div 
      style={{ perspective: "1000px" }}
      className="cursor-pointer"
    >
      <motion.div
        className="text-xl font-bold tracking-widest uppercase text-white p-2"
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ 
          scale: 1.05,
          textShadow: "0px 10px 20px rgba(0,0,0,0.5)",
          filter: "drop-shadow(0px 15px 15px rgba(0,0,0,0.3))"
        }}
        // Substituímos os eventos antigos pelos novos eventos de ponteiro
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        Stangherlin <span className="font-light opacity-80">Arquitetura</span>
      </motion.div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import projetos from '../data/projetos.json';

function PortfolioItem({ projeto, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) setIsTouchDevice(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative aspect-[4/5] cursor-pointer group" // Definido como 4:5 para o grid
      style={{ perspective: "1000px" }}
      onClick={() => onClick(projeto)}
      onMouseMove={(e) => {
        if (isTouchDevice) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); x.set(0.5); y.set(0.5); }}
    >
      <motion.div 
        className="w-full h-full relative overflow-hidden rounded-sm bg-gray-100"
        animate={{ rotateX: isHovered && !isTouchDevice ? rotateX.get() : 0, rotateY: isHovered && !isTouchDevice ? rotateY.get() : 0 }}
      >
        <Image src={projeto.imagem_capa} alt={projeto.titulo} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
          <h3 className="text-white text-xl font-medium uppercase tracking-wider">{projeto.titulo}</h3>
          <p className="text-gray-300 text-xs uppercase tracking-widest">{projeto.local}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioGrid() {
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [fotoAtual, setFotoAtual] = useState(0);

  const abrirProjeto = (projeto) => {
    setProjetoSelecionado(projeto);
    setFotoAtual(0);
    document.body.style.overflow = 'hidden'; // Bloqueia scroll do fundo
  };

  const fecharProjeto = () => {
    setProjetoSelecionado(null);
    document.body.style.overflow = 'auto'; // Liberta scroll do fundo
  };

  return (
    <section id="portfolio" className="p-6 lg:p-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projetos.map((p, i) => (
          <PortfolioItem key={p.id} projeto={p} index={i} onClick={abrirProjeto} />
        ))}
      </div>

      <AnimatePresence>
        {projetoSelecionado && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-start justify-center overflow-y-auto p-4 md:p-12"
            onClick={fecharProjeto}
          >
            {/* BOTÃO FECHAR FIXO E VISÍVEL */}
            <button 
              onClick={fecharProjeto}
              className="fixed top-6 right-6 z-[110] bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow-xl hover:scale-110 transition-transform font-bold"
            >
              ✕
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-6xl rounded-sm overflow-hidden flex flex-col md:flex-row min-h-max"
              onClick={(e) => e.stopPropagation()}
            >
              {/* COLUNA DA IMAGEM - Agora com proporção respeitada */}
              <div className="relative w-full md:w-3/5 bg-gray-200 aspect-[4/5] md:aspect-auto md:min-h-[80vh] group">
                <AnimatePresence mode="wait">
                  <motion.div key={fotoAtual} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                    <Image 
                      src={projetoSelecionado.galeria ? projetoSelecionado.galeria[fotoAtual] : projetoSelecionado.imagem_capa} 
                      alt={projetoSelecionado.titulo} 
                      fill 
                      className="object-cover" // Object cover aqui funciona bem se o contentor já for 4:5 ou similar
                    />
                  </motion.div>
                </AnimatePresence>

                {/* SETAS DE NAVEGAÇÃO */}
                {projetoSelecionado.galeria && projetoSelecionado.galeria.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); setFotoAtual(prev => prev === 0 ? projetoSelecionado.galeria.length - 1 : prev - 1); }} className="bg-white/90 p-3 shadow-lg hover:bg-white transition">←</button>
                    <button onClick={(e) => { e.stopPropagation(); setFotoAtual(prev => prev === projetoSelecionado.galeria.length - 1 ? 0 : prev + 1); }} className="bg-white/90 p-3 shadow-lg hover:bg-white transition">→</button>
                  </div>
                )}
              </div>

              {/* COLUNA DE TEXTO - Com scroll interno se necessário */}
              <div className="w-full md:w-2/5 p-8 lg:p-16 flex flex-col justify-center bg-white">
                <h2 className="text-3xl font-light mb-2 uppercase tracking-tighter">{projetoSelecionado.titulo}</h2>
                <p className="text-gray-400 mb-8 uppercase tracking-widest text-xs">{projetoSelecionado.local}</p>
                
                <div className="space-y-5 text-sm border-t border-gray-100 pt-8">
                  <div className="flex flex-col"><span className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Construtora</span> <span className="font-medium">{projetoSelecionado.detalhes.construtora}</span></div>
                  <div className="flex flex-col"><span className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Tipologia</span> <span className="font-medium">{projetoSelecionado.detalhes.tipologia}</span></div>
                  <div className="flex flex-col"><span className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Área Construída</span> <span className="font-medium">{projetoSelecionado.detalhes.area_construida}</span></div>
                  <div className="flex flex-col"><span className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Unidades</span> <span className="font-medium">{projetoSelecionado.detalhes.unidades}</span></div>
                  <div className="flex flex-col"><span className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Configuração</span> <span className="font-medium">{projetoSelecionado.detalhes.configuracao}</span></div>
                  <p className="pt-6 text-gray-600 leading-relaxed font-light border-t border-gray-50 italic">"{projetoSelecionado.detalhes.descricao}"</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
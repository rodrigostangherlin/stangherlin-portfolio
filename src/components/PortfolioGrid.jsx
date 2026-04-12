"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import projetos from '../data/projetos.json';

// COMPONENTE DE ITEM DO GRID (A Vitrine)
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
      className="relative aspect-[1/1.2] cursor-pointer group"
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

// COMPONENTE PRINCIPAL
export default function PortfolioGrid() {
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [fotoAtual, setFotoAtual] = useState(0);

  // Funções para abrir o projeto e navegar na galeria
  const abrirProjeto = (projeto) => {
    setProjetoSelecionado(projeto);
    setFotoAtual(0); // Sempre abre na primeira foto
  };

  const proximaFoto = (e) => {
    e.stopPropagation(); // Evita que o clique feche a janela
    if (projetoSelecionado?.galeria) {
      setFotoAtual((prev) => (prev === projetoSelecionado.galeria.length - 1 ? 0 : prev + 1));
    }
  };

  const fotoAnterior = (e) => {
    e.stopPropagation();
    if (projetoSelecionado?.galeria) {
      setFotoAtual((prev) => (prev === 0 ? projetoSelecionado.galeria.length - 1 : prev - 1));
    }
  };

  return (
    <section id="portfolio" className="p-6 lg:p-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projetos.map((p, i) => (
          <PortfolioItem key={p.id} projeto={p} index={i} onClick={abrirProjeto} />
        ))}
      </div>

      {/* JANELA DE DETALHES (MODAL COM GALERIA) */}
      <AnimatePresence>
        {projetoSelecionado && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm p-4 md:p-6 flex items-center justify-center overflow-y-auto"
            onClick={() => setProjetoSelecionado(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-sm relative"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* ÁREA DA IMAGEM E CONTROLES DA GALERIA */}
              <div className="relative h-72 md:h-full min-h-[300px] bg-gray-100 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={fotoAtual}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={projetoSelecionado.galeria ? projetoSelecionado.galeria[fotoAtual] : projetoSelecionado.imagem_capa} 
                      alt={`${projetoSelecionado.titulo} - Imagem ${fotoAtual + 1}`} 
                      fill 
                      className="object-cover" 
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Botões de Navegação (Só aparecem se houver mais de 1 foto) */}
                {projetoSelecionado.galeria && projetoSelecionado.galeria.length > 1 && (
                  <>
                    <button 
                      onClick={fotoAnterior}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md text-xs uppercase tracking-widest"
                    >
                      &#8592;
                    </button>
                    <button 
                      onClick={proximaFoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md text-xs uppercase tracking-widest"
                    >
                      &#8594;
                    </button>
                    {/* Contador de Imagens */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md tracking-widest">
                      {fotoAtual + 1} / {projetoSelecionado.galeria.length}
                    </div>
                  </>
                )}
              </div>

              {/* ÁREA DOS TEXTOS */}
              <div className="p-8 lg:p-12 text-black flex flex-col justify-center">
                <button onClick={() => setProjetoSelecionado(null)} className="absolute top-6 right-6 text-xs uppercase tracking-widest text-gray-400 hover:text-black z-10 bg-white p-2">Fechar [x]</button>
                <h2 className="text-3xl font-light mb-2 uppercase">{projetoSelecionado.titulo}</h2>
                <p className="text-gray-500 mb-8 uppercase tracking-widest text-xs">{projetoSelecionado.local}</p>
                
                <div className="space-y-4 text-sm border-t border-gray-100 pt-8">
                  <p><strong className="uppercase tracking-tighter text-gray-400 mr-2">Construtora:</strong> {projetoSelecionado.detalhes.construtora}</p>
                  <p><strong className="uppercase tracking-tighter text-gray-400 mr-2">Tipologia:</strong> {projetoSelecionado.detalhes.tipologia}</p>
                  <p><strong className="uppercase tracking-tighter text-gray-400 mr-2">Área:</strong> {projetoSelecionado.detalhes.area_construida}</p>
                  <p><strong className="uppercase tracking-tighter text-gray-400 mr-2">Unidades:</strong> {projetoSelecionado.detalhes.unidades}</p>
                  <p><strong className="uppercase tracking-tighter text-gray-400 mr-2">Extras:</strong> {projetoSelecionado.detalhes.configuracao}</p>
                  <p className="pt-4 text-gray-600 leading-relaxed font-light italic">"{projetoSelecionado.detalhes.descricao}"</p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
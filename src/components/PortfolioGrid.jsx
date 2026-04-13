"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import projetos from '../data/projetos.json';

// Ícones minimalistas de luxo (SVG puro, sem fundos)
const SetaEsquerda = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="1" viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-md" xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const SetaDireita = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="1" viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-md" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

function PortfolioItem({ projeto, index, onClick }) {
  return (
    <motion.div 
      // CURA DO SAFARI: 'animate' faz as imagens carregarem direto, sem depender de rolagem
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="relative aspect-[4/5] cursor-pointer group"
      onClick={() => onClick(projeto)}
    >
      <div className="w-full h-full relative overflow-hidden rounded-sm bg-gray-100">
        <Image 
          src={projeto.imagem_capa} 
          alt={projeto.titulo} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
          <h3 className="text-white text-xl font-medium uppercase tracking-wider">{projeto.titulo}</h3>
          <p className="text-gray-300 text-xs uppercase tracking-widest">{projeto.local}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioGrid() {
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [fotoAtual, setFotoAtual] = useState(0);

  const abrirProjeto = (projeto) => {
    setProjetoSelecionado(projeto);
    setFotoAtual(0);
    document.body.style.overflow = 'hidden'; 
  };

  const fecharProjeto = () => {
    setProjetoSelecionado(null);
    document.body.style.overflow = 'auto'; 
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
            <button 
              onClick={fecharProjeto}
              className="fixed top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 text-white w-10 h-10 flex items-center justify-center rounded-full transition-colors font-light"
            >
              ✕
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-6xl rounded-sm overflow-hidden flex flex-col md:flex-row min-h-max mt-12 md:mt-0 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full md:w-3/5 bg-black aspect-[4/5] md:aspect-auto md:min-h-[80vh] group">
                <AnimatePresence mode="wait">
                  <motion.div key={fotoAtual} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                    <Image 
                      src={projetoSelecionado.galeria ? projetoSelecionado.galeria[fotoAtual] : projetoSelecionado.imagem_capa} 
                      alt={projetoSelecionado.titulo} 
                      fill 
                      sizes="100vw"
                      className="object-cover" 
                    />
                  </motion.div>
                </AnimatePresence>

                {/* NOVO DESIGN DA GALERIA: Setas invisíveis até o hover, sem caixas brancas */}
                {projetoSelecionado.galeria && projetoSelecionado.galeria.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFotoAtual(prev => prev === 0 ? projetoSelecionado.galeria.length - 1 : prev - 1); }} 
                      className="text-white/60 hover:text-white transition-colors p-2"
                    >
                      <SetaEsquerda />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFotoAtual(prev => prev === projetoSelecionado.galeria.length - 1 ? 0 : prev + 1); }} 
                      className="text-white/60 hover:text-white transition-colors p-2"
                    >
                      <SetaDireita />
                    </button>
                  </div>
                )}
              </div>

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
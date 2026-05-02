"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import projetos from '../data/projetos.json';

const SetaEsquerda = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="1" viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-md" xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const SetaDireita = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="1" viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-md" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const FluidReveal = ({ children, delay = 0 }) => (
  <div className="relative inline-block w-fit">
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: ["inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)"] }}
      viewport={{ once: true }}
      transition={{ duration: 2, times: [0, 0.4, 0.6, 1], ease: "easeInOut", delay: delay }}
      className="text-black"
    >
      {children}
    </motion.div>
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0 0 100%)"] }}
      viewport={{ once: true }}
      transition={{ duration: 2, times: [0, 0.4, 0.6, 1], ease: "easeInOut", delay: delay }}
      className="absolute inset-0 bg-black text-white"
    >
      {children}
    </motion.div>
  </div>
);

// O Componente Inteligente de cada Foto
function PortfolioItem({ projeto, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: (index % 6) * 0.15 }}
      className="relative aspect-[4/5] cursor-pointer group overflow-hidden"
      onClick={() => onClick(projeto)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full relative overflow-hidden rounded-sm bg-[#0a0a0a]">
        
        {/* A IMAGEM: A mágica agora é feita pelo Tailwind (Colorida no mobile, PB no Desktop) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image 
            src={projeto.imagem_capa} 
            alt={projeto.titulo} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-1000 md:grayscale group-hover:grayscale-0 group-hover:scale-105" 
          />
        </div>

        {/* O DEGRADÊ ESCURO (Só aparece no desktop durante o hover) */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: isHovered ? 0.4 : 0 }}
          className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10"
        />

        {/* A CORTINA BRANCA (Desliza e some no desktop) */}
        <motion.div
          variants={{
            rest: { top: "100%", bottom: "0%" },
            hover: { 
              top: ["100%", "0%", "0%"], 
              bottom: ["0%", "0%", "100%"],
              transition: { duration: 0.9, times: [0, 0.4, 1], ease: [0.76, 0, 0.24, 1] }
            }
          }}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
          className="hidden md:block absolute inset-x-0 bg-white z-20"
        />

        {/* O TEXTO (Flutua ao final da cortina no Desktop) */}
        <motion.div
          animate={{ 
            y: isHovered ? 0 : 20, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.4, delay: isHovered ? 0.45 : 0, ease: "easeOut" }}
          className="hidden md:flex absolute bottom-0 left-0 right-0 p-8 flex-col justify-end z-30"
        >
          <h3 className="text-white text-2xl font-light uppercase tracking-widest mb-2">{projeto.titulo}</h3>
          <p className="text-gray-300 text-xs uppercase tracking-[0.2em]">{projeto.local}</p>
        </motion.div>

        {/* MOBILE (Rodapé estático, garantindo usabilidade rápida no celular) */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 bg-white p-6 z-30">
          <h3 className="text-black text-lg font-medium uppercase tracking-wider">{projeto.titulo}</h3>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">{projeto.local}</p>
        </div>

      </div>
    </motion.div>
  );
}

export default function PortfolioGrid() {
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [fotoAtual, setFotoAtual] = useState(0);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const projetosExibidos = mostrarTodos ? projetos : projetos.slice(0, 6);

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
    <section id="portfolio" className="p-6 lg:p-12 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4"
        >
          Obras e Projetos
        </motion.h2>
        <h3 className="text-3xl md:text-4xl font-light text-black flex justify-center">
          <FluidReveal delay={0.2}>Nosso Portfólio</FluidReveal>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projetosExibidos.map((p, i) => (
          <PortfolioItem key={p.id} projeto={p} index={i} onClick={abrirProjeto} />
        ))}
      </div>

      {!mostrarTodos && projetos.length > 6 && (
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => setMostrarTodos(true)}
            className="border border-black text-black px-12 py-4 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors duration-300"
          >
            Carregar Mais Projetos
          </button>
        </div>
      )}

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

                {projetoSelecionado.galeria && projetoSelecionado.galeria.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    <button onClick={(e) => { e.stopPropagation(); setFotoAtual(prev => prev === 0 ? projetoSelecionado.galeria.length - 1 : prev - 1); }} className="text-white/60 hover:text-white transition-colors p-2">
                      <SetaEsquerda />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setFotoAtual(prev => prev === projetoSelecionado.galeria.length - 1 ? 0 : prev + 1); }} className="text-white/60 hover:text-white transition-colors p-2">
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
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';

const FluidReveal = ({ children, delay = 0 }) => (
  <div className="relative inline-block w-fit">
    <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: ["inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)"] }} viewport={{ once: true }} transition={{ duration: 2, times: [0, 0.4, 0.6, 1], ease: "easeInOut", delay: delay }} className="text-black">{children}</motion.div>
    <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0 0 100%)"] }} viewport={{ once: true }} transition={{ duration: 2, times: [0, 0.4, 0.6, 1], ease: "easeInOut", delay: delay }} className="absolute inset-0 bg-black text-white">{children}</motion.div>
  </div>
);

export default function Viabilidade() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Estado para capturar a posição do mouse (inicia fora da tela para esconder a malha no load)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Função que atualiza as coordenadas do efeito lanterna
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <main className="min-h-screen flex flex-col relative bg-white selection:bg-black selection:text-white">
      <CustomCursor />

      <motion.nav 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 w-full z-50 flex justify-between items-center p-6 lg:px-12 bg-transparent text-black"
      >
        <Link href="/">
          <motion.div whileHover={{ opacity: 0.6 }} className="relative w-48 h-8 md:h-10 cursor-pointer transition-opacity">
            <Image src="/images/logo-texto.png" alt="Stangherlin" fill className="object-contain object-left invert" priority />
          </motion.div>
        </Link>
        <div className="space-x-8 text-sm uppercase tracking-wide hidden md:flex items-center text-black font-medium">
          <Link href="/#manifesto" className="hover:text-gray-500 transition">O Escritório</Link>
          <Link href="/#portfolio" className="hover:text-gray-500 transition">Obras</Link>
          <a href="https://app.stangherlin.arq.br" target="_blank" rel="noopener noreferrer" className="border border-black text-black px-6 py-2 hover:bg-black hover:text-white transition">Acessar App</a>
        </div>
      </motion.nav>

      {/* HERO COM EFEITO FLASHLIGHT INTERATIVO */}
      <section 
        className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden group"
        onMouseMove={handleMouseMove}
      >
        
        {/* O Motor de Cálculo */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-60"> {/* Opacidade aumentada para tornar a malha bem visível */}
          
          <motion.div 
            animate={{ backgroundPosition: ['0px 0px', '-40px -40px'] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 4 }}
            className="absolute inset-0 w-[200%] h-[200%] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]"
          />
          
          {/* Fallback para Mobile (fade normal estático) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_80%)] md:hidden"></div>
          
          {/* Efeito Lanterna para Desktop (O fundo branco cobre a malha, o cursor perfura o fundo) */}
          <div
            className="hidden md:block absolute inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, white 90%)`
            }}
          ></div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className="relative z-10 max-w-5xl pointer-events-none">
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 font-bold">Simulador Paramétrico</h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-tight">
            Não compre ilusões. <br />
            <span className="font-medium">Descubra o potencial construtivo real do seu terreno.</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Substitua suposições por dados matemáticos. O app calcula recuos, avanços e a viabilidade preliminar para você negociar aquisições e permutas com precisão técnica e transparência.
          </p>
          <a href="https://app.stangherlin.arq.br" target="_blank" rel="noopener noreferrer" className="inline-block bg-black text-white px-10 py-5 uppercase tracking-widest text-sm hover:bg-gray-800 transition duration-300 shadow-xl pointer-events-auto">
            Iniciar Simulação Gratuita
          </a>
        </motion.div>
      </section>

      <section className="bg-gray-50 text-black py-24 lg:py-32 px-6 lg:px-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <h3 className="text-3xl md:text-5xl font-light leading-snug text-gray-900">
              <FluidReveal delay={0.2}>O erro mais caro da</FluidReveal><br />
              <FluidReveal delay={0.4}><span className="font-medium">incorporação é o tempo.</span></FluidReveal>
            </h3>
          </div>
          <div className="lg:w-1/2">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-gray-500 text-lg font-light leading-relaxed">
              Semanas de espera por estudos manuais podem esfriar um bom negócio. Seja você um investidor avaliando a compra, um corretor estruturando uma grande permuta ou uma construtora buscando novas áreas, negociar sem a clareza exata das restrições do lote destrói a margem de lucro. Você precisa de respostas rápidas e confiáveis para não perder a oportunidade.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="bg-white text-black py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <h4 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-200 pb-4">Inteligência Construtiva</h4>
              <p className="text-gray-900 text-xl font-light leading-relaxed mb-6">Nosso cérebro matemático faz o trabalho pesado em instantes.</p>
              <p className="text-gray-500 font-light leading-relaxed">O App processa a legislação local, cruzando recuos e exigências de esquina para entregar uma análise preliminar com extrema precisão técnica. É a ferramenta definitiva para o mercado imobiliário filtrar oportunidades rapidamente, separando os terrenos inviáveis dos verdadeiramente promissores.</p>
            </motion.div>
          </div>
          <div className="bg-gray-50 p-10 border-l-4 border-black">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
              <h4 className="text-lg font-medium uppercase tracking-wider mb-4 text-black">Aviso Técnico</h4>
              <p className="text-gray-600 font-light leading-relaxed">O aplicativo entrega o limite matemático e legal do lote, mas é uma análise preliminar. Números brutos não constroem prédios. O software filtra o terreno, mas não substitui o refinamento comercial e a visão de um arquiteto habilitado para extrair o máximo VGV. O app te dá a segurança para fechar o negócio; nós te damos a visão para transformar essa área no projeto mais rentável possível.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-24 px-6 lg:px-12 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-light mb-10 leading-tight">Pare de adivinhar. <br /><span className="font-medium">Comece a calcular.</span></h2>
          <a href="https://app.stangherlin.arq.br" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black px-12 py-5 uppercase tracking-widest text-sm font-bold shadow-lg hover:scale-105 transition-transform">Acessar Plataforma Web</a>
        </motion.div>
      </section>

      <Footer />
      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={scrollToTop} className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white/40 backdrop-blur-md text-gray-500 shadow-sm hover:bg-white hover:text-black hover:border-gray-300 transition-all duration-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
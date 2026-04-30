"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioGrid from '../components/PortfolioGrid';
import Footer from '../components/Footer';
import InteractiveLogo from '../components/InteractiveLogo'; 

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen flex flex-col relative">
      
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 w-full z-50 flex justify-between items-center p-6 lg:px-12 bg-transparent text-white"
      >
        <InteractiveLogo />

        <div className="space-x-8 text-sm uppercase tracking-wide hidden md:block drop-shadow-md">
          <a href="#manifesto" className="hover:text-gray-300 transition">Manifesto</a>
          <a href="#portfolio" className="hover:text-gray-300 transition">Projetos</a>
          <a href="#viabilidade" className="hover:text-gray-300 transition">App</a>
        </div>
      </motion.nav>

      <section className="relative h-screen flex flex-col justify-center items-center text-center p-6 overflow-hidden">
        <Image 
          src="/images/portfolio/hero-bg.jpg" 
          alt="Stangherlin Arquitetura - Projetos de Alto Padrão"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center mt-16 w-full px-4"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-wide drop-shadow-lg">
            Arquitetura <span className="font-semibold">&</span> Inteligência Urbana
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 font-light drop-shadow-md">
            Projetos de alto padrão e análises estratégicas para maximização de potencial construtivo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center px-4">
            <a href="#portfolio" className="bg-white text-black px-8 py-4 uppercase tracking-widest text-sm hover:bg-gray-200 transition text-center w-full sm:w-auto">
              Ver Obras
            </a>
            <a href="#viabilidade" className="border border-white text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition text-center backdrop-blur-sm w-full sm:w-auto">
              Analisar Viabilidade
            </a>
          </div>
        </motion.div>
      </section>

      <section id="manifesto" className="bg-white text-black py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center lg:text-left"
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">O Manifesto Stangherlin</h2>
            <h3 className="text-3xl md:text-5xl font-light leading-snug md:leading-tight text-gray-900 max-w-4xl">
              A arquitetura não é apenas o desenho de um horizonte. <br className="hidden md:block"/>
              <span className="font-medium">É o motor financeiro de um empreendimento.</span>
            </h3>
            <p className="mt-8 text-gray-500 max-w-3xl text-lg font-light leading-relaxed">
              No mercado da construção civil, o amadorismo custa caro. Projetos desconexos, surpresas na execução e o desperdício de potencial construtivo são os maiores inimigos da rentabilidade. A Stangherlin nasceu para ser a solução definitiva contra a imprevisibilidade. Nós não desenhamos apenas edifícios; nós projetamos negócios altamente lucrativos, sólidos e escaláveis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h4 className="text-lg font-medium uppercase tracking-wider mb-3">A Engrenagem Perfeita</h4>
              <p className="text-gray-500 font-light leading-relaxed">Acreditamos que um projeto excepcional vai muito além da estética. Ele é uma obra de arte sustentada por uma engrenagem interna que funciona com precisão absoluta. Compatibilizamos cada disciplina e prevemos soluções antes que os problemas cheguem ao canteiro de obras. O resultado? Uma economia em escala gigantesca, velocidade na entrega e a eliminação de repasses de custos desnecessários.</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h4 className="text-lg font-medium uppercase tracking-wider mb-3">Estética de Resultados</h4>
              <p className="text-gray-500 font-light leading-relaxed">Para nós, a beleza tem um propósito e a estética é um investimento. Não acreditamos em modernismos vazios, como prédios futuristas ou fachadas verdes que trazem apenas custo e dor de cabeça futura. Cada traço do nosso design é calculado para agregar valor, gerar liquidez imediata e atrair o comprador final. Maximizamos o VGV do terreno sem perder um milímetro de conforto ou funcionalidade.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
              <h4 className="text-lg font-medium uppercase tracking-wider mb-3">Segurança e Escalabilidade</h4>
              <p className="text-gray-500 font-light leading-relaxed">O nosso compromisso inegociável é com a segurança jurídica e financeira do seu negócio. Entregamos projetos rigorosamente fundamentados nas legislações vigentes, garantindo aprovações ágeis junto aos órgãos competentes. Com a viabilidade técnica e financeira assegurada, sua construtora ganha a tração necessária para saltar e dominar um mercado altamente competitivo.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
              <h4 className="text-lg font-medium uppercase tracking-wider mb-3">O Teste do Tempo</h4>
              <p className="text-gray-500 font-light leading-relaxed">A verdadeira durabilidade não é um acaso; é o resultado da aplicação rigorosa de normas técnicas e do domínio da engenharia. Projetamos com o rigor da técnica e com linhas atemporais, garantindo que o seu empreendimento não apenas nasça forte, mas que envelheça com dignidade, mantendo seu valor ao longo das décadas.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <PortfolioGrid />

      <section id="viabilidade" className="bg-gray-900 text-white p-12 lg:p-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-light mb-6">Consulta de Viabilidade Urbanística</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg font-light">
            Desenvolvemos uma ferramenta exclusiva para análises rápidas de zoneamento e potencial construtivo. Tome decisões de investimento com precisão geométrica.
          </p>
          
          <a 
            href="https://app-viabilidade.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-12 py-5 uppercase tracking-widest text-sm font-bold shadow-[0px_0px_15px_rgba(255,255,255,0.25)] hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
          >
            Acessar Plataforma Web
          </a>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white/40 backdrop-blur-md text-gray-500 shadow-sm hover:bg-white hover:text-black hover:border-gray-300 transition-all duration-500"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
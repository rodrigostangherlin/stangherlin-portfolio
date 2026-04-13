"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PortfolioGrid from '../components/PortfolioGrid';
import Footer from '../components/Footer';
import InteractiveLogo from '../components/InteractiveLogo'; 

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      
      {/* Navegação Minimalista */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 w-full z-50 flex justify-between items-center p-6 lg:px-12 bg-transparent text-white"
      >
        <InteractiveLogo />

        <div className="space-x-8 text-sm uppercase tracking-wide hidden md:block drop-shadow-md">
          <a href="#portfolio" className="hover:text-gray-300 transition">Projetos</a>
          <a href="#viabilidade" className="hover:text-gray-300 transition">App de Viabilidade</a>
          <a href="#contato" className="hover:text-gray-300 transition">Contato</a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center p-6 overflow-hidden">
        <Image 
          src="/images/portfolio/hero-bg.jpg" 
          alt="Stangherlin Arquitetura - Projetos de Alto Padrão"
          fill
          priority
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

      {/* Grid de Portfólio com TILT e profundidade */}
      <PortfolioGrid />

      {/* Chamada para Viabilidade com Botão de Alto Impacto */}
      {/* CORREÇÃO SAFARI: Removido o 'overflow-hidden' desta section */}
      <section id="viabilidade" className="bg-gray-900 text-white p-12 lg:p-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} /* CORREÇÃO SAFARI: Ajuste de gatilho */
          transition={{ duration: 0.8 }}
        >
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
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
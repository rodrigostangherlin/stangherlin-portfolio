import React from 'react';

export default function Footer() {
  return (
    <footer id="contato" className="bg-white border-t border-gray-100 p-12 flex flex-col items-center text-center">
      
      {/* Links de Contato e Redes */}
      <div className="flex space-x-6 md:space-x-8 mb-6 text-xs font-semibold tracking-widest uppercase text-gray-500">
        <a 
          href="https://www.instagram.com/stangherlin.arquitetura/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-black transition-colors duration-300"
        >
          Instagram
        </a>
        
        <a 
          href="https://api.whatsapp.com/send/?phone=554792106396&text&type=phone_number&app_absent=0" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-black transition-colors duration-300"
        >
          WhatsApp
        </a>

        {/* Link de E-mail Corrigido com o prefixo mailto: */}
        <a 
          href="mailto:stangherlin.arquitetura@gmail.com" 
          className="hover:text-black transition-colors duration-300"
        >
          E-mail
        </a>

        <a 
          href="https://sites.google.com/view/stangherlin-arquitetura/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-black transition-colors duration-300 hidden sm:inline"
        >
          Site Alternativo
        </a>
      </div>

      {/* Bases de Operação Atualizadas */}
      <div className="mb-10 text-xs font-light tracking-widest uppercase text-gray-400">
        São Paulo, SP <span className="mx-2 opacity-50">|</span> Porto Belo, SC <span className="mx-2 opacity-50">|</span> Itapema, SC
      </div>

      {/* Direitos Autorais e Versículo */}
      <div className="text-xs text-gray-500 font-light flex flex-col items-center space-y-4">
        <p>© {new Date().getFullYear()} Stangherlin Arquitetura. Todos os direitos reservados.</p>
        
        <p className="italic max-w-md">
          "Se o Senhor não edificar a casa, em vão trabalham os que a edificam." – Salmos 127:1
        </p>
      </div>

    </footer>
  );
}
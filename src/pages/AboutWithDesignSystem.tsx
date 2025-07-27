/**
 * VERSÃO MELHORADA DA PÁGINA ABOUT
 * 
 * Esta versão demonstra como usar o design system
 * mantendo toda a funcionalidade existente.
 */

import { PageTitle, Section } from '../design-system';
import NotificationTest from '../components/NotificationTest/NotificationTest';
import './About.css';

const About = () => {
  return (
    <div className="about-container sv-fade-in">
      
      {/* PageTitle unificado com o novo design system */}
      <PageTitle 
        title="Sobre o SuperVia App" 
        subtitle="Aplicativo para cálculos de tinta e consumo de veículos"
        icon="ℹ️"
      />

      {/* Section sobre o aplicativo */}
      <Section 
        title="Sobre o Aplicativo" 
        variant="card" 
        icon="📱"
        className="sv-mb-6"
      >
        <div className="sv-text-base sv-leading-relaxed">
          <p className="sv-mb-4">
            O <strong className="sv-text-primary">SuperVia App</strong> é um aplicativo web progressivo (PWA) 
            desenvolvido para facilitar cálculos relacionados a:
          </p>
          <ul className="sv-pl-6 sv-mb-4 sv-space-y-2">
            <li className="sv-list-disc">🎨 <strong>Cálculo de Tinta para Esferas</strong> - Calcule a quantidade exata de tinta necessária</li>
            <li className="sv-list-disc">⛽ <strong>Cálculo de Consumo</strong> - Monitore o consumo do seu veículo</li>
          </ul>
          <p>
            Desenvolvido com tecnologias modernas como React, TypeScript e Tailwind CSS, 
            oferece uma experiência rápida e responsiva em qualquer dispositivo.
          </p>
        </div>
      </Section>

      {/* Section de recursos técnicos */}
      <Section 
        title="Recursos Técnicos" 
        variant="calculation" 
        icon="⚙️"
        className="sv-mb-6"
      >
        <div className="sv-grid sv-grid--2 sv-grid--gap-md">
          <div className="sv-p-4 sv-bg-white sv-rounded-lg sv-shadow-sm sv-border">
            <h4 className="sv-font-bold sv-text-primary sv-mb-2">📱 PWA</h4>
            <p className="sv-text-sm">Progressive Web App com suporte offline e instalação no dispositivo</p>
          </div>
          <div className="sv-p-4 sv-bg-white sv-rounded-lg sv-shadow-sm sv-border">
            <h4 className="sv-font-bold sv-text-primary sv-mb-2">🔄 Auto-Update</h4>
            <p className="sv-text-sm">Sistema de atualização automática com notificações</p>
          </div>
          <div className="sv-p-4 sv-bg-white sv-rounded-lg sv-shadow-sm sv-border">
            <h4 className="sv-font-bold sv-text-primary sv-mb-2">📊 Cálculos Precisos</h4>
            <p className="sv-text-sm">Algoritmos otimizados para cálculos rápidos e precisos</p>
          </div>
          <div className="sv-p-4 sv-bg-white sv-rounded-lg sv-shadow-sm sv-border">
            <h4 className="sv-font-bold sv-text-primary sv-mb-2">💾 Armazenamento Local</h4>
            <p className="sv-text-sm">Dados salvos localmente para acesso rápido</p>
          </div>
        </div>
      </Section>

      {/* Section de tecnologias */}
      <Section 
        title="Tecnologias Utilizadas" 
        variant="card" 
        icon="🛠️"
        className="sv-mb-6"
      >
        <div className="sv-grid sv-grid--responsive sv-grid--gap-sm">
          <div className="sv-text-center sv-p-3 sv-bg-blue-50 sv-rounded-lg">
            <div className="sv-text-2xl sv-mb-1">⚛️</div>
            <div className="sv-font-semibold sv-text-blue-700">React 18</div>
          </div>
          <div className="sv-text-center sv-p-3 sv-bg-blue-50 sv-rounded-lg">
            <div className="sv-text-2xl sv-mb-1">📘</div>
            <div className="sv-font-semibold sv-text-blue-700">TypeScript</div>
          </div>
          <div className="sv-text-center sv-p-3 sv-bg-green-50 sv-rounded-lg">
            <div className="sv-text-2xl sv-mb-1">⚡</div>
            <div className="sv-font-semibold sv-text-green-700">Vite</div>
          </div>
          <div className="sv-text-center sv-p-3 sv-bg-cyan-50 sv-rounded-lg">
            <div className="sv-text-2xl sv-mb-1">🎨</div>
            <div className="sv-font-semibold sv-text-cyan-700">Tailwind CSS</div>
          </div>
        </div>
      </Section>

      {/* Section de teste de notificações (preserva funcionalidade existente) */}
      <Section 
        title="Teste de Notificações" 
        variant="calculation" 
        icon="🔔"
        className="sv-mb-6"
      >
        <p className="sv-text-sm sv-text-gray-600 sv-mb-4">
          Use esta seção para testar as notificações push do aplicativo:
        </p>
        <NotificationTest />
      </Section>

      {/* Section sobre o desenvolvedor */}
      <Section 
        title="Desenvolvedor" 
        variant="card" 
        icon="👨‍💻"
        className="sv-mb-6"
      >
        <div className="sv-text-center">
          <div className="sv-mb-4">
            <div className="sv-text-4xl sv-mb-2">🚀</div>
            <h4 className="sv-text-xl sv-font-bold sv-text-primary">Desenvolvido com ❤️</h4>
          </div>
          <p className="sv-text-base sv-text-gray-700">
            Este aplicativo foi desenvolvido como uma ferramenta prática 
            para facilitar cálculos do dia a dia, sempre buscando 
            simplicidade e eficiência.
          </p>
        </div>
      </Section>

      {/* Section de versão */}
      <Section 
        title="Informações da Versão" 
        variant="result" 
        icon="📋"
      >
        <div className="sv-text-center">
          <p className="sv-font-semibold sv-text-lg sv-text-primary sv-mb-2">
            SuperVia App v2.0
          </p>
          <p className="sv-text-sm sv-text-gray-600">
            Última atualização: Janeiro 2024
          </p>
          <div className="sv-mt-4 sv-text-xs sv-text-gray-500">
            <p>Build com React + TypeScript + Vite</p>
            <p>Progressive Web App (PWA) Ready</p>
          </div>
        </div>
      </Section>

    </div>
  );
};

export default About;

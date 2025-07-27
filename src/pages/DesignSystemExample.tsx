/**
 * EXEMPLO - PÁGINA USANDO DESIGN SYSTEM
 * 
 * Esta é uma demonstração de como usar o novo design system
 * mantendo total compatibilidade com o código existente.
 */

import { PageTitle, Section } from '../design-system';
import { PageTitle as LegacyPageTitle } from '../components/PageTitle';

export function DesignSystemExample() {
  return (
    <div className="sv-container">
      {/* PageTitle padronizado */}
      <PageTitle title="DESIGN SYSTEM EXEMPLO" />

      {/* Comparação com estilo legacy (preservado) */}
      <Section title="Comparação de Estilos" variant="calculation" icon="⚖️">
        <div className="sv-grid sv-grid--2 sv-grid--gap-lg">
          <div>
            <h4 className="sv-text-lg sv-font-semibold sv-mb-2">Novo Design System:</h4>
            <PageTitle 
              title="Título Moderno"
              subtitle="Com subtitle e ícone"
              icon="✨"
            />
          </div>
          <div>
            <h4 className="sv-text-lg sv-font-semibold sv-mb-2">Estilo Legacy (preservado):</h4>
            <LegacyPageTitle title="Título Legacy" />
          </div>
        </div>
      </Section>

      {/* Demonstração de Sections com diferentes variantes */}
      <Section title="Variantes de Section" variant="card" icon="📦">
        <div 
          className="sv-grid sv-grid--responsive" 
          style={
            {
              '--grid-mobile': '1',
              '--grid-tablet': '2', 
              '--grid-desktop': '3'
            } as React.CSSProperties
          }
        >
          
          <Section variant="primeiro-quadro" title="Primeiro Quadro" icon="1️⃣">
            <p>Este preserva exatamente o estilo do primeiro quadro atual.</p>
          </Section>

          <Section variant="segundo-quadro" title="Segundo Quadro" icon="2️⃣">
            <p>Transparente em desktop, com fundo em mobile/tablet (como atual).</p>
          </Section>

          <Section variant="terceiro-quadro" title="Terceiro Quadro" icon="3️⃣">
            <p>Preserva o estilo do terceiro quadro atual.</p>
          </Section>

        </div>
      </Section>

      {/* Demonstração de Section com collapse */}
      <Section 
        title="Section Colapsável" 
        variant="calculation" 
        icon="📁"
        collapsible={true}
      >
        <p>Este conteúdo pode ser colapsado e expandido.</p>
        <p>Útil para organizar melhor informações complexas.</p>
      </Section>

      {/* Demonstração de Section de resultado */}
      <Section title="Section de Resultado" variant="result" icon="📊">
        <div className="sv-text-center">
          <p className="sv-text-lg sv-font-semibold sv-text-primary">
            Resultado: 42
          </p>
          <p className="sv-text-sm sv-text-gray-600">
            Este é um exemplo de section de resultado com estilo destacado.
          </p>
        </div>
      </Section>

      {/* Demonstração de classes utilitárias */}
      <Section title="Classes Utilitárias" variant="card" icon="🛠️">
        <div className="sv-grid sv-grid--2 sv-grid--gap-md">
          <div className="sv-p-4 sv-bg-primary sv-rounded-lg sv-text-center">
            <span className="sv-font-bold">Background Primário</span>
          </div>
          <div className="sv-p-4 sv-border sv-border-primary sv-rounded-lg sv-text-center sv-hover-lift">
            <span className="sv-font-bold sv-text-primary">Hover Lift Effect</span>
          </div>
        </div>
        
        <div className="sv-mt-4">
          <p className="sv-text-lg sv-font-semibold sv-text-success">Texto de Sucesso</p>
          <p className="sv-text-base sv-text-error">Texto de Erro</p>
          <p className="sv-text-sm sv-text-info">Texto de Informação</p>
        </div>
      </Section>

      {/* Nota sobre compatibilidade */}
      <Section variant="transparent" className="sv-mt-8">
        <div className="sv-p-6 sv-bg-white sv-rounded-lg sv-shadow-lg sv-border sv-border-primary">
          <h3 className="sv-text-xl sv-font-bold sv-text-primary sv-mb-4">
            ✅ Total Compatibilidade Preservada
          </h3>
          <div className="sv-text-sm sv-text-gray-700">
            <p className="sv-mb-2">• Todos os estilos existentes continuam funcionando</p>
            <p className="sv-mb-2">• PageTitle antigo ainda funciona (src/components/PageTitle.tsx)</p>
            <p className="sv-mb-2">• Quadros antigos ainda funcionam (.primeiroQuadro, .segundoQuadro, etc.)</p>
            <p className="sv-mb-2">• CSS existente não foi modificado</p>
            <p>• Novo sistema é opcional e incremental</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

import NotificationTest from "../components/NotificationTest/NotificationTest";
import { PageTitle, Section } from "../design-system";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

export function Component() {
  return (
    <div className="sv-container sv-fade-in">
      <PageTitle title="SOBRE O SUPERVIA APP" />

      {/* Informações principais do app */}
      <Section 
        title="Informações do Aplicativo" 
        variant="card" 
        icon="📱"
        className="sv-mb-6"
      >
        <div className="sv-space-y-4">
          <div>
            <h4 className="sv-font-bold sv-text-primary sv-mb-2">🎯 Funcionalidades</h4>
            <ul className="sv-text-sm sv-space-y-1">
              <li>• Cálculo de Pintura Automática</li>
              <li>• Cálculo de Consumo de Materiais</li>
              <li>• Geração de Levantamentos</li>
              <li>• Compartilhamento de Resultados</li>
            </ul>
          </div>
          
          <div>
            <h4 className="sv-font-bold sv-text-primary sv-mb-2">⚙️ Tecnologias</h4>
            <p className="sv-text-sm">React + TypeScript + Vite + PWA</p>
          </div>

          <div className="sv-mt-4 sv-p-4 sv-bg-primary sv-rounded-lg sv-text-center">
            <span className="sv-font-bold">🎨 Design System Unificado</span>
            <p className="sv-text-sm sv-mt-2">Interface padronizada em todas as páginas</p>
          </div>
        </div>
      </Section>
      
      {/* Teste de notificações */}
      <Section 
        title="Teste de Notificações Push" 
        variant="calculation" 
        icon="🔔"
        className="sv-mb-6"
      >
        <p className="sv-text-sm sv-text-gray-600 sv-mb-4">
          Use esta seção para testar as notificações push do aplicativo:
        </p>
        <NotificationTest />
      </Section>

      {/* Status da migração */}
      <Section 
        title="Status da Migração" 
        variant="result" 
        icon="✅"
      >
        <div className="sv-grid sv-grid-cols-1 md:sv-grid-cols-2 sv-gap-4">
          <div className="sv-p-4 sv-border sv-border-success sv-rounded-lg">
            <h4 className="sv-font-bold sv-text-success sv-mb-2">✅ Páginas Migradas</h4>
            <ul className="sv-text-sm sv-space-y-1">
              <li>• Home - 100%</li>
              <li>• CalcTintaEsfera - 100%</li>
              <li>• CalcConsumo - 100%</li>
              <li>• About - 100%</li>
            </ul>
          </div>
          <div className="sv-p-4 sv-border sv-border-primary sv-rounded-lg">
            <h4 className="sv-font-bold sv-text-primary sv-mb-2">🎨 Componentes Ativos</h4>
            <ul className="sv-text-sm sv-space-y-1">
              <li>• CalculationSection</li>
              <li>• SVInputField & SVSelectField</li>
              <li>• ResponsiveCalculationLayout</li>
              <li>• PageTitle & Section</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}

Component.displayName = "AboutPage";
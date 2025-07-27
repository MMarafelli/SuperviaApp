import { useLoaderData } from "react-router-dom";
import NotificationTest from "../components/NotificationTest/NotificationTest";
import { PageTitle, Section } from "../design-system";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

export function Component() {
  const data = useLoaderData() as string;

  return (
    <div className="sv-container sv-fade-in">
      {/* PageTitle seguindo o padrão: maiúsculas com sublinhado amarelo */}
      <PageTitle title="SOBRE O SUPERVIA APP" />

      {/* ANTES: <p className="mb-6">{data}</p> */}
      {/* DEPOIS: Section organizada */}
      <Section 
        title="Informações do Sistema" 
        variant="card" 
        icon="📋"
        className="sv-mb-6"
      >
        <p className="sv-text-base">{data}</p>
        <div className="sv-mt-4 sv-p-4 sv-bg-primary sv-rounded-lg sv-text-center">
          <span className="sv-font-bold">🎨 Design System Ativo!</span>
          <p className="sv-text-sm sv-mt-2">Esta página agora usa o design system unificado</p>
        </div>
      </Section>
      
      {/* ANTES: <div className="mb-6"><h3>Teste de Notificações</h3>... */}
      {/* DEPOIS: Section padronizada */}
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

      {/* NOVA: Section demonstrando recursos do design system */}
      <Section 
        title="Recursos do Design System" 
        variant="result" 
        icon="✨"
      >
        <div className="sv-grid sv-grid--2 sv-grid--gap-md">
          <div className="sv-p-4 sv-border sv-border-primary sv-rounded-lg sv-hover-lift">
            <h4 className="sv-font-bold sv-text-primary sv-mb-2">🎯 Padronização</h4>
            <p className="sv-text-sm">Componentes uniformes em todas as páginas</p>
          </div>
          <div className="sv-p-4 sv-border sv-border-primary sv-rounded-lg sv-hover-lift">
            <h4 className="sv-font-bold sv-text-primary sv-mb-2">🔧 Facilidade</h4>
            <p className="sv-text-sm">Uma importação, todos os componentes</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

Component.displayName = "AboutPage";
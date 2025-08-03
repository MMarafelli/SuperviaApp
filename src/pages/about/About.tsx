/**
 * PÁGINA ABOUT - CRIADA DO ZERO
 * 
 * Página "Sobre" seguindo todos os padrões do projeto:
 * - Design system unificado (PageTitle, Section)
 * - CSS Modules para estilos específicos
 * - Tokens de design (--sv-*)
 * - Layout responsivo
 * - Sem Tailwind (conforme solicitado)
 * - Sem !important 
 * - Sem duplicidades ou sobreposições
 */

import { memo } from 'react';
import { PageTitle, Section } from '../../design-system';
import styles from './About.module.css';

export async function loader() {
  // Simula carregamento da página
  await new Promise((resolve) => setTimeout(resolve, 300));
  return "About page loaded successfully";
}

export const Component = memo(() => {
  const appVersion = '1.0.0';
  const buildDate = new Date().toLocaleDateString('pt-BR');

  return (
    <div className={`sv-calc-container ${styles.aboutContainer}`}>
      <PageTitle title="Sobre o SuperVia App" />
      
      {/* Seção: Informações do App */}
      <Section variant="calculation" className={styles.infoSection}>
        <div className={styles.appInfo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoPlaceholder}>📱</div>
          </div>
          <div className={styles.appDetails}>
            <h2 className={styles.appName}>SuperVia App</h2>
            <p className={styles.appDescription}>
              Aplicativo Progressive Web App (PWA) para cálculos de pintura automática 
              e consumo de materiais em estradas.
            </p>
            <div className={styles.versionInfo}>
              <span className={styles.version}>Versão: {appVersion}</span>
              <span className={styles.buildDate}>Build: {buildDate}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Seção: Funcionalidades */}
      <Section variant="calculation" className={styles.featuresSection}>
        <h3 className={styles.sectionTitle}>Funcionalidades</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏠</div>
            <h4 className={styles.featureTitle}>Home</h4>
            <p className={styles.featureDescription}>
              Página inicial com histórico de cálculos salvos
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h4 className={styles.featureTitle}>Pintura Automática</h4>
            <p className={styles.featureDescription}>
              Cálculo de tinta e esferas para sinalização viária
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h4 className={styles.featureTitle}>Cálculos</h4>
            <p className={styles.featureDescription}>
              Diversos tipos de cálculos para consumo de materiais
            </p>
          </div>
        </div>
      </Section>

      {/* Seção: Tecnologias */}
      <Section variant="calculation" className={styles.techSection}>
        <h3 className={styles.sectionTitle}>Tecnologias Utilizadas</h3>
        <div className={styles.techList}>
          <div className={styles.techItem}>
            <span className={styles.techName}>React</span>
            <span className={styles.techDescription}>Framework principal</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techName}>TypeScript</span>
            <span className={styles.techDescription}>Tipagem estática</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techName}>Vite</span>
            <span className={styles.techDescription}>Build tool e dev server</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techName}>PWA</span>
            <span className={styles.techDescription}>Progressive Web App</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techName}>Service Worker</span>
            <span className={styles.techDescription}>Cache e funcionalidade offline</span>
          </div>
        </div>
      </Section>

      {/* Seção: Informações de Desenvolvimento */}
      <Section variant="calculation" className={styles.devSection}>
        <h3 className={styles.sectionTitle}>Desenvolvimento</h3>
        <div className={styles.devInfo}>
          <div className={styles.devItem}>
            <strong>Design System:</strong>
            <span>Sistema unificado de componentes e tokens de design</span>
          </div>
          <div className={styles.devItem}>
            <strong>Responsividade:</strong>
            <span>Otimizado para desktop e dispositivos móveis</span>
          </div>
          <div className={styles.devItem}>
            <strong>Performance:</strong>
            <span>Lazy loading, code splitting e otimizações</span>
          </div>
          <div className={styles.devItem}>
            <strong>Offline First:</strong>
            <span>Funciona sem conexão com internet</span>
          </div>
        </div>
      </Section>

      {/* Seção: Recursos PWA */}
      <Section variant="calculation" className={styles.pwaSection}>
        <h3 className={styles.sectionTitle}>Recursos PWA</h3>
        <div className={styles.pwaFeatures}>
          <div className={styles.pwaFeature}>
            <div className={styles.pwaIcon}>📱</div>
            <div className={styles.pwaContent}>
              <h4>Instalável</h4>
              <p>Pode ser instalado como um app nativo</p>
            </div>
          </div>
          <div className={styles.pwaFeature}>
            <div className={styles.pwaIcon}>🔄</div>
            <div className={styles.pwaContent}>
              <h4>Atualizações Automáticas</h4>
              <p>Sistema de cache inteligente e atualizações</p>
            </div>
          </div>
          <div className={styles.pwaFeature}>
            <div className={styles.pwaIcon}>💾</div>
            <div className={styles.pwaContent}>
              <h4>Armazenamento Local</h4>
              <p>Dados salvos localmente no dispositivo</p>
            </div>
          </div>
          <div className={styles.pwaFeature}>
            <div className={styles.pwaIcon}>📡</div>
            <div className={styles.pwaContent}>
              <h4>Funciona Offline</h4>
              <p>Continue usando mesmo sem internet</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
});

Component.displayName = 'AboutPage';

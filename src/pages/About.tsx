import NotificationTest from "../components/NotificationTest/NotificationTest";
import { PageTitle } from "../design-system";
import { CalculationSection } from "../components/calculation/CalculationComponents";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "I came from the About.tsx loader function!";
}

export function Component() {
  return (
    <div className="sv-container sv-fade-in">
      <PageTitle title="SOBRE O SUPERVIA APP" />
      
      <div className="calc-tinta-container">
        
        {/* Hero Section */}
        <CalculationSection title="">
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-4">
                <span className="text-3xl">🏗️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">SuperVia App</h2>
              <p className="text-gray-600 text-lg">Engenharia & Sinalização</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed">
                Aplicativo especializado para cálculos de pintura rodoviária e consumo de materiais, 
                desenvolvido para profissionais da área de sinalização viária e engenharia.
              </p>
            </div>
          </div>
        </CalculationSection>

        {/* Estatísticas do App */}
        <CalculationSection title="📊 Estatísticas do Aplicativo">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">100%</div>
              <div className="text-sm text-green-600">PWA Completo</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">4</div>
              <div className="text-sm text-blue-600">Funcionalidades</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">3</div>
              <div className="text-sm text-purple-600">Tecnologias</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-700">Mobile</div>
              <div className="text-sm text-yellow-600">Responsivo</div>
            </div>
          </div>
        </CalculationSection>

        {/* Funcionalidades Principais */}
        <CalculationSection title="🎯 Funcionalidades Principais">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <div>
                <h4 className="font-bold text-blue-800 mb-2">Cálculo de Pintura Automática</h4>
                <p className="text-sm text-blue-700">
                  Calcule automaticamente a quantidade de tinta necessária para sinalização viária
                  com base nas dimensões da pista.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <h4 className="font-bold text-green-800 mb-2">Consumo de Materiais</h4>
                <p className="text-sm text-green-700">
                  Determine o consumo preciso de esferas de vidro e tinta para seus projetos
                  de sinalização.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📋</span>
              </div>
              <div>
                <h4 className="font-bold text-purple-800 mb-2">Geração de Levantamentos</h4>
                <p className="text-sm text-purple-700">
                  Crie relatórios detalhados dos cálculos realizados para documentação
                  de projetos.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📤</span>
              </div>
              <div>
                <h4 className="font-bold text-orange-800 mb-2">Compartilhamento</h4>
                <p className="text-sm text-orange-700">
                  Compartilhe facilmente os resultados dos cálculos com sua equipe
                  ou clientes.
                </p>
              </div>
            </div>
          </div>
        </CalculationSection>

        {/* Stack Tecnológico */}
        <CalculationSection title="⚙️ Stack Tecnológico">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">R</span>
              </div>
              <h4 className="font-bold text-cyan-800 mb-2">React 18</h4>
              <p className="text-sm text-cyan-700">Interface moderna e reativa com hooks</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">TS</span>
              </div>
              <h4 className="font-bold text-blue-800 mb-2">TypeScript</h4>
              <p className="text-sm text-blue-700">Código tipado e mais seguro</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">V</span>
              </div>
              <h4 className="font-bold text-purple-800 mb-2">Vite</h4>
              <p className="text-sm text-purple-700">Build rápido e desenvolvimento ágil</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">📱</span>
              <h4 className="font-bold text-indigo-800">Progressive Web App (PWA)</h4>
            </div>
            <p className="text-center text-sm text-indigo-700">
              Funciona offline, instalável no dispositivo e com notificações push
            </p>
          </div>
        </CalculationSection>
        
        {/* Recursos PWA */}
        <CalculationSection title="📱 Recursos do Progressive Web App">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h5 className="font-semibold text-green-800">Modo Offline</h5>
                  <p className="text-sm text-green-600">Funciona sem conexão com internet</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-800">Instalação</h5>
                  <p className="text-sm text-blue-600">Instale como app nativo no seu dispositivo</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-800">Notificações Push</h5>
                  <p className="text-sm text-purple-600">Receba atualizações importantes</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h5 className="font-semibold text-orange-800">Responsivo</h5>
                  <p className="text-sm text-orange-600">Funciona em qualquer dispositivo</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h5 className="font-semibold text-indigo-800">Cache Inteligente</h5>
                  <p className="text-sm text-indigo-600">Carregamento rápido e eficiente</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h5 className="font-semibold text-teal-800">Auto-Atualização</h5>
                  <p className="text-sm text-teal-600">Sempre na versão mais recente</p>
                </div>
              </div>
            </div>
          </div>
        </CalculationSection>

        {/* Teste de Notificações com design melhorado */}
        <CalculationSection title="🔔 Centro de Notificações">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">🔔</span>
              </div>
              <div>
                <h4 className="font-bold text-yellow-800">Teste as Notificações Push</h4>
                <p className="text-sm text-yellow-700">Experimente o sistema de notificações do aplicativo</p>
              </div>
            </div>
            <NotificationTest />
          </div>
        </CalculationSection>

        {/* Status com Design Melhorado */}
        <CalculationSection title="🚀 Status do Projeto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Desenvolvimento Geral</span>
              <span className="text-sm font-bold text-green-600">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{width: '100%'}}></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 flex items-center">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs">✓</span>
                </span>
                Páginas Implementadas
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-800">🏠 Home</span>
                  <span className="text-green-600 font-bold">100%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-800">🎨 Pintura Automática</span>
                  <span className="text-green-600 font-bold">100%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-800">📊 Cálculo de Consumo</span>
                  <span className="text-green-600 font-bold">100%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-800">ℹ️ Sobre</span>
                  <span className="text-green-600 font-bold">100%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 flex items-center">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs">⚡</span>
                </span>
                Componentes Ativos
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-800">CalculationSection</div>
                  <div className="text-sm text-blue-600">Sistema de seções unificado</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-800">SVInputField & SVSelectField</div>
                  <div className="text-sm text-blue-600">Campos de entrada padronizados</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-800">ResponsiveCalculationLayout</div>
                  <div className="text-sm text-blue-600">Layout responsivo para cálculos</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-800">Design System</div>
                  <div className="text-sm text-blue-600">Sistema de design unificado</div>
                </div>
              </div>
            </div>
          </div>
        </CalculationSection>

        {/* Footer da página */}
        <CalculationSection title="">
          <div className="text-center py-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="mb-4">
              <span className="text-2xl mb-2 block">🏗️</span>
              <h3 className="font-bold text-gray-800 mb-2">SuperVia App</h3>
              <p className="text-gray-600 text-sm">Versão 1.0.0 - Agosto 2025</p>
            </div>
            <div className="text-xs text-gray-500">
              Desenvolvido para profissionais de engenharia e sinalização viária
            </div>
          </div>
        </CalculationSection>
      </div>
    </div>
  );
}

Component.displayName = "AboutPage";
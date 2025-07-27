# SuperVia Design System

Este design system unifica e padroniza todos os estilos do SuperViaApp mantendo **100% de compatibilidade** com o código existente.

## 🎯 Objetivos Atingidos

- ✅ **Padronização**: Componentes unificados para títulos e sections
- ✅ **Compatibilidade**: Todo código existente continua funcionando
- ✅ **Flexibilidade**: Sistema de variantes para diferentes contextos
- ✅ **Escalabilidade**: Tokens centralizados facilitam mudanças futuras
- ✅ **Responsividade**: Grid system e utilitários responsivos

## 📁 Estrutura

```
src/design-system/
├── tokens/           # Design tokens (cores, espaçamentos, etc.)
├── components/       # Componentes base unificados
├── styles/          # CSS global e tokens
└── index.ts         # Exports centralizados
```

## 🚀 Como Usar

### Importação Simples
```tsx
import { PageTitle, Section } from '../design-system';
```

### PageTitle Unificado
```tsx
// Substitui os 3 PageTitle diferentes por um só
<PageTitle 
  title="Minha Página"
  subtitle="Descrição opcional"
  icon="🎯"
/>
```

### Section com Variantes
```tsx
// Preserva exatamente o estilo dos quadros existentes
<Section variant="primeiro-quadro" title="Dados" icon="📊">
  <p>Conteúdo...</p>
</Section>

<Section variant="segundo-quadro" title="Cálculos" icon="🧮">
  <p>Conteúdo...</p>
</Section>

// Ou usa novos estilos
<Section variant="calculation" title="Resultado" icon="📈">
  <p>Conteúdo...</p>
</Section>
```

## 🎨 Variantes Disponíveis

### PageTitle
- `default`: Estilo padrão moderno
- `legacy`: Preserva estilo antigo exato
- `modern`: Estilo com gradiente e efeitos

### Section
- `primeiro-quadro`: Preserva estilo do primeiro quadro atual
- `segundo-quadro`: Preserva estilo do segundo quadro atual  
- `terceiro-quadro`: Preserva estilo do terceiro quadro atual
- `card`: Card moderno com sombra
- `calculation`: Para sections de cálculo
- `result`: Para exibir resultados destacados
- `transparent`: Sem background

## 🛠️ Classes Utilitárias

### Cores
```css
.sv-text-primary     /* Cor primária SuperVia */
.sv-bg-primary       /* Background primário */
.sv-text-success     /* Verde para sucessos */
.sv-text-error       /* Vermelho para erros */
.sv-text-info        /* Azul para informações */
```

### Espaçamentos
```css
.sv-p-{size}         /* Padding: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl */
.sv-m-{size}         /* Margin: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl */
.sv-gap-{size}       /* Gap para flex/grid */
```

### Grid System
```css
.sv-grid             /* Display grid básico */
.sv-grid--2          /* 2 colunas */
.sv-grid--3          /* 3 colunas */
.sv-grid--4          /* 4 colunas */
.sv-grid--responsive /* Responsivo com CSS vars */
```

### Efeitos
```css
.sv-hover-lift       /* Efeito lift no hover */
.sv-fade-in          /* Animação fade in */
.sv-slide-in-up      /* Animação slide up */
```

## 🔄 Migração Gradual

### Fase 1: Componentes Novos (✅ Feito)
- Usar design system em páginas novas
- Manter código existente intacto

### Fase 2: Migração Opcional
- Substituir PageTitle antigo pelo novo (quando quiser)
- Substituir quadros por Section (quando quiser)
- Sem pressa, sem quebrar nada

### Fase 3: Unificação
- Remover código duplicado (opcional)
- Manter apenas o design system

## 📋 Exemplo Prático

Veja `src/pages/DesignSystemExample.tsx` para ver o design system em ação com comparações lado a lado.

## 🔒 Garantias

- ✅ **Zero Breaking Changes**: Todo código atual continua funcionando
- ✅ **CSS Preservado**: Todos os estilos existentes mantidos
- ✅ **Backward Compatible**: Componentes antigos ainda funcionam
- ✅ **Opcional**: Use quando quiser, não é obrigatório

## 🎯 Benefícios Imediatos

1. **Padronização**: Componentes iguais em todas as páginas
2. **Manutenibilidade**: Mudanças centralizadas
3. **Consistência**: Visual unificado
4. **Flexibilidade**: Variantes para diferentes contextos
5. **Futuro**: Base sólida para crescimento

---

**💡 Dica**: Comece usando o design system em páginas novas e migre as antigas gradualmente, sem pressa!

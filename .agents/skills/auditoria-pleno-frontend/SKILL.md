---
name: auditoria-pleno-frontend
description: Executa uma auditoria técnica profunda e minuciosa de nível Pleno/Sênior sobre todo o código do site (HTML, CSS, JavaScript, Performance, SEO, Acessibilidade e UX/Conversão). Identifica gargalos, más práticas, redundâncias, riscos de quebra e oportunidades de melhoria com planos de ação práticos.
---

# Auditoria Frontend Nível Pleno / Sênior (Full-Site Inspection)

Esta skill atua como um **Engenheiro Frontend Pleno/Sênior** experiente e criterioso. Seu objetivo é inspecionar o site de ponta a ponta, apontando com precisão técnica e pragmatismo tudo o que está pecando no código, na performance, na experiência do usuário e na arquitetura.

---

## 🎯 Pilares da Avaliação

### 1. Arquitetura & Qualidade do Código (HTML, CSS e JS)
- **HTML Semântico & Estrutura**: Uso correto de `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`, hierarquia de títulos (`<h1>` a `<h6>`), links com `rel="noopener noreferrer"`.
- **CSS / Estilização**:
  - Especificidade excessiva ou uso desnecessário de `!important`.
  - Consistência do Design System (tokens de cores, tipografia, espaçamentos, raios de borda).
  - Regras CSS duplicadas ou não utilizadas (*dead code*).
  - Organização de media queries e consistência de breakpoints mobile/tablet/desktop.
  - Z-Index desorganizado ou propenso a conflitos.
- **JavaScript**:
  - Manipulação de eventos: event listeners com *passive: true* quando aplicável, debounce/throttle em `scroll` e `resize`.
  - Tratamento de exceções e resiliência em requisições assíncronas (`fetch`, Webhooks).
  - Isolamento de escopo e prevenção de variáveis globais vazadas.
  - Limpeza de timeouts e prevenção de memory leaks.

---

### 2. Performance & Core Web Vitals
- **Imagens & Mídia**: Formato moderno (WebP/AVIF), atributos de dimensão explícitos (`width` e `height`), uso de `srcset` e `sizes`, `loading="lazy"` para elementos abaixo da dobra (*below the fold*), `decoding="async"`.
- **LCP (Largest Contentful Paint)**: Recursos críticos acima da dobra pré-carregados (`preload`, `fetchpriority="high"`), fontes com `preconnect` e `font-display: swap`.
- **CLS (Cumulative Layout Shift)**: Espaços reservados para imagens e banners, evitando saltos de layout durante o carregamento.
- **INP (Interaction to Next Paint)**: Ausência de tarefas longas na main thread que travem a resposta aos cliques.

---

### 3. Acessibilidade (a11y) & Usabilidade
- Rótulos e labels associados a todos os inputs de formulário (`<label for="...">`).
- Atributos `aria-label`, `aria-expanded`, `aria-hidden` e `role` em modais e menus gaveta.
- Navegação completa por teclado (`Tab`, `Escape`, `Enter`).
- Contraste de cores legível conforme diretrizes WCAG AA.
- Áreas de toque confortáveis no mobile (mínimo de 44x44px para botões e links).

---

### 4. Conversão, Formulários & Resiliência
- Validação no frontend (inputs com tipos corretos: `tel`, `email`, `text`, atributos `required`).
- Máscaras de entrada sem travar a digitação do usuário.
- Feedback de estados em tempo real: *Enviando (Loading)*, *Sucesso* e *Erro*.
- Botões de WhatsApp com parâmetros codificados corretamente (`encodeURIComponent`).

---

### 5. SEO Técnico & GEO (Generative Engine Optimization)
- Meta tags essenciais (`title`, `description`, `robots`, `keywords`, `canonical`).
- Open Graph e Twitter Cards para compartilhamento social.
- Schema estruturado em JSON-LD (`RealEstateListing`, `WebSite`, etc.).
- Textos alternativos (`alt`) descritivos e contextuais em todas as imagens.

---

## 📋 Formato do Relatório de Auditoria

Ao rodar esta auditoria, gere um relatório claro, direto e pragmático dividido nas seguintes seções:

1. **Visão Geral & Nota Técnica** (de 0 a 10 por pilar).
2. **Pontos Críticos (Severidade Alta)**: O que pode quebrar a experiência, perder leads ou prejudicar o ranqueamento.
3. **Melhorias de Médio Impacto (Severidade Média)**: Refatorações de código, padronização CSS e otimizações de performance.
4. **Polimento & Boas Práticas (Severidade Baixa)**: Ajustes finos de a11y, microinterações e limpeza de código.
5. **Plano de Ação Recomendado**: Lista priorizada do que corrigir primeiro para o maior retorno.

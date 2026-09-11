# Edro Mooca — Landing Page de Alto Padrão

[![Website](https://img.shields.io/badge/Website-edrogamaromooca.com.br-0D9488?style=for-the-badge)](https://edrogamaromooca.com.br/)
[![Performance](https://img.shields.io/badge/Core%20Web%20Vitals-95%2B-brightgreen?style=for-the-badge)](https://edrogamaromooca.com.br/)
[![SEO](https://img.shields.io/badge/SEO%20%26%20GEO-Otimizado-gold?style=for-the-badge)](https://edrogamaromooca.com.br/robots.txt)

> Landing Page oficial de alto padrão do empreendimento residencial **Edro Mooca** (Gamaro Incorporadora), localizado na Rua Siqueira Bueno, Mooca, São Paulo - SP.

---

## 🏛️ Sobre o Projeto

* **Incorporação e Construção**: Gamaro Incorporadora
* **Arquitetura Autoral**: Perkins&Will
* **Design de Interiores**: Melina Romano (decorados de 69m² e 132m² e áreas sociais)
* **Paisagismo**: Cardim Arquitetura Paisagística
* **Tipologias**: 69m², 88m², 95m² e 132m² (2 a 4 dormitórios com 2 a 3 suítes)
* **Diferenciais**: Conceito de **Térreo Elevado a 6 metros da rua**, churrasqueira a carvão em todas as unidades, armário privativo no subsolo e vagas determinadas.

---

## ⚡ Tecnologias & Engenharia Web

* **Core**: HTML5 Semântico, CSS3 Moderno (Vanilla CSS com Design System editorial) e JavaScript Vanilla (60fps requestAnimationFrame).
* **Performance (Core Web Vitals)**:
  * Zero CLS (`aspect-ratio` nativo e dimensões explícitas em todas as imagens).
  * LCP otimizado com `<link rel="preload" as="image" fetchpriority="high">`.
  * Lazy loading nativo e decodificação assíncrona em imagens abaixo da dobra.
  * Parser desobstruído com `script defer`.
  * Total de código comprimido < 35 KB (HTML + CSS + JS).
* **SEO & GEO (Generative Engine Optimization)**:
  * Dados estruturados Schema.org (`ApartmentComplex` + `FAQPage` para Rich Snippets).
  * Especificação oficial [llmstxt.org](https://llmstxt.org) v2 (`/llms.txt` e `/llms-full.txt`).
  * Versão alternativa limpa para IA em Markdown (`/index.html.md`).
  * `sitemap.xml` com extensão Google Image Sitemap.
  * `robots.txt` com permissão explícita para Googlebot, Bingbot e crawlers de IA (GPTBot, PerplexityBot, ClaudeBot, etc.).

---

## 📂 Estrutura do Repositório

```
├── index.html        # Página principal com microdados Schema.org e FAQ nativa
├── style.css         # Design system editorial luxury, reset e responsividade
├── script.js         # Engine de rolagem, lightbox modal e sliders touch
├── robots.txt        # Regras de rastreamento para buscadores e IAs
├── sitemap.xml       # Mapa XML com suporte a Google Imagens
├── llms.txt          # Índice no padrão llmstxt.org v2 para LLMs
├── llms-full.txt     # Documentação consolidada integral para IA
├── index.html.md     # Versão limpa do site em Markdown
└── assets/           # Imagens otimizadas em formato WebP
```

---

## 🌐 Produção

* **Domínio Oficial**: [https://edrogamaromooca.com.br](https://edrogamaromooca.com.br)
* **Hospedagem**: Hostinger CloudLinux + CDN Edge Caching

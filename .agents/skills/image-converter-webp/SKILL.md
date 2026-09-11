---
name: image-converter-webp
description: Converte e otimiza imagens (PNG, JPG, JPEG) para o formato moderno WebP com compressão inteligente de alta performance, gerando grande redução de peso (até 90%) sem perda perceptível de qualidade para Core Web Vitals e PageSpeed.
---

# WebP Image Converter & Optimizer Skill

Esta skill é especializada em inspecionar, converter e otimizar todas as imagens de um projeto para o padrão WebP moderno, atualizando as referências de código no HTML/CSS.

## Capacidades

1. **Conversão Automatizada com Python Pillow**:
   - Lê formatos de origem (`.jpg`, `.jpeg`, `.png`).
   - Gera `.webp` com compressão `quality=82` a `85` (ponto ideal entre nitidez cristalina e redução de tamanho).
   - Suporta canal alfa / transparência total em PNGs.

2. **Atualização de Referências no Código**:
   - Substitui caminhos de arquivos em tags `<img>`, `background-image`, `og:image`, `twitter:image` e arrays de galerias/Lightbox.

3. **Métricas de Auditoria**:
   - Mede o peso total antes vs depois e calcula a porcentagem exata de economia de banda (KB/MB poupados).

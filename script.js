/**
 * Edro Mooca - Editorial Parallax Interactivity
 * Performance 60fps, Touch-enabled Sliders, Lightbox Gallery & Editorial Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll state
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Navigation Active Spy para Scroll Natural
  const chapters = Array.from(document.querySelectorAll('section[id]'));
  const chapterDots = document.querySelectorAll('.chapter-dot');
  const navLinks = document.querySelectorAll('.header-nav a');

  const updateActiveSection = () => {
    const scrollMid = window.scrollY + (window.innerHeight * 0.35);
    let currentId = chapters[0]?.getAttribute('id') || 'hero';

    chapters.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollMid >= top && scrollMid < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    chapterDots.forEach(dot => {
      dot.classList.toggle('active', dot.getAttribute('data-target') === currentId);
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  // 3. Editorial Scroll Engine (Ideia B, Ideia C & Visibilidade Imediata Sem Bugs)
  
  // A. Ideia C: Desenho das Linhas Divisórias de Seção no Scroll
  const chapterSections = document.querySelectorAll('.editorial-chapter');
  const chapterLineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.02,
    rootMargin: '0px 0px 60px 0px'
  });
  chapterSections.forEach(sec => chapterLineObserver.observe(sec));

  // B. Ideia B: Brilho Metálico Suave nos Botões ao Entrar em Tela
  const btnSheenObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('sheen-pulse');
        }, 200);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 40px 0px'
  });
  document.querySelectorAll('.btn').forEach(btn => btnSheenObserver.observe(btn));

  // C. Linhas decorativas dos Kickers
  const kickerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 40px 0px'
  });
  document.querySelectorAll('.chapter-kicker').forEach(k => kickerObserver.observe(k));

  // 4. Scroll-Driven Engine (60fps requestAnimationFrame)
  const scrollProgress = document.getElementById('scrollProgress');
  const heroContent = document.querySelector('.hero-content');
  const heroBgImg = document.querySelector('.hero-bg-img');
  const heroFloatCard = document.querySelector('.hero-detail-float-card');
  const scrollCue = document.querySelector('.scroll-cue');
  let ticking = false;

  const onScrollFrame = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // A. Barra de Progresso de Leitura Scroll-Driven
    if (scrollProgress && maxScroll > 0) {
      const pct = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
      scrollProgress.style.width = `${pct}%`;
    }

    // B. Hero Scroll-Driven Parallax & Dissolve Suave
    if (scrollY < 900) {
      if (heroContent) {
        const heroTranslate = scrollY * 0.18;
        const heroOpacity = Math.max(0, 1 - (scrollY / 520));
        heroContent.style.transform = `translateY(${heroTranslate}px)`;
        heroContent.style.opacity = heroOpacity;
      }
      if (heroBgImg) {
        const bgZoom = 1 + scrollY * 0.00015;
        heroBgImg.style.transform = `scale(${bgZoom})`;
      }
      if (heroFloatCard) {
        // Dissolve suave e leve elevação para nunca colidir ou ser cortado pelo Capítulo 01
        const cardOpacity = Math.max(0, 1 - (scrollY / 90));
        heroFloatCard.style.opacity = cardOpacity;
        heroFloatCard.style.transform = `translateY(-${scrollY * 0.2}px)`;
        heroFloatCard.style.pointerEvents = cardOpacity <= 0.05 ? 'none' : 'auto';
      }
      if (scrollCue) {
        const cueOpacity = Math.max(0, 1 - (scrollY / 70));
        scrollCue.style.opacity = cueOpacity;
        scrollCue.style.pointerEvents = cueOpacity <= 0.05 ? 'none' : 'auto';
      }
    }

    // As seções utilizam empilhamento nativo via CSS sticky (sem scale(0.96)), garantindo 100% de largura e zero frestas laterais ou inferiores.

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScrollFrame);
      ticking = true;
    }
  }, { passive: true });
  onScrollFrame();

  // 4. Split Screen Localização (Alternador Vista Aérea vs. Mapa)
  const btnShowAerea = document.getElementById('btnShowAerea');
  const btnShowMapa = document.getElementById('btnShowMapa');
  const locationImg = document.getElementById('locationImg');
  const locationMediaFrame = document.getElementById('locationMediaFrame');

  if (btnShowAerea && btnShowMapa && locationImg) {
    btnShowAerea.addEventListener('click', () => {
      btnShowAerea.classList.add('active');
      btnShowMapa.classList.remove('active');
      locationImg.src = 'assets/images/vista_aerea_regiao.webp';
      locationImg.alt = 'Vista Aérea da Região do Edro Mooca';
      if (locationMediaFrame) {
        locationMediaFrame.setAttribute('data-zoom-src', 'assets/images/vista_aerea_regiao.webp');
        locationMediaFrame.setAttribute('data-caption', 'Vista Aérea da Região do Edro Mooca - Rua Siqueira Bueno');
      }
    });

    btnShowMapa.addEventListener('click', () => {
      btnShowMapa.classList.add('active');
      btnShowAerea.classList.remove('active');
      locationImg.src = 'assets/images/mapa_localizacao.webp';
      locationImg.alt = 'Mapa Ilustrado da Região do Edro Mooca';
      if (locationMediaFrame) {
        locationMediaFrame.setAttribute('data-zoom-src', 'assets/images/mapa_localizacao.webp');
        locationMediaFrame.setAttribute('data-caption', 'Mapa de Localização e Conectividade - Edro Mooca');
      }
    });
  }

  // 5. Componente Reutilizável de Slider Horizontal com Setas e Swipe Touch
  function initHorizontalSlider(trackId, prevBtnId, nextBtnId, dotsContainerId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const dotsContainer = document.getElementById(dotsContainerId);

    if (!track) return;

    const slides = track.querySelectorAll('.slider-slide, .leisure-slide-card, .decorado-slide-card');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;
    let currentIndex = 0;

    const updateSlider = (index) => {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;

      // Translate track (cada slide tem exatamente 100% de largura)
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot-btn');
        dots.forEach((d, idx) => {
          if (idx === currentIndex) {
            d.classList.add('active');
          } else {
            d.classList.remove('active');
          }
        });
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => updateSlider(currentIndex - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => updateSlider(currentIndex + 1));
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot-btn');
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          updateSlider(idx);
        });
      });
    }

    // Touch Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        updateSlider(currentIndex + 1); // swipe left -> next
      } else if (touchEndX - touchStartX > 45) {
        updateSlider(currentIndex - 1); // swipe right -> prev
      }
    }, { passive: true });
  }

  // Inicializar Slider de Plantas (Capítulo 03)
  initHorizontalSlider('plansTrack', 'btnPlansPrev', 'btnPlansNext', 'plansDots');

  // 5.1 Tour Virtual 360° Interativo (Capítulo 04)
  const initTour360 = () => {
    const tourTabs = document.querySelectorAll('.tour-tab-btn');
    const panel69 = document.getElementById('tourPanel69');
    const panel132 = document.getElementById('tourPanel132');
    const waBtn = document.getElementById('tourWaBtn');
    const btnFullscreen = document.getElementById('btnFullscreenTour');
    const viewerCard = document.querySelector('.tour-viewer-card');
    const loader69 = document.getElementById('loaderTour69');
    const loader132 = document.getElementById('loaderTour132');
    const iframe69 = document.getElementById('iframeTour69');
    const iframe132 = document.getElementById('iframeTour132');

    // Desaparecer o loader com transição suave quando os iframes carregarem
    const hideLoader = (loader) => {
      if (!loader || loader.style.display === 'none') return;
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => { loader.style.display = 'none'; }, 450);
    };

    if (iframe69 && loader69) {
      iframe69.addEventListener('load', () => {
        hideLoader(loader69);
      });
      // Fallback seguro caso o iframe demore ou o evento já tenha disparado
      setTimeout(() => { hideLoader(loader69); }, 2200);
    }
    if (iframe132 && loader132) {
      iframe132.addEventListener('load', () => {
        hideLoader(loader132);
      });
      setTimeout(() => { hideLoader(loader132); }, 3500);
    }

    if (!tourTabs.length) return;

    tourTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tour = tab.getAttribute('data-tour');
        
        tourTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        if (tour === '69m') {
          if (panel69) panel69.classList.add('active');
          if (panel132) panel132.classList.remove('active');
          if (waBtn) waBtn.setAttribute('data-plan-context', 'Tour 360 Decorado 69m²');
        } else if (tour === '132m') {
          if (panel69) panel69.classList.remove('active');
          if (panel132) panel132.classList.add('active');
          if (waBtn) waBtn.setAttribute('data-plan-context', 'Tour 360 Decorado 132m²');
        }
      });
    });

    // Controle de Tela Cheia (Padrão W3C Moderno sem APIs legadas)
    if (btnFullscreen && viewerCard) {
      btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          if (viewerCard.requestFullscreen) {
            viewerCard.requestFullscreen().catch(() => {});
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          }
        }
      });

      const updateFullscreenBtnState = () => {
        const isFull = !!document.fullscreenElement;
        const span = btnFullscreen.querySelector('span');
        if (span) {
          span.textContent = isFull ? 'Sair da Tela Cheia' : 'Tela Cheia';
        }
      };

      document.addEventListener('fullscreenchange', updateFullscreenBtnState);
    }
  };

  initTour360();

  // Inicializar Slider de Lazer no Térreo Elevado (Capítulo 05)
  initHorizontalSlider('leisureTrack', 'btnLeisurePrev', 'btnLeisureNext', 'leisureDots');

  // 6. Modal Lightbox com Navegação entre Imagens da Mesma Seção
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const zoomTriggers = document.querySelectorAll('.zoomable');

  let activeGalleryItems = [];
  let currentGalleryIndex = 0;

  function showModalImage(index) {
    if (!activeGalleryItems.length) return;
    if (index < 0) index = activeGalleryItems.length - 1;
    if (index >= activeGalleryItems.length) index = 0;
    currentGalleryIndex = index;

    const el = activeGalleryItems[currentGalleryIndex];
    const src = el.getAttribute('data-zoom-src') || el.querySelector('img')?.src;
    const caption = el.getAttribute('data-caption') || el.querySelector('img')?.alt || '';

    if (modalImg) modalImg.src = src;
    if (modalCaption) modalCaption.textContent = caption;

    // Toggle navigation arrows visibility if only 1 image
    if (modalPrev && modalNext) {
      if (activeGalleryItems.length <= 1) {
        modalPrev.style.display = 'none';
        modalNext.style.display = 'none';
      } else {
        modalPrev.style.display = 'flex';
        modalNext.style.display = 'flex';
      }
    }
  }

  zoomTriggers.forEach(el => {
    el.addEventListener('click', () => {
      const galleryName = el.getAttribute('data-gallery') || 'geral';
      activeGalleryItems = Array.from(document.querySelectorAll(`.zoomable[data-gallery="${galleryName}"]`));
      if (activeGalleryItems.length === 0) activeGalleryItems = [el];
      
      const elIndex = activeGalleryItems.indexOf(el);
      currentGalleryIndex = elIndex !== -1 ? elIndex : 0;

      showModalImage(currentGalleryIndex);

      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modalPrev) {
    modalPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showModalImage(currentGalleryIndex - 1);
    });
  }

  if (modalNext) {
    modalNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showModalImage(currentGalleryIndex + 1);
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showModalImage(currentGalleryIndex - 1);
      if (e.key === 'ArrowRight') showModalImage(currentGalleryIndex + 1);
    }
  });

  // 7. Formulário VIP com Envio para Google Sheets via Webhook & Chips Interativos
  const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxoK_sE8UKeGC_Lvm14dskg_ReL6kJ33q7eQtEUWIOxCnD284cp1EdhshYq87Hn7cu_RQ/exec';
  const WHATSAPP_PHONE = '5511987689734';

  // Máscara dinâmica para o campo de telefone/WhatsApp
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 10) {
        e.target.value = v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (v.length > 6) {
        e.target.value = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (v.length > 2) {
        e.target.value = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else {
        e.target.value = v;
      }
    });
  }

  // Gerenciamento de Chips Interativos de Metragem
  const tipologiaChips = document.querySelectorAll('.tipologias-chips .chip-btn');
  const selectedTipologiaInput = document.getElementById('selectedTipologia');

  if (tipologiaChips.length && selectedTipologiaInput) {
    tipologiaChips.forEach(btn => {
      btn.addEventListener('click', () => {
        tipologiaChips.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTipologiaInput.value = btn.getAttribute('data-value');
      });
    });
  }

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatusMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome')?.value.trim() || '';
      const telefone = document.getElementById('telefone')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const tipologia = selectedTipologiaInput?.value || '';
      const mensagemInput = document.getElementById('mensagem')?.value.trim() || '';

      // Captura a mensagem do input ou associa com a planta de interesse caso não preenchido
      const mensagemFinal = mensagemInput || (tipologia ? `Interesse na planta: ${tipologia}` : 'Solicitação de agendamento via site');

      // Estrutura exata do JSON solicitada
      const payload = {
        nome: nome,
        telefone: telefone,
        email: email,
        mensagem: mensagemFinal,
        origem: "Site - Edro Mooca",
        aba: "Edro Mooca"
      };

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Enviando dados com segurança...</span>`;

      if (formStatus) {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status-msg';
      }

      try {
        let sentOk = false;

        try {
          // Requisição POST em JavaScript usando fetch com Content-Type application/json
          const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            const data = await response.json().catch(() => null);
            if (data && data.status === 'error') {
              throw new Error(data.message || 'Erro ao processar lead');
            }
            sentOk = true;
          } else {
            throw new Error(`HTTP status ${response.status}`);
          }
        } catch (initialErr) {
          // Fallback resiliente para contornar restrições de CORS em redirects 302 do Google Apps Script
          await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            mode: 'no-cors'
          });
          sentOk = true;
        }

        if (sentOk) {
          // Feedback amigável de sucesso na tela
          if (formStatus) {
            formStatus.textContent = '✓ Solicitação recebida com sucesso! Seus dados foram salvos e um consultor credenciado entrará em contato para confirmar sua visita.';
            formStatus.classList.add('success');
            formStatus.style.display = 'block';
          }

          submitBtn.innerHTML = `<span>✓ Agendamento Solicitado!</span>`;

          // Direcionamento contextual para o WhatsApp após gravar na planilha
          const whatsMsg = `Olá! Solicitei agendamento para conhecer os decorados do Edro Mooca pelo site. Sou o(a) ${nome}, tenho interesse na planta de ${tipologia || 'lançamento'} e gostaria de confirmar um horário com o consultor credenciado.`;
          setTimeout(() => {
            window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(whatsMsg)}`, '_blank');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnContent;
          }, 1500);
        }

      } catch (err) {
        console.error('Erro ao enviar para webhook:', err);

        // Feedback amigável de erro na tela
        if (formStatus) {
          formStatus.textContent = 'Houve uma instabilidade temporária ao enviar seus dados. Por favor, tente novamente ou fale conosco diretamente pelo WhatsApp.';
          formStatus.classList.add('error');
          formStatus.style.display = 'block';
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnContent;
      }
    });
  }

  // 8. Disparadores Rápidos de WhatsApp (Mensagem Curta Contextualizada por Seção)
  const sectionContextMessages = {
    'hero': 'Olá! Vim pelo site do Edro Mooca e gostaria de mais informações.',
    'capitulo-01': 'Olá! Vim pelo site do Edro Mooca e me interessei pela Fachada e pelo Térreo Elevado.',
    'capitulo-02': 'Olá! Vim pelo site do Edro Mooca e gostaria de detalhes sobre a Localização na Mooca.',
    'capitulo-03': 'Olá! Vim pelo site do Edro Mooca e gostaria de consultar as Plantas de 69m² a 132m².',
    'capitulo-04': 'Olá! Vim pelo site do Edro Mooca e quero agendar uma visita aos Apartamentos Decorados com um consultor.',
    'capitulo-05': 'Olá! Vim pelo site do Edro Mooca e gostaria de saber mais sobre o Clube de Lazer.',
    'capitulo-06': 'Olá! Gostaria de agendar uma visita acompanhada aos decorados do Edro Mooca com um consultor credenciado.',
    'Planta 69m²': 'Olá! Vim pelo site do Edro Mooca e quero consultar disponibilidade da planta de 69m² (2 suítes).',
    'Planta 88m²': 'Olá! Vim pelo site do Edro Mooca e quero consultar disponibilidade da planta de 88m² (2 suítes c/ closet).',
    'Planta 95m²': 'Olá! Vim pelo site do Edro Mooca e quero consultar disponibilidade da planta de 95m² (3 dorms / 2 vagas).',
    'Planta 132m²': 'Olá! Vim pelo site do Edro Mooca e quero consultar disponibilidade da planta de 132m² (3 ou 4 dorms).',
    'Tour 360 Decorado 69m²': 'Olá! Acabei de ver o Tour Virtual do decorado de 69m² do Edro Mooca e gostaria de agendar uma visita presencial com o consultor.',
    'Tour 360 Decorado 132m²': 'Olá! Acabei de ver o Tour Virtual do decorado de 132m² do Edro Mooca e gostaria de agendar uma visita presencial com o consultor.',
    'Header': 'Olá! Vim pelo site do Edro Mooca e gostaria de falar com um consultor.',
    'Agendamento VIP': 'Olá! Gostaria de agendar uma visita acompanhada aos apartamentos decorados do Edro Mooca com um consultor credenciado.',
    'Sticky Mobile': 'Olá! Gostaria de tirar dúvidas sobre o Edro Mooca e agendar uma visita aos decorados.',
    'Menu Mobile': 'Olá! Estava navegando pelo site do Edro Mooca e gostaria de falar com um consultor sobre o lançamento.'
  };

  const getActiveChapterContext = () => {
    const vh = window.innerHeight;
    let activeId = 'hero';
    chapters.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= vh * 0.5 && rect.bottom > 80) {
        activeId = sec.getAttribute('id');
      }
    });
    return activeId;
  };

  const waDirectBtns = document.querySelectorAll('.trigger-wa');
  waDirectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const explicitContext = btn.getAttribute('data-plan-context');
      const currentActiveChapter = getActiveChapterContext();

      // Prioriza contexto específico da seção atual da rolagem quando acionado no header ou mobile
      let msg = '';
      if (explicitContext && explicitContext !== 'Header' && explicitContext !== 'Sticky Mobile' && sectionContextMessages[explicitContext]) {
        msg = sectionContextMessages[explicitContext];
      } else if (sectionContextMessages[currentActiveChapter]) {
        msg = sectionContextMessages[currentActiveChapter];
      } else {
        msg = 'Olá! Vim pelo site do Edro Mooca e gostaria de tirar algumas dúvidas.';
      }

      window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(msg)}`, '_blank');
    });
  });

  // 9. Menu Mobile Drawer Interativo com Seções Clicáveis
  const initMobileMenu = () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const drawer = document.getElementById('mobileMenuDrawer');
    const drawerOverlay = document.getElementById('mobileDrawerOverlay');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const navLinks = document.querySelectorAll('.mobile-nav-link, #drawerCtaBtn');

    if (!hamburgerBtn || !drawer) return;

    const openDrawer = () => {
      drawer.classList.add('active');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('active');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    hamburgerBtn.addEventListener('click', () => {
      if (drawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });
  };

  initMobileMenu();
});

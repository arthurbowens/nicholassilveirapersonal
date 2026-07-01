import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';

interface NavLink {
  label: string;
  id: string;
}

interface Service {
  title: string;
  description: string;
  icon: 'online' | 'presencial' | 'nutricao' | 'palco';
}

interface StudentResult {
  name: string;
  period: string;
  goal: string;
  stats: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly whatsappMessage =
    'Olá Nicholas! Quero saber mais sobre a consultoria.';

  protected readonly whatsappUrl = `https://wa.me/554884976426?text=${encodeURIComponent(this.whatsappMessage)}`;

  protected readonly navLinks: NavLink[] = [
    { label: 'Sobre', id: 'sobre' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Resultados', id: 'resultados' },
    { label: 'Depoimentos', id: 'depoimentos' },
  ];

  protected readonly services: Service[] = [
    {
      title: 'Consultoria Online',
      description:
        'Treino e dieta 100% personalizados, com acompanhamento semanal e ajustes em tempo real pelo WhatsApp.',
      icon: 'online',
    },
    {
      title: 'Treino Presencial',
      description:
        'Sessões individuais com foco em técnica, intensidade e evolução constante — do iniciante ao avançado.',
      icon: 'presencial',
    },
    {
      title: 'Nutrição Esportiva',
      description:
        'Plano alimentar estratégico para hipertrofia, definição ou recomposição corporal, sem dietas malucas.',
      icon: 'nutricao',
    },
    {
      title: 'Preparação para Palco',
      description:
        'Protocolo completo para atletas: periodização, peak week e posing — experiência de quem viveu a competição.',
      icon: 'palco',
    },
  ];

  protected readonly results: StudentResult[] = [
    {
      name: 'Aluno 01',
      period: '12 semanas',
      goal: 'Recomposição corporal',
      stats: '-8 kg gordura · +3 kg massa magra',
    },
    {
      name: 'Aluno 02',
      period: '16 semanas',
      goal: 'Hipertrofia',
      stats: '+6 kg massa magra · Força +40%',
    },
    {
      name: 'Aluno 03',
      period: '10 semanas',
      goal: 'Definição',
      stats: '-12 kg · BF 22% → 14%',
    },
    {
      name: 'Aluno 04',
      period: '20 semanas',
      goal: 'Preparação competitiva',
      stats: 'Top 3 regional · 1ª competição',
    },
  ];

  protected readonly testimonials: Testimonial[] = [
    {
      name: 'Marcos R.',
      role: 'Aluno — 6 meses',
      text: 'Nicholas não entrega só treino. Ele ensina método, disciplina e visão de longo prazo. Minha transformação foi real e sustentável.',
    },
    {
      name: 'Camila S.',
      role: 'Aluna — consultoria online',
      text: 'Acompanhamento impecável mesmo à distância. Sempre disponível para ajustes e com um olhar técnico que faz toda diferença.',
    },
    {
      name: 'Felipe A.',
      role: 'Atleta amador',
      text: 'Preparei minha primeira competição com ele. A experiência de quem já esteve no palco do Arnold muda completamente o jogo.',
    },
  ];

  protected readonly stats = [
    { value: '500+', label: 'Alunos transformados' },
    { value: '8+', label: 'Anos de experiência' },
    { value: '1º', label: 'Arnold South America 2025' },
    { value: '100%', label: 'Comprometimento' },
  ];

  protected readonly currentYear: number = new Date().getFullYear();

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 40);
    }
  }

  protected scrollTo(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu();
    }
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    this.updateBodyScroll();
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    this.updateBodyScroll();
  }

  private updateBodyScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    }
  }
}

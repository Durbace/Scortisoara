import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

type TypeCard = {
  title: string;
  slug: string;
  img: string;
  excerpt: string;

  origin: string;
  intensity: 'delicată' | 'medie' | 'puternică';
  color: string;
  texture: string;
  aromaNotes: string[];
  bestUses: string[];
};

@Component({
  standalone: true,
  selector: 'app-tipuri',
  imports: [CommonModule, RouterModule],
  templateUrl: './tipuri.component.html',
  styleUrls: ['./tipuri.component.css'],
})
export class TipuriComponent implements AfterViewInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @ViewChild('modalCloseBtn') modalCloseBtn!: ElementRef<HTMLButtonElement>;

  onBack() {
    if (window.history.length > 2) window.history.back();
    else this.router.navigateByUrl('/');
  }

  modalOpen = false;
  active: TypeCard | null = null;

  openModal(slug: string) {
    const found = this.types.find((t) => t.slug === slug) || null;
    this.active = found;
    this.modalOpen = !!found;
    if (this.modalOpen) document.body.style.overflow = 'hidden';
    setTimeout(() => this.modalCloseBtn?.nativeElement?.focus(), 0);
  }
  closeModal() {
    this.modalOpen = false;
    this.active = null;
    document.body.style.overflow = '';
  }
  onKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Escape' && this.modalOpen) {
      ev.preventDefault();
      this.closeModal();
    }
  }
  ngAfterViewInit() {
    this.route.fragment.subscribe((frag) => {
      if (!frag) return;
      const el = document.getElementById(frag);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.openModal(frag);
    });
  }

  types: TypeCard[] = [
    {
      title: 'Ceylon („true cinnamon”)',
      slug: 'ceylon',
      img: 'assets/images/tipuri/ceylon.jpg',
      excerpt:
        'Fină, florală, citrică. Bețe subțiri, multe straturi. Preferată pentru deserturi delicate.',
      origin: 'Sri Lanka',
      intensity: 'delicată',
      color: 'maro deschis, auriu',
      texture: 'bețe subțiri, friabile; pudră fină',
      aromaNotes: ['floral', 'miere', 'citric ușor', 'cald, dulceag'],
      bestUses: [
        'creme & glazuri',
        'fructe coapte',
        'cafea/latte fin',
        'granola light',
        'mere, pere',
      ],
    },
    {
      title: 'Cassia (China)',
      slug: 'cassia-china',
      img: 'assets/images/tipuri/cassia-china.jpg',
      excerpt:
        'Aromă intensă, dulce-picantă. Bețe groase, o singură spirală. Foarte populară în copt.',
      origin: 'China',
      intensity: 'puternică',
      color: 'maro-roșiatic',
      texture: 'bețe groase, dure; pudră ușor grunjoasă',
      aromaNotes: ['dulce-picant', 'lemnos', 'cald', 'ușor amar spre final'],
      bestUses: [
        'rulouri cu scorțișoară',
        'cookies & brioșe',
        'condimente pentru vin fiert',
        'mixuri pentru carne',
      ],
    },
    {
      title: 'Saigon (Vietnameză)',
      slug: 'saigon',
      img: 'assets/images/tipuri/saigon.jpg',
      excerpt:
        'Foarte parfumată, accent picant. Îți ridică instant profilul de aromă în deserturi.',
      origin: 'Vietnam',
      intensity: 'puternică',
      color: 'maro închis',
      texture: 'bețe groase; pudră aromată intens',
      aromaNotes: ['picant', 'camforic subtil', 'dulce-amarui', 'lemnos'],
      bestUses: [
        'brownies & ciocolată',
        'granola intensă',
        'mixuri pentru iarnă',
        'curry-uri robuste',
      ],
    },
    {
      title: 'Korintje (Indoneziană)',
      slug: 'korintje',
      img: 'assets/images/tipuri/korintje.jpg',
      excerpt:
        'Echilibrată, consistentă, foarte folosită în patiserie comercială.',
      origin: 'Indonezia',
      intensity: 'medie',
      color: 'maro mediu',
      texture: 'bețe ferme; pudră uniformă',
      aromaNotes: ['dulce cald', 'lemnos', 'ușor piperat'],
      bestUses: [
        'aluaturi dospite',
        'crumble & plăcinte',
        'sosuri BBQ',
        'condimente pentru mere dovleac',
      ],
    },
    {
      title: 'Madagascar',
      slug: 'madagascar',
      img: 'assets/images/tipuri/madagascar.jpg',
      excerpt:
        'Profil aromat complex, cu note vanilate – excelentă în creme și creme brulée.',
      origin: 'Madagascar',
      intensity: 'medie',
      color: 'maro-auriu',
      texture: 'bețe subțiri-medii; pudră fină',
      aromaNotes: ['vanilat', 'floral', 'ușor miere', 'cald'],
      bestUses: [
        'creme & patiserie fină',
        'iaurturi & parfait',
        'infuzie în lapte, ceaiuri',
      ],
    },
  ];
}

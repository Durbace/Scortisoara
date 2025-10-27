import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { combineLatest, map, Observable, Subscription } from 'rxjs';

type TypeCardI18n = {
  title: string;
  excerpt: string;
  origin: string;
  intensity: string;
  color: string;
  texture: string;
  aromaNotes: string[];
  bestUses: string[];
};

type TypeCardVM = {
  slug: string;
  img: string;
} & TypeCardI18n;

@Component({
  standalone: true,
  selector: 'app-tipuri',
  imports: [CommonModule, RouterModule],
  templateUrl: './tipuri.component.html',
  styleUrls: ['./tipuri.component.css'],
})
export class TipuriComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private transloco = inject(TranslocoService);

  @ViewChild('modalCloseBtn') modalCloseBtn!: ElementRef<HTMLButtonElement>;

  private imagesBySlug: Record<string, string> = {
    ceylon: 'assets/images/tipuri/ceylon.jpg',
    'cassia-china': 'assets/images/tipuri/cassia-china.jpg',
    saigon: 'assets/images/tipuri/saigon.jpg',
    korintje: 'assets/images/tipuri/korintje.jpg',
    madagascar: 'assets/images/tipuri/madagascar.jpg',
  };

  labels$ = this.transloco.selectTranslateObject(
    'typesPage.labels'
  ) as Observable<{
    badge: string;
    details: string;
    back: string;
    sectionOrigin: string;
    origin: string;
    intensity: string;
    color: string;
    texture: string;
    aromaNotes: string;
    bestUses: string;
    disclaimer: string;
  }>;

  types$: Observable<TypeCardVM[]> = this.transloco
    .selectTranslateObject('typesPage.items')
    .pipe(
      map((items: Record<string, TypeCardI18n>) =>
        Object.entries(items).map(([slug, data]) => ({
          slug,
          img: this.imagesBySlug[slug] ?? 'assets/images/tipuri/fallback.jpg',
          ...data,
        }))
      )
    );

  modalOpen = false;
  active: TypeCardVM | null = null;

  private sub?: Subscription;

  onBack() {
    if (window.history.length > 2) window.history.back();
    else this.router.navigateByUrl('/');
  }

  openModal(slug: string, list: TypeCardVM[]) {
    const found = list.find((t) => t.slug === slug) || null;
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
    this.sub = combineLatest([this.types$, this.route.fragment]).subscribe(
      ([list, frag]) => {
        if (!frag) return;
        const el = document.getElementById(frag);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.openModal(frag, list);
      }
    );
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    document.body.style.overflow = '';
  }
}

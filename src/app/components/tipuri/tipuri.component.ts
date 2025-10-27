import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { combineLatest, map, Observable, Subscription } from 'rxjs';

// @ts-ignore – tip simplu pentru bootstrap Modal (evită importul tipurilor dacă nu le ai)
declare const bootstrap: any;

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
type TypeCardVM = { slug: string; img: string } & TypeCardI18n;

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

  @ViewChild('typeModalEl') typeModalEl!: ElementRef<HTMLDivElement>;
  private bsModal?: any;

  private imagesBySlug: Record<string, string> = {
    ceylon: 'assets/images/tipuri/ceylon.jpg',
    'cassia-china': 'assets/images/tipuri/cassia-china.jpg',
    saigon: 'assets/images/tipuri/saigon.jpg',
    korintje: 'assets/images/tipuri/korintje.jpg',
    madagascar: 'assets/images/tipuri/madagascar.jpg',
  };

  labels$ = this.transloco.selectTranslateObject('typesPage.labels') as Observable<{
    badge: string; details: string; back: string; sectionOrigin: string;
    origin: string; intensity: string; color: string; texture: string;
    aromaNotes: string; bestUses: string; disclaimer: string;
  }>;

  types$: Observable<TypeCardVM[]> = this.transloco
    .selectTranslateObject('typesPage.items')
    .pipe(map((items: Record<string, TypeCardI18n>) =>
      Object.entries(items).map(([slug, data]) => ({
        slug,
        img: this.imagesBySlug[slug] ?? 'assets/images/tipuri/fallback.jpg',
        ...data,
      }))
    ));

  active: TypeCardVM | null = null;
  private allTypes: TypeCardVM[] = [];
  private sub?: Subscription;

  onBack() {
    if (history.length > 2) history.back();
    else this.router.navigateByUrl('/');
  }

  openModal(slug: string) {
    const found = this.allTypes.find(t => t.slug === slug) || null;
    this.active = found;
    // Bootstrap va prelua afișarea din atributul data-bs-target,
    // dar dacă vrei să forțezi din TS:
    if (found && this.bsModal) this.bsModal.show();
  }

  ngAfterViewInit() {
    // inițializează modalul Bootstrap
    this.bsModal = new bootstrap.Modal(this.typeModalEl.nativeElement, {
      backdrop: true,
      focus: true,
      keyboard: true,
    });

    // păstrează local lista pentru openModal(slug)
    this.sub = combineLatest([this.types$, this.route.fragment]).subscribe(
      ([list, frag]) => {
        this.allTypes = list;
        if (!frag) return;

        // scroll la secțiune
        const el = document.getElementById(frag);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // dacă fragmentul corespunde unui tip, deschide modal
        const candidate = list.find(t => t.slug === frag);
        if (candidate) {
          this.active = candidate;
          this.bsModal?.show();
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.bsModal?.hide();
  }
}

import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { map, Observable } from 'rxjs';

type RecipeI18n = {
  title: string;
  excerpt: string;
  prep?: string;
  cook?: string;
  servings?: string;
  ingredients: string[];
  steps: string[];
};

type RecipeVM = {
  slug: string;
  img: string;
} & RecipeI18n;

@Component({
  standalone: true,
  selector: 'app-retete',
  imports: [CommonModule, RouterModule],
  templateUrl: './retete.component.html',
  styleUrls: ['./retete.component.css'],
})
export class ReteteComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private transloco = inject(TranslocoService);

  @ViewChild('modalCloseBtn') modalCloseBtn!: ElementRef<HTMLButtonElement>;

  private imagesBySlug: Record<string, string> = {
    'rulouri-cu-scortisoara': 'assets/images/retete/rulouri.jpg',
    'granola-cu-scortisoara': 'assets/images/retete/granola.jpg',
    'latte-cu-scortisoara': 'assets/images/retete/latte.jpg',
    'mere-coapte-cu-scortisoara': 'assets/images/retete/mere-coapte.jpg',
    'cookies-ciocolata-scortisoara': 'assets/images/retete/cookies.jpg',
    'curry-dovleac-scortisoara': 'assets/images/retete/curry.jpg',
  };

  labels$ = this.transloco.selectTranslateObject(
    'recipes.labels'
  ) as Observable<{
    badge: string;
    seeRecipe: string;
    prep: string;
    cook: string;
    servings: string;
    ingredients: string;
    steps: string;
    back: string;
  }>;

  recipes$: Observable<RecipeVM[]> = this.transloco
    .selectTranslateObject('recipes.items')
    .pipe(
      map((items: Record<string, RecipeI18n>) =>
        Object.entries(items).map(([slug, data]) => ({
          slug,
          img: this.imagesBySlug[slug] ?? 'assets/images/retete/fallback.jpg',
          ...data,
        }))
      )
    );

  onBack() {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  modalOpen = false;
  activeRecipe: RecipeVM | null = null;

  openModal(slug: string, list: RecipeVM[]) {
    const r = list.find((x) => x.slug === slug) || null;
    this.activeRecipe = r;
    this.modalOpen = !!r;
    if (this.modalOpen) document.body.style.overflow = 'hidden';
    setTimeout(() => this.modalCloseBtn?.nativeElement?.focus(), 0);
  }
  closeModal() {
    this.modalOpen = false;
    this.activeRecipe = null;
    document.body.style.overflow = '';
  }

  onKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Escape' && this.modalOpen) {
      ev.preventDefault();
      this.closeModal();
    }
  }

  ngAfterViewInit() {}
  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  selectRecipe(r: RecipeVM) {
  this.activeRecipe = r;
}

clearRecipe() {
  this.activeRecipe = null;
}
}

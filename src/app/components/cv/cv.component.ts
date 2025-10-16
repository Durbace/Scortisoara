import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit, OnDestroy {
  open = false;
  cv: any | null = null;
  private sub?: Subscription;

  constructor(private transloco: TranslocoService) {}

  ngOnInit() {
    // Ia direct obiectul 'cv' din i18n (ro / en / de) și re-emite la schimbarea limbii
    this.sub = this.transloco.selectTranslateObject('cv').subscribe((obj) => {
      this.cv = obj;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  openModal() {
    this.open = true;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open'); // <— ADĂUGAT
  }

  closeModal() {
    this.open = false;
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open'); // <— ADĂUGAT
  }

  onBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('cv-backdrop')) {
      this.closeModal();
    }
  }

  onKey(e: KeyboardEvent) {
    if (this.open && e.key === 'Escape') this.closeModal();
  }
}

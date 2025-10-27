import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { SplitByCommaPipe } from '../../split-by-comma.pipe';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, TranslocoModule, SplitByCommaPipe],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit, OnDestroy {
  open = false;
  cv: any | null = null;
  private sub?: Subscription;

  constructor(
    private transloco: TranslocoService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.sub = this.transloco.selectTranslateObject('cv').subscribe((obj) => {
      this.cv = obj;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  openModal() {
    this.open = true;
    this.document.body.style.overflow = 'hidden';
    this.document.body.classList.add('modal-open');
  }

  closeModal() {
    this.open = false;
    this.document.body.style.overflow = '';
    this.document.body.classList.remove('modal-open');
  }

  onBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('cv-backdrop')) {
      this.closeModal();
    }
  }

  onKey(e: KeyboardEvent) {
    if (this.open && e.key === 'Escape') this.closeModal();
  }

  private assetUrl(relPath: string): string {
    return new URL(relPath, this.document.baseURI).toString();
  }

  async downloadPdf() {
    try {
      const url = this.assetUrl('assets/cv/DianaDurbacaCV.pdf');
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = this.document.createElement('a');
      a.href = blobUrl;
      a.download = 'Diana-Durbaca-CV.pdf';
      this.document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download CV failed:', err);
      window.open(this.assetUrl('assets/cv/DianaDurbacaCV.pdf'), '_blank');
    }
  }
}

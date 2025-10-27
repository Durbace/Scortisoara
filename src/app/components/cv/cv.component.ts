import { Component, OnDestroy, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { SplitByCommaPipe } from '../../split-by-comma.pipe';
// Import Modal class from bootstrap
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, TranslocoModule, SplitByCommaPipe],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit, OnDestroy {
  @ViewChild('cvModal', { static: true }) cvModalRef!: ElementRef<HTMLDivElement>;

  cv: any | null = null;
  private sub?: Subscription;
  private modal?: Modal;

  constructor(
    private transloco: TranslocoService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.sub = this.transloco.selectTranslateObject('cv').subscribe((obj) => {
      this.cv = obj;
    });

    // instantiate Bootstrap modal
    this.modal = new Modal(this.cvModalRef.nativeElement, {
      backdrop: true,          // or 'static' if you don’t want click-to-close
      keyboard: true,
      focus: true
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    // no manual cleanup needed; Bootstrap handles it
  }

  openModal() {
    this.modal?.show();
  }

  closeModal() {
    this.modal?.hide();
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

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

type RecipeCard = { title: string; slug: string; img: string; excerpt: string };

@Component({
  standalone: true,
  selector: 'app-retete',
  imports: [CommonModule, RouterModule],
  templateUrl: './retete.component.html',
  styleUrls: ['./retete.component.css'],
})
export class ReteteComponent {
  constructor(private router: Router) {}

  onBack() {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  recipes: RecipeCard[] = [
    {
      title: 'Rulouri cu scorțișoară (Cinnamon Rolls)',
      slug: 'rulouri-cu-scortisoara',
      img: 'assets/images/rulouri.jpg',
      excerpt:
        'Aluat pufos, umplutură generoasă de scorțișoară și glazură fină. Ideal pentru mic-dejun sau desert.',
    },
    {
      title: 'Granola cu scorțișoară și nuci',
      slug: 'granola-cu-scortisoara',
      img: 'assets/images/granola.jpg',
      excerpt:
        'Fulgi de ovăz crocanți, nuci prăjite, miere și scorțișoară. Perfectă cu iaurt sau lapte.',
    },
    {
      title: 'Latte cu scorțișoară (Cinnamon Latte)',
      slug: 'latte-cu-scortisoara',
      img: 'assets/images/latte.jpg',
      excerpt:
        'Espresso catifelat, lapte spumat și un praf de scorțișoară pentru un plus de aromă caldă.',
    },
    {
      title: 'Mere coapte cu scorțișoară și miere',
      slug: 'mere-coapte-cu-scortisoara',
      img: 'assets/images/mere-coapte.jpg',
      excerpt:
        'Mere coapte lent, umplute cu nuci și miere, accentuate cu scorțișoară. Desert simplu și reconfortant.',
    },
    {
      title: 'Cookies cu ciocolată și scorțișoară',
      slug: 'cookies-ciocolata-scortisoara',
      img: 'assets/images/cookies.jpg',
      excerpt:
        'Biscuiți moi cu chipsuri de ciocolată și note calde de scorțișoară. Se fac rapid și dispar instant!',
    },
    {
      title: 'Curry de dovleac cu scorțișoară',
      slug: 'curry-dovleac-scortisoara',
      img: 'assets/images/curry.jpg',
      excerpt:
        'Cremozitate de dovleac, lapte de cocos și un amestec de condimente în care scorțișoara iese discret în evidență.',
    },
  ];
}

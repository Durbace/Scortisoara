import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

type Recipe = {
  title: string;
  slug: string;
  img: string;
  excerpt: string;
  ingredients: string[];
  steps: string[];
  prep?: string;
  cook?: string;
  servings?: string;
};

@Component({
  standalone: true,
  selector: 'app-retete',
  imports: [CommonModule, RouterModule],
  templateUrl: './retete.component.html',
  styleUrls: ['./retete.component.css'],
})
export class ReteteComponent implements AfterViewInit {
  constructor(private router: Router) {}

  @ViewChild('modalCloseBtn') modalCloseBtn!: ElementRef<HTMLButtonElement>;

  onBack() {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  modalOpen = false;
  activeRecipe: Recipe | null = null;

  openModal(slug: string) {
    const r = this.recipes.find(x => x.slug === slug) || null;
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

  ngAfterViewInit() {
  }

  recipes: Recipe[] = [
    {
      title: 'Rulouri cu scorțișoară (Cinnamon Rolls)',
      slug: 'rulouri-cu-scortisoara',
      img: 'assets/images/rulouri.jpg',
      excerpt:
        'Aluat pufos, umplutură generoasă de scorțișoară și glazură fină. Ideal pentru mic-dejun sau desert.',
      prep: '20 min',
      cook: '25–30 min',
      servings: '12 rulouri',
      ingredients: [
        '500 g făină albă',
        '7 g drojdie uscată',
        '250 ml lapte călduț',
        '60 g zahăr',
        '1 ou + 1 gălbenuș',
        '60 g unt moale + 40 g topit (umplutură)',
        '3–4 linguri scorțișoară pudră',
        '80–100 g zahăr brun',
        '1 praf de sare',
        'Glazură: 120 g cremă de brânză, 40 g unt, 100 g zahăr pudră, vanilie'
      ],
      steps: [
        'Amestecă laptele, drojdia și 1 linguriță zahăr; lasă 5–10 min până face spumă.',
        'Frământă făina cu zahăr, sare, oul, laptele cu drojdie și 60 g unt moale. Lasă la dospit 60–90 min.',
        'Întinde aluatul în dreptunghi, unge cu 40 g unt topit, presară zahăr brun + scorțișoară.',
        'Rulează strâns, taie 12 felii, pune în tavă. Dospire 30 min.',
        'Coace la 180°C, 25–30 min. Mixează glazura și întinde pe rulouri calde.'
      ]
    },
    {
      title: 'Granola cu scorțișoară și nuci',
      slug: 'granola-cu-scortisoara',
      img: 'assets/images/granola.jpg',
      excerpt:
        'Fulgi de ovăz crocanți, nuci prăjite, miere și scorțișoară. Perfectă cu iaurt sau lapte.',
      prep: '10 min',
      cook: '22–28 min',
      servings: 'aprox. 10 porții',
      ingredients: [
        '300 g fulgi de ovăz',
        '120 g nuci (migdale/nuci/pecan), tocate mare',
        '60 g semințe (dovleac / floarea-soarelui)',
        '1–2 linguri scorțișoară pudră',
        '80 ml ulei cocos sau rapiță',
        '120 ml miere sau sirop arțar',
        '1 praf de sare',
        'Opțional: stafide/merişoare după coacere'
      ],
      steps: [
        'Amestecă ovăzul, nucile, semințele, scorțișoara și sarea.',
        'Într-un bol, combină uleiul cu mierea; toarnă peste mix și amestecă.',
        'Întinde uniform pe tavă cu hârtie de copt. Coace la 160–170°C 22–28 min, amestecând la jumătate.',
        'Lasă să se răcească (se întărește), apoi adaugă fructele uscate.'
      ]
    },
    {
      title: 'Latte cu scorțișoară (Cinnamon Latte)',
      slug: 'latte-cu-scortisoara',
      img: 'assets/images/latte.jpg',
      excerpt:
        'Espresso catifelat, lapte spumat și un praf de scorțișoară pentru un plus de aromă caldă.',
      prep: '5 min',
      cook: '—',
      servings: '1 porție',
      ingredients: [
        '1 shot espresso (30–40 ml)',
        '200 ml lapte (sau alternativă vegetală)',
        '½ linguriță scorțișoară pudră',
        '1–2 lingurițe zahăr sau sirop (după gust)'
      ],
      steps: [
        'Îndulcește espresso-ul după gust.',
        'Încălzește laptele și spumează-l.',
        'Toarnă laptele peste espresso. Presară scorțișoară deasupra. Servește imediat.'
      ]
    },
    {
      title: 'Mere coapte cu scorțișoară și miere',
      slug: 'mere-coapte-cu-scortisoara',
      img: 'assets/images/mere-coapte.jpg',
      excerpt:
        'Mere coapte lent, umplute cu nuci și miere, accentuate cu scorțișoară. Desert simplu și reconfortant.',
      prep: '10 min',
      cook: '25–35 min',
      servings: '4 porții',
      ingredients: [
        '4 mere tari (ionatan/braeburn)',
        '40 g nuci tocate',
        '2–3 linguri miere',
        '1 linguriță scorțișoară',
        '1 praf de vanilie',
        '10 g unt'
      ],
      steps: [
        'Scoate cotorul merelor fără a le străpunge complet.',
        'Umple cu nuci + miere + scorțișoară + vanilie.',
        'Pune o bucățică de unt deasupra și coace la 180°C, 25–35 min, până sunt moi și lucioase.'
      ]
    },
    {
      title: 'Cookies cu ciocolată și scorțișoară',
      slug: 'cookies-ciocolata-scortisoara',
      img: 'assets/images/cookies.jpg',
      excerpt:
        'Biscuiți moi cu chipsuri de ciocolată și note calde de scorțișoară. Se fac rapid și dispar instant!',
      prep: '15 min',
      cook: '10–12 min',
      servings: 'aprox. 20 bucăți',
      ingredients: [
        '120 g unt moale',
        '120 g zahăr + 80 g zahăr brun',
        '1 ou mare',
        '220 g făină',
        '1 linguriță praf de copt',
        '1 linguriță scorțișoară',
        '1 praf de sare',
        '150 g chipsuri de ciocolată'
      ],
      steps: [
        'Bate untul cu zaharurile până cremos, încorporează oul.',
        'Adaugă ingredientele uscate și apoi chipsurile.',
        'Formează bile, așază pe tavă, coace la 180°C 10–12 min. Răcește pe grătar.'
      ]
    },
    {
      title: 'Curry de dovleac cu scorțișoară',
      slug: 'curry-dovleac-scortisoara',
      img: 'assets/images/curry.jpg',
      excerpt:
        'Cremozitate de dovleac, lapte de cocos și un amestec de condimente în care scorțișoara iese discret în evidență.',
      prep: '10 min',
      cook: '20 min',
      servings: '4 porții',
      ingredients: [
        '600 g dovleac cuburi',
        '1 ceapă mică, tocată',
        '2 căței usturoi',
        '1 linguriță pastă curry sau pudră',
        '½ linguriță scorțișoară',
        '250 ml lapte de cocos',
        '250 ml supă legume',
        '2 linguri ulei',
        'Sare, piper; coriandru proaspăt pentru servire'
      ],
      steps: [
        'Călește ceapa în ulei 2–3 min; adaugă usturoi, curry, scorțișoară – 30 sec.',
        'Adaugă dovleacul, supa și laptele de cocos; fierbe 15–20 min, până se înmoaie.',
        'Potrivește de sare/piper; servește cu orez și coriandru.'
      ]
    }
  ];
}

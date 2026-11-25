// Completed ALSTAR projects ("Obyektlar"), supplied by ALSTAR as Editorial
// Gallery sets: 01 = whole building (1600×1000), 02–03 = façade / ACP details (800×490).
// Images: assets-src/gallery-<slug>-{1,2,3}.png → `npm run images`.
//
// More projects can be added from the admin panel (alstar-backend → Loyihalar):
// the projects page loads them from the API after hydration (see useProjects).
import type { ImageName } from '../config/images';
import type { Locale } from '../i18n';

type Text = Record<Locale, string>;

export interface Project {
  slug: string;
  /** TODO(ALSTAR): confirm the official names of the projects marked `nameToConfirm`. */
  title: Text;
  /** What the photos show — finishes / panel colours used. */
  finish: Text;
  nameToConfirm?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'nyuport-g1',
    title: { uz: 'Nyuport — G1', ru: 'Ньюпорт — Г1', en: 'Newport — G1' },
    finish: {
      uz: 'Och kulrang va antratsit panellar',
      ru: 'Светло-серые и антрацитовые панели',
      en: 'Light grey and anthracite panels',
    },
  },
  {
    slug: 'kumushkon',
    title: { uz: 'Kumushkon obyekti', ru: 'Объект в Кумушкане', en: 'Kumushkon project' },
    finish: {
      uz: 'Yog‘och teksturasi va perforatsiyalangan panellar',
      ru: 'Текстура дерева и перфорированные панели',
      en: 'Wood-grain and perforated panels',
    },
  },
  {
    slug: 'ornament',
    title: { uz: 'Milliy naqshli bino', ru: 'Здание с национальным орнаментом', en: 'Building with national ornament' },
    finish: {
      uz: 'Och bej panellar va naqshli qoplama',
      ru: 'Светло-бежевые панели и орнамент',
      en: 'Light beige panels with ornament',
    },
    nameToConfirm: true,
  },
  {
    slug: 'pavilion',
    title: { uz: 'Savdo paviloni', ru: 'Торговый павильон', en: 'Retail pavilion' },
    finish: {
      uz: 'Sariq va antratsit panellar',
      ru: 'Жёлтые и антрацитовые панели',
      en: 'Yellow and anthracite panels',
    },
    nameToConfirm: true,
  },
  {
    slug: 'glass-office',
    title: { uz: 'Ofis binosi', ru: 'Офисное здание', en: 'Office building' },
    finish: {
      uz: 'Oq, antratsit va yog‘och teksturali panellar',
      ru: 'Белые, антрацитовые и «под дерево» панели',
      en: 'White, anthracite and wood-grain panels',
    },
    nameToConfirm: true,
  },
  {
    slug: 'white-tower',
    title: { uz: 'Ko‘p qavatli bino', ru: 'Многоэтажное здание', en: 'Multi-storey building' },
    finish: {
      uz: 'Oq panellar va shisha fasad',
      ru: 'Белые панели и стеклянный фасад',
      en: 'White panels and glazed façade',
    },
    nameToConfirm: true,
  },
];

export const galleryImage = (slug: string, n: 1 | 2 | 3) => `gallery-${slug}-${n}` as ImageName;

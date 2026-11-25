// Paint / coating plant page ("kraska zavodi"). Reference sites from ALSTAR:
// albaililai.com and Liton — coil-coating manufacturers that show colour series
// with real-life examples.
//
// TODO(ALSTAR): Otabek will send the plant's official name, slogan, "About us"
// text and plant photos. Until then the texts in i18n `factory.*` are neutral
// working copy and the photos are existing ALSTAR images.
import type { ImageName } from '../config/images';

/** RAL Classic colours (approximate sRGB values — screens never match a printed RAL card exactly). */
export interface RalColour {
  code: string;
  hex: string;
  /** i18n key group in `factory.ralGroups` */
  group: 'white' | 'grey' | 'dark' | 'red' | 'blue' | 'green' | 'yellow' | 'brown';
}

export const ralColours: RalColour[] = [
  { code: 'RAL 9016', hex: '#f1f0ea', group: 'white' },
  { code: 'RAL 9010', hex: '#f1ece1', group: 'white' },
  { code: 'RAL 1015', hex: '#e6d2b5', group: 'white' },
  { code: 'RAL 7035', hex: '#cbd0cc', group: 'grey' },
  { code: 'RAL 9006', hex: '#a1a1a0', group: 'grey' },
  { code: 'RAL 7040', hex: '#9da3a6', group: 'grey' },
  { code: 'RAL 9007', hex: '#878581', group: 'grey' },
  { code: 'RAL 7024', hex: '#474a50', group: 'dark' },
  { code: 'RAL 7016', hex: '#383e42', group: 'dark' },
  { code: 'RAL 9005', hex: '#0e0e10', group: 'dark' },
  { code: 'RAL 3020', hex: '#c1121c', group: 'red' },
  { code: 'RAL 3005', hex: '#5e2028', group: 'red' },
  { code: 'RAL 5015', hex: '#2271b3', group: 'blue' },
  { code: 'RAL 5010', hex: '#0e4c92', group: 'blue' },
  { code: 'RAL 6018', hex: '#48a43f', group: 'green' },
  { code: 'RAL 6005', hex: '#0f4336', group: 'green' },
  { code: 'RAL 1021', hex: '#eec900', group: 'yellow' },
  { code: 'RAL 2004', hex: '#e25303', group: 'yellow' },
  { code: 'RAL 8017', hex: '#45302b', group: 'brown' },
  { code: 'RAL 8014', hex: '#4a3526', group: 'brown' },
];

/** Colour series: finish swatch + where it looks good in real life. */
export const series: { id: string; swatch: ImageName; example: ImageName }[] = [
  { id: 'solid', swatch: 'finish-matte', example: 'gallery-nyuport-g1-1' },
  { id: 'metallic', swatch: 'finish-metallic', example: 'article-pvdf' },
  { id: 'wood', swatch: 'finish-wood', example: 'gallery-kumushkon-2' },
  { id: 'marble', swatch: 'finish-marble', example: 'article-interior' },
  { id: 'mirror', swatch: 'finish-mirror', example: 'article-architecture' },
  { id: 'sparkling', swatch: 'finish-sparkling', example: 'gallery-pavilion-1' },
];

/** "In real life" gallery — façades and interiors. */
export const lifeGallery: ImageName[] = [
  'gallery-glass-office-1',
  'article-interior',
  'gallery-ornament-1',
  'article-finish',
  'gallery-white-tower-1',
];

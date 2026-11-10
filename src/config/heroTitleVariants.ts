/**
 * TEMPORARY — five candidate hero headlines (uz) for the client to choose from.
 * This is not a slider: the page shows one of them. Preview each one with
 * `/?sarlavha=1` … `/?sarlavha=5`; without the parameter variant 1 (the one in
 * uz.ts) is shown. Once the client picks one, put it into `uz.hero.title` and
 * delete this file together with the preview code in Hero.tsx.
 */
export const heroTitleVariants: { title: string[]; accentLine: number }[] = [
  { title: ['MUKAMMALLIKKA', 'YANGI QADAM.'], accentLine: 1 },
  { title: ['KELAJAKNI', 'BIRGA QURAMIZ.'], accentLine: 1 },
  { title: ['HAR BIR FASADDA', 'MUKAMMALLIK.'], accentLine: 1 },
  { title: ['HAR BIR FASADDA', 'SIFAT VA ISHONCH.'], accentLine: 1 },
  // non-breaking space keeps the dash on the same line as the word
  { title: ['MUKAMMALLIK —', 'HAR BIR DETALDA.'], accentLine: 1 },
];

export const heroTitleParam = 'sarlavha';

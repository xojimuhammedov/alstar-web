import { Certificates } from '../sections/Certificates';
import { Colours } from '../sections/Colours';
import { Cta } from '../sections/Cta';
import { Faq } from '../sections/Faq';
import { Hero } from '../sections/Hero';
import { News } from '../sections/News';
import { Products } from '../sections/Products';
import { Projects } from '../sections/Projects';
import { Technical } from '../sections/Technical';
import { Why } from '../sections/Why';

export function HomePage() {
  return (
    <>
      <Hero />
      <Why />
      <Products />
      <Colours />
      <Projects />
      <News />
      <Technical />
      <Certificates index="07" />
      <Faq />
      <Cta />
    </>
  );
}

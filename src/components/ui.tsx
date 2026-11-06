import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { imageSet, type ImageName } from '../config/images';

/** Staggered reveal delay, as used throughout the design. */
export const delay = (ms: number): CSSProperties | undefined => (ms ? { transitionDelay: `${ms}ms` } : undefined);

export const Arrow = () => <span aria-hidden="true">→</span>;

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'outline' | 'red';
  arrow?: boolean;
}

export function Button({ variant = 'outline', arrow = true, className = '', children, ...rest }: ButtonProps) {
  return (
    <a className={`btn ${variant === 'red' ? 'red' : ''} ${className}`.trim()} {...rest}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

interface ImgProps {
  name: ImageName;
  alt: string;
  sizes: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority (LCP). */
  priority?: boolean;
}

export function Img({ name, alt, sizes, className, priority = false }: ImgProps) {
  return (
    <img
      {...imageSet(name)}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // React's server renderer also emits a matching <link rel="preload"> for this image.
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}

interface SectionHeadProps {
  index: string;
  title: string;
  titleId: string;
  children?: ReactNode;
  intro?: string;
}

export function SectionHead({ index, title, titleId, children, intro }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <div className="eyebrow" aria-hidden="true">
          {index} /
        </div>
        <h2 className="title" id={titleId}>
          {title}
        </h2>
        {intro && <p className="small-copy section-intro">{intro}</p>}
      </div>
      {children}
    </div>
  );
}

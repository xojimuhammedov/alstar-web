import { Fragment, type ReactNode } from 'react';

/** `**bold**` → <strong>. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[‘’ʻʼ'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Headings of an article body, for the table of contents. */
export const headingsOf = (body: string) =>
  body
    .split(/\n{2,}/)
    .filter((b) => b.startsWith('## '))
    .map((b) => ({ id: slugify(b.slice(3)), text: b.slice(3) }));

/** Renders the article body format: blank-line separated paragraphs, "## " sub-headings. */
export function ArticleBody({ body }: { body: string }) {
  return (
    <div className="prose">
      {body.split(/\n{2,}/).map((block, i) =>
        block.startsWith('## ') ? (
          <h2 key={i} id={slugify(block.slice(3))}>
            {block.slice(3)}
          </h2>
        ) : (
          <p key={i} className={i === 0 ? 'lead' : undefined}>
            {inline(block)}
          </p>
        ),
      )}
    </div>
  );
}

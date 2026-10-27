import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import PageHeader from '@/components/ui/PageHeader';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '개인정보 처리방침',
  description: 'Infinite Studio 개인정보 처리방침',
};

const slug = (text: string) => `section-${text.split('.')[0].trim()}`;

function textOf(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  return '';
}

export default async function PrivacyPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), 'src/content/privacy.md'),
    'utf8'
  );
  const headings = [...content.matchAll(/^###\s+(.+)$/gm)].map((m) => m[1]);
  const effective = content.match(/본 방침은 (.+?)부터 시행됩니다/)?.[1];

  return (
    <>
      <PageHeader
        title="개인정보 처리방침"
        lead={effective ? `${effective}부터 시행합니다.` : undefined}
      />

      <div className={`container ${styles.layout}`}>
        <nav className={styles.toc} aria-label="목차">
          <ol>
            {headings.map((heading) => (
              <li key={heading}>
                <a href={`#${slug(heading)}`}>{heading}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className={styles.prose}>
          <ReactMarkdown
            components={{
              h3: ({ children }) => (
                <h2 id={slug(textOf(children))}>{children}</h2>
              ),
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </>
  );
}

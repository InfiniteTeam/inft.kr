import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight } from '@/components/icons';
import Reveal from './Reveal';
import styles from './SectionHeader.module.scss';

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  link?: { href: string; label: string };
  id?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  link,
  id,
  className,
}: Props) {
  return (
    <Reveal className={clsx(styles.header, className)}>
      <div className={styles.lead}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
      </div>
      {(description || link) && (
        <div className={styles.side}>
          {description && <p className={styles.description}>{description}</p>}
          {link && (
            <Link href={link.href} className={styles.link}>
              {link.label}
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
    </Reveal>
  );
}

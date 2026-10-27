import Link from 'next/link';
import clsx from 'clsx';
import styles from './SectionHeader.module.scss';

interface Props {
  title: React.ReactNode;
  lead?: React.ReactNode;
  link?: { href: string; label: string };
  id?: string;
  className?: string;
}

/** 섹션 제목 묶음. 언제나 1열 왼쪽 끝에 붙습니다. */
export default function SectionHeader({
  title,
  lead,
  link,
  id,
  className,
}: Props) {
  return (
    <div className={clsx(styles.header, className)}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
      {link && (
        <Link href={link.href} className={styles.link}>
          {link.label}
        </Link>
      )}
    </div>
  );
}

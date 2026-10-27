import clsx from 'clsx';
import styles from './PageHeader.module.scss';

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  size?: 'lg' | 'md';
}

export default function PageHeader({
  eyebrow,
  title,
  lead,
  children,
  size = 'lg',
}: Props) {
  return (
    <header className={clsx(styles.header, styles[size])}>
      <div className={styles.halo} aria-hidden="true" />
      <div className="container">
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {(lead || children) && (
          <div className={styles.bottom}>
            {lead && <p className={styles.lead}>{lead}</p>}
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

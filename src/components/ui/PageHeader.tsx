import styles from './PageHeader.module.scss';

interface Props {
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}

/** 하위 페이지의 첫 화면: 빈폴체 제목, 한 줄 설명, 필요하면 동작 하나 */
export default function PageHeader({ title, lead, children }: Props) {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </header>
  );
}

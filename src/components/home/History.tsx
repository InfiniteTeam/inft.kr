import history from '@/data/history';
import { yearsSinceFounding } from '@/data/site';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './History.module.scss';

export default function History() {
  const highlights = history.filter((item) => item.highlight);

  return (
    <section className={styles.section} aria-labelledby="history-title">
      <div className="container">
        <SectionHeader
          id="history-title"
          title={`${yearsSinceFounding()}년 동안 만들어 왔습니다`}
          link={{ href: '/about#history', label: '전체 연혁 보기' }}
        />

        <ol className={styles.rows}>
          {highlights.map((item) => (
            <li key={`${item.year}-${item.month}-${item.content}`} data-reveal>
              <time
                className={styles.year}
                dateTime={
                  item.month
                    ? `${item.year}-${String(item.month).padStart(2, '0')}`
                    : String(item.year)
                }
              >
                {item.year}
              </time>
              <span className={styles.month}>
                {item.month && `${item.month}월`}
              </span>
              <span className={styles.content}>{item.content}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

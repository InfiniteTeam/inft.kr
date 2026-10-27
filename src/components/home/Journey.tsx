import history from '@/data/history';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './Journey.module.scss';

export default function Journey() {
  const highlights = history.filter((item) => item.highlight);
  const first = history[0].year;

  return (
    <section className={styles.section} aria-labelledby="journey-title">
      <div className="container">
        <SectionHeader
          id="journey-title"
          eyebrow="걸어온 길"
          title={`${first}년부터,\n한 걸음씩`}
          description="엔트리 퍼즐 게임에서 시작해 디스코드 봇과 게임으로. 지금까지의 주요 순간들입니다."
          link={{ href: '/about#history', label: '전체 연혁' }}
        />

        <ol className={styles.track}>
          {highlights.map((item, i) => (
            <Reveal
              as="li"
              key={`${item.year}-${item.month}-${i}`}
              className={styles.item}
              delay={i * 70}
            >
              <span className={styles.year}>{item.year}</span>
              <span className={styles.node} aria-hidden="true" />
              <span className={styles.month}>{item.month}월</span>
              <p className={styles.content}>{item.content}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

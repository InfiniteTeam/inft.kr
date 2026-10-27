import type { Metadata } from 'next';
import members from '@/data/members';
import history, { groupByYear } from '@/data/history';
import MemberCard from '@/components/about/MemberCard';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '소개',
  description:
    'Infinite Studio는 2018년 청소년 엔트리 개발팀으로 시작해 디스코드 봇과 게임을 만드는 팀입니다.',
};

const practices = [
  {
    title: '디스코드 봇',
    body: '한국 최초의 대시보드형 관리봇 Aztra와 방치형 게임 Idle Factory처럼, 디스코드 안에서 쓰는 봇을 만듭니다.',
  },
  {
    title: '웹 서비스',
    body: 'Aztra 웹 대시보드처럼, 봇을 더 쉽게 다루기 위한 웹 서비스를 함께 설계하고 개발합니다.',
  },
  {
    title: '직접 운영',
    body: '서버를 직접 관리하며 서비스를 운영합니다. 서비스 상태는 status.inft.kr에서 누구나 볼 수 있습니다.',
  },
];

export default function AboutPage() {
  const years = groupByYear(history);

  return (
    <>
      <PageHeader title={'디스코드 봇을 만들고,\n직접 운영합니다'} />

      <section className={styles.practice} aria-label="하는 일">
        <div className="container">
          <ul className={styles.practices}>
            {practices.map((item) => (
              <li key={item.title} data-reveal>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.well}`}
        aria-labelledby="members"
      >
        <div className="container">
          <SectionHeader
            id="members"
            title={`지금은 ${members.length}명이 함께 합니다`}
          />
          <ul className={styles.members}>
            {members.map((member) => (
              <li key={member.name} data-reveal>
                <MemberCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="history">
        <div className="container">
          <SectionHeader id="history" title="우리가 걸어온 발자취" />
          <ol className={styles.history}>
            {years.map(({ year, entries }) => (
              <li key={year} className={styles.year} data-reveal>
                <h3 className={styles.yearLabel}>{year}</h3>
                <ul className={styles.entries}>
                  {entries.map((entry, i) => (
                    <li key={i}>
                      <span className={styles.month}>{entry.month}월</span>
                      <span>{entry.content}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

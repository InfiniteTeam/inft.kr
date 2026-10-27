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
    body: '서버 관리 봇 Aztra부터 2048 미니게임 2¹², 방치형 게임 Idle Factory까지 디스코드 안에서 쓰는 봇을 만듭니다.',
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
      <PageHeader
        title={'2018년부터\n만들어 온 팀'}
        lead="엔트리 작품을 만들던 청소년 개발팀 InfiniteTeam에서 시작해, 2020년부터 디스코드 봇과 게임을 만들고 운영합니다."
      />

      <section className={styles.section} aria-labelledby="practice">
        <div className="container">
          <SectionHeader id="practice" title="봇을 만들고, 직접 운영합니다" />
          <ul className={styles.practices}>
            {practices.map((item) => (
              <li key={item.title}>
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
            title={`${members.length}명의 팀원`}
            lead="디스코드 아이콘을 누르면 아이디가 복사됩니다."
          />
          <ul className={styles.members}>
            {members.map((member) => (
              <li key={member.name}>
                <MemberCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="history">
        <div className="container">
          <SectionHeader id="history" title="2018년부터 지금까지" />
          <ol className={styles.history}>
            {years.map(({ year, entries }) => (
              <li key={year} className={styles.year}>
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

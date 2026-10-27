import type { Metadata } from 'next';
import members from '@/data/members';
import history, { groupByYear } from '@/data/history';
import { site } from '@/data/site';
import MemberCard from '@/components/about/MemberCard';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
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
    body: '서버 관리 봇 Aztra부터 2048 미니게임 2¹², 방치형 게임 Idle Factory까지. 디스코드 안에서 쓰이는 봇을 만듭니다.',
  },
  {
    title: '웹 서비스',
    body: 'Aztra 웹 대시보드처럼, 봇을 더 쉽게 다룰 수 있도록 웹 서비스도 함께 설계하고 개발합니다.',
  },
  {
    title: '직접 운영',
    body: '서버를 직접 관리하며 서비스를 운영합니다. 서비스 상태는 status.inft.kr에서 누구나 확인할 수 있습니다.',
  },
];

export default function AboutPage() {
  const years = groupByYear(history);
  const since = `${site.founded.year}.${String(site.founded.month).padStart(2, '0')}`;

  return (
    <>
      <PageHeader
        eyebrow="소개"
        title={'2018년부터,\n함께 만들어 온 팀'}
        lead="Infinite Studio는 엔트리 작품을 만들던 청소년 개발팀 InfiniteTeam에서 시작했습니다. 2020년 디스코드 봇 개발팀으로 새롭게 출발해, Aztra와 2¹², Idle Factory 같은 서비스를 직접 만들고 운영하고 있습니다."
      />

      <section className={styles.mission} aria-label="미션">
        <div className="container">
          <Reveal className={styles.missionInner}>
            <p className={styles.missionLabel}>Mission</p>
            <p className={styles.missionText}>
              무한한 미래를
              <br />
              만들어 갑니다
            </p>
            <p className={styles.since}>Since {since}</p>
          </Reveal>

          <ul className={styles.practices} aria-label="하는 일">
            {practices.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80}>
                <span className={styles.index}>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="members">
        <div className="container">
          <SectionHeader
            id="members"
            eyebrow="팀원"
            title={`${members.length}명이 함께\n만들고 있습니다`}
            description="디스코드 아이콘을 누르면 아이디가 복사됩니다."
          />
          <ul className={styles.members}>
            {members.map((member, i) => (
              <Reveal as="li" key={member.name} delay={(i % 4) * 60}>
                <MemberCard member={member} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="history">
        <div className="container">
          <SectionHeader id="history" eyebrow="연혁" title="걸어온 길" />
          <ol className={styles.history}>
            {years.map(({ year, entries }) => (
              <Reveal as="li" key={year} className={styles.year}>
                <h3 className={styles.yearLabel}>{year}</h3>
                <ul className={styles.entries}>
                  {entries.map((entry, i) => (
                    <li key={i}>
                      <span className={styles.month}>{entry.month}월</span>
                      <span>{entry.content}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

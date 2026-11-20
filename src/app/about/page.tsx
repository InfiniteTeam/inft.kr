import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { site, yearsSinceFounding } from '@/data/site';
import members from '@/data/members';
import history, { groupByYear } from '@/data/history';
import MemberCard from '@/components/about/MemberCard';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './page.module.scss';

export const metadata: Metadata = pageMetadata(
  '소개',
  `디스코드 봇을 만들고 직접 운영하는 Infinite Studio의 팀원과, ${yearsSinceFounding()}년 동안 걸어온 발자취입니다.`,
  '/about'
);

// 설명의 "N년 동안"이 다시 배포하지 않아도 맞도록 하루에 한 번 새로 그립니다.
export const revalidate = 86400;

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
    body: '24시간 자동으로 서비스를 점검하고, 문제가 생기면 바로 해결합니다. 서버도 팀이 직접 관리합니다.',
  },
];

export default function AboutPage() {
  const years = groupByYear(history);

  return (
    <>
      <PageHeader title={site.mission} lead={site.missionLead} />

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
                      <span className={styles.month}>
                        {entry.month && `${entry.month}월`}
                      </span>
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

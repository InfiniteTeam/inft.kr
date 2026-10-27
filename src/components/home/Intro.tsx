import members from '@/data/members';
import projects from '@/data/projects';
import { site } from '@/data/site';
import CountUp from '@/components/ui/CountUp';
import Reveal from '@/components/ui/Reveal';
import ScrollText from '@/components/ui/ScrollText';
import styles from './Intro.module.scss';

const manifesto =
  '2018년 여름, *엔트리에서 퍼즐 게임을 만들던* 청소년 개발팀으로 시작했습니다. 2020년 디스코드로 무대를 옮긴 뒤로는 *4,000개가 넘는 서버가 선택한 관리 봇*과 누구나 가볍게 즐기는 게임을 만들고 있습니다.';

export default function Intro() {
  const live = projects.filter((project) => project.status === 'active');

  const stats = [
    {
      value: <span>{site.founded.year}</span>,
      label: '팀이 시작된 해',
      note: `${site.founded.year}.${String(site.founded.month).padStart(2, '0')} 엔트리 개발팀으로 출발`,
    },
    {
      value: <CountUp value={4000} suffix="+" />,
      label: 'Aztra를 도입한 서버',
      note: '2022년 7월 기준',
    },
    {
      value: <CountUp value={live.length} duration={900} />,
      label: '운영 중인 서비스',
      note: live.map((project) => project.name).join(' · '),
    },
    {
      value: <CountUp value={members.length} duration={1100} />,
      label: '함께 만드는 팀원',
      note: '개발 · 디자인 · 커뮤니티',
    },
  ];

  return (
    <section className={styles.section} aria-labelledby="intro-title">
      <div className="container">
        <div className={styles.manifesto}>
          <Reveal className={styles.label}>
            <h2 id="intro-title">Infinite Studio</h2>
            <p>Since 2018</p>
          </Reveal>
          <ScrollText text={manifesto} className={styles.text} />
        </div>

        <dl className={styles.stats}>
          {stats.map((stat, i) => (
            <Reveal key={stat.label} className={styles.stat} delay={i * 80}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
              <dd className={styles.statNote}>{stat.note}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

import members from '@/data/members';
import projects from '@/data/projects';
import ScrollText from '@/components/ui/ScrollText';
import styles from './Record.module.scss';

const statement =
  '2018년 여름, *엔트리에서 퍼즐 게임을 만들던* 청소년 개발팀으로 시작했습니다. 2020년 디스코드로 무대를 옮긴 뒤로는 *서버를 관리하는 봇과 가볍게 즐기는 게임*을 만들고 있습니다.';

/** 소개 문장 하나와, 팀이 준 숫자 넷 */
export default function Record() {
  const live = projects.filter((project) => project.status === 'active');

  const figures = [
    {
      value: '13,000+',
      label: 'Aztra를 도입한 서버',
      note: '2026년 10월 기준',
    },
    { value: '900,000+', label: 'Aztra 사용자', note: '2026년 10월 기준' },
    {
      value: String(live.length),
      label: '운영 중인 서비스',
      note: live.map((project) => project.name).join(', '),
    },
    { value: String(members.length), label: '함께 만드는 팀원', note: null },
  ];

  return (
    <section className={styles.section} aria-label="Infinite Studio 소개">
      <div className="container">
        <ScrollText text={statement} className={styles.statement} />

        <dl className={styles.figures}>
          {figures.map((figure) => (
            <div key={figure.label} className={styles.figure} data-reveal>
              <dt>{figure.label}</dt>
              <dd className={styles.value}>{figure.value}</dd>
              {figure.note && <dd className={styles.note}>{figure.note}</dd>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

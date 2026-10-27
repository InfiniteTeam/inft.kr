import members from '@/data/members';
import Avatar from '@/components/ui/Avatar';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './Team.module.scss';

export default function Team() {
  return (
    <section className={styles.section} aria-labelledby="team-title">
      <div className="container">
        <SectionHeader
          id="team-title"
          eyebrow="팀"
          title={'함께 만드는\n사람들'}
          description="개발자, 디자이너, 커뮤니티 매니저. 각자의 자리에서 같은 서비스를 만듭니다."
          link={{ href: '/about#members', label: '팀원 자세히 보기' }}
        />

        <ul className={styles.grid}>
          {members.map((member, i) => (
            <Reveal
              as="li"
              key={member.name}
              className={styles.member}
              delay={(i % 4) * 60}
            >
              <Avatar member={member} size={72} ring />
              <div>
                <p className={styles.name}>
                  {member.name}
                  <span>{member.kr}</span>
                </p>
                <p className={styles.role}>{member.role.join(' · ')}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import members from '@/data/members';
import Avatar from '@/components/ui/Avatar';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './Team.module.scss';

export default function Team() {
  return (
    <section className={styles.section} aria-labelledby="team-title">
      <div className="container">
        <SectionHeader
          id="team-title"
          title={`지금은 ${members.length}명이 함께 합니다`}
          link={{ href: '/about#members', label: '팀원 소개 보기' }}
        />

        <ul className={styles.grid}>
          {members.map((member) => (
            <li key={member.name} className={styles.member} data-reveal>
              <Avatar member={member} size={56} />
              <div>
                <p className={styles.name}>
                  {member.kr}
                  <span lang="en">{member.name}</span>
                </p>
                <p className={styles.role}>{member.role.join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Image from 'next/image';
import type { Member } from '@/data/members';
import { DiscordIcon, GitHubIcon, MailIcon } from '@/components/icons';
import Avatar from '@/components/ui/Avatar';
import CopyButton from '@/components/ui/CopyButton';
import solvedac from '@/assets/solved-ac.png';
import styles from './MemberCard.module.scss';

export default function MemberCard({ member }: { member: Member }) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <Avatar member={member} size={56} />
        <div>
          <h3 className={styles.name}>
            {member.name}
            <span>{member.kr}</span>
          </h3>
          <p className={styles.role}>{member.role.join(', ')}</p>
        </div>
      </div>

      {member.motto && <p className={styles.motto}>“{member.motto}”</p>}

      <div className={styles.contact}>
        {member.discord && (
          <CopyButton
            value={member.discord}
            label={`${member.name}의 디스코드 아이디 복사`}
            className={styles.icon}
          >
            <DiscordIcon size={16} />
          </CopyButton>
        )}
        {member.github && (
          <a
            className={styles.icon}
            href={`https://github.com/${member.github}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name}의 GitHub`}
          >
            <GitHubIcon size={15} />
          </a>
        )}
        {member.email && (
          <a
            className={styles.icon}
            href={`mailto:${member.email}`}
            aria-label={`${member.name}에게 메일 보내기`}
          >
            <MailIcon size={16} />
          </a>
        )}
        {member.solvedac && (
          <a
            className={styles.icon}
            href={`https://solved.ac/profile/${member.solvedac}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name}의 solved.ac 프로필`}
          >
            <Image src={solvedac} alt="" width={16} height={16} />
          </a>
        )}
      </div>
    </article>
  );
}

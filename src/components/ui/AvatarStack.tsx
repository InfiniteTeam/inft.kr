import type { Member } from '@/data/members';
import Avatar from './Avatar';
import styles from './AvatarStack.module.scss';

interface Props {
  members: Member[];
  size?: number;
  max?: number;
}

export default function AvatarStack({ members, size = 28, max = 5 }: Props) {
  const shown = members.slice(0, max);
  const rest = members.length - shown.length;

  return (
    <span className={styles.stack}>
      <span className={styles.faces}>
        {shown.map((member) => (
          <span key={member.name} className={styles.face} title={member.name}>
            <Avatar member={member} size={size} />
          </span>
        ))}
        {rest > 0 && (
          <span
            className={styles.more}
            style={{ width: size, height: size }}
            aria-hidden="true"
          >
            +{rest}
          </span>
        )}
      </span>
      <span className={styles.label}>{members.length}명 참여</span>
    </span>
  );
}

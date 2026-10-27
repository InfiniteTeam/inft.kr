import type { Member } from '@/data/members';
import Avatar from './Avatar';
import styles from './AvatarStack.module.scss';

interface Props {
  members: Member[];
  size?: number;
  max?: number;
  /** 얼굴 옆에 "N명" 을 적을지 */
  count?: boolean;
}

export default function AvatarStack({
  members,
  size = 28,
  max = 5,
  count = true,
}: Props) {
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
      {count ? (
        <span className={styles.label}>{members.length}명</span>
      ) : (
        <span className="visually-hidden">{members.length}명</span>
      )}
    </span>
  );
}

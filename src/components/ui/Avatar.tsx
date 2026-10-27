import Image from 'next/image';
import clsx from 'clsx';
import type { Member } from '@/data/members';
import styles from './Avatar.module.scss';

interface Props {
  member: Member;
  size: number;
  className?: string;
}

export default function Avatar({ member, size, className }: Props) {
  return (
    <span
      className={clsx(styles.avatar, className)}
      style={{ width: size, height: size }}
    >
      {member.avatar ? (
        <Image
          src={member.avatar}
          alt=""
          width={size * 2}
          height={size * 2}
          sizes={`${size}px`}
        />
      ) : (
        <span className={styles.monogram} style={{ fontSize: size * 0.36 }}>
          {member.kr.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

import Image, { type StaticImageData } from 'next/image';
import clsx from 'clsx';
import styles from './ProjectAura.module.scss';

interface Props {
  icon: StaticImageData;
  /** corner: 카드 오른쪽 위에서 번지는 빛, center: 패널 가운데에 고이는 빛 */
  placement?: 'corner' | 'center';
}

/** 프로젝트 아이콘을 크게 흐려 만든, 그 프로젝트만의 배경 빛 */
export default function ProjectAura({ icon, placement = 'corner' }: Props) {
  return (
    <div className={clsx(styles.aura, styles[placement])} aria-hidden="true">
      <Image src={icon} alt="" fill sizes="320px" />
    </div>
  );
}

import Image from 'next/image';
import clsx from 'clsx';
import type { Project } from '@/data/projects';
import { findMembers } from '@/data/members';
import AvatarStack from '@/components/ui/AvatarStack';
import ProjectAura from '@/components/ui/ProjectAura';
import styles from './ProjectCard.module.scss';

interface Props {
  project: Project;
  lead?: boolean;
  className?: string;
}

export default function ProjectCard({ project, lead, className }: Props) {
  const active = project.status === 'active';

  return (
    <article className={clsx(styles.tile, lead && styles.lead, className)}>
      <ProjectAura icon={project.icon} />
      <div className={styles.top}>
        <Image
          className={styles.icon}
          src={project.icon}
          alt={`${project.name} 아이콘`}
          width={lead ? 96 : 64}
          height={lead ? 96 : 64}
          sizes={lead ? '96px' : '64px'}
        />
        <p className={styles.status}>{active ? '운영 중' : '개발 일시 중단'}</p>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.summary}>{project.summary}</p>
      </div>

      <dl className={styles.meta}>
        <div>
          <dt>분야</dt>
          <dd>{project.category}</dd>
        </div>
        <div>
          <dt>시작</dt>
          <dd className="tabular">{project.since}</dd>
        </div>
        <div>
          <dt>참여</dt>
          <dd>
            <AvatarStack
              members={findMembers(project.members)}
              size={24}
              max={4}
            />
          </dd>
        </div>
        {project.url && (
          <div>
            <dt>사이트</dt>
            <dd>
              <a href={project.url} target="_blank" rel="noreferrer">
                {new URL(project.url).host}
                <span className="visually-hidden"> (새 창)</span>
              </a>
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}

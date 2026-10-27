import Image from 'next/image';
import clsx from 'clsx';
import type { Project } from '@/data/projects';
import { findMembers } from '@/data/members';
import { ArrowUpRight } from '@/components/icons';
import AvatarStack from '@/components/ui/AvatarStack';
import Spotlight from '@/components/ui/Spotlight';
import styles from './ProjectCard.module.scss';

interface Props {
  project: Project;
  featured?: boolean;
  className?: string;
}

export default function ProjectCard({ project, featured, className }: Props) {
  const active = project.status === 'active';

  return (
    <Spotlight
      as="article"
      className={clsx(styles.card, featured && styles.featured, className)}
      style={{ '--tint': project.tint } as React.CSSProperties}
    >
      <div className={styles.aura} aria-hidden="true">
        <Image src={project.icon} alt="" fill sizes="200px" />
      </div>
      <div className={styles.sheen} aria-hidden="true" />

      <div className={styles.top}>
        <Image
          className={styles.icon}
          src={project.icon}
          alt=""
          width={featured ? 88 : 64}
          height={featured ? 88 : 64}
          sizes={featured ? '88px' : '64px'}
        />
        <span className={styles.status} data-status={project.status}>
          {active ? '운영 중' : '일시 중단'}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          {project.category}
          <span aria-hidden="true">·</span>
          {project.since} ~
        </p>
        <h3 className={styles.name}>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        {project.highlight && (
          <p className={styles.highlight}>
            <strong>{project.highlight.value}</strong>
            <span>{project.highlight.label}</span>
          </p>
        )}
      </div>

      <div className={styles.bottom}>
        <AvatarStack members={findMembers(project.members)} size={26} />
        {project.url && (
          <span className={styles.visit} aria-hidden="true">
            {new URL(project.url).host}
            <ArrowUpRight size={14} />
          </span>
        )}
      </div>
    </Spotlight>
  );
}

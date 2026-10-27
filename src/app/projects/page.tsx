import type { Metadata } from 'next';
import Image from 'next/image';
import clsx from 'clsx';
import projects, { archive } from '@/data/projects';
import { findMembers } from '@/data/members';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Spotlight from '@/components/ui/Spotlight';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '프로젝트',
  description:
    'Aztra, Idle Factory, 2¹², Azalea — Infinite Studio가 만들고 운영하는 디스코드 봇과 게임을 소개합니다.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="프로젝트"
        title={'만들고 있는 것들,\n만들어 온 것들'}
        lead="운영 중인 서비스부터 지금의 팀을 만든 첫 작품까지, Infinite Studio의 프로젝트를 모았습니다."
      />

      <section className={styles.list} aria-label="프로젝트 목록">
        <div className="container">
          {projects.map((project, i) => {
            const team = findMembers(project.members);
            const active = project.status === 'active';
            return (
              <Reveal
                as="article"
                key={project.slug}
                id={project.slug}
                className={clsx(styles.project, i % 2 === 1 && styles.flip)}
              >
                <Spotlight
                  className={styles.visual}
                  style={{ '--tint': project.tint } as React.CSSProperties}
                >
                  <div className={styles.visualAura} aria-hidden="true">
                    <Image src={project.icon} alt="" fill sizes="400px" />
                  </div>
                  <Image
                    className={styles.visualIcon}
                    src={project.icon}
                    alt={`${project.name} 아이콘`}
                    width={168}
                    height={168}
                    sizes="168px"
                  />
                </Spotlight>

                <div className={styles.info}>
                  <p className={styles.meta}>
                    <span
                      className={styles.status}
                      data-status={project.status}
                    >
                      {active ? '운영 중' : '일시 중단'}
                    </span>
                    <span>{project.category}</span>
                  </p>
                  <h2 className={styles.name}>
                    {project.name}
                    {project.nameKr && <span>{project.nameKr}</span>}
                  </h2>
                  <p className={styles.summary}>{project.summary}</p>
                  <p className={styles.description}>{project.description}</p>

                  <dl className={styles.facts}>
                    <div>
                      <dt>시작</dt>
                      <dd className="tabular">{project.since}</dd>
                    </div>
                    {project.highlight && (
                      <div>
                        <dt>{project.highlight.label}</dt>
                        <dd className="tabular">{project.highlight.value}</dd>
                      </div>
                    )}
                    <div className={styles.team}>
                      <dt>참여 멤버 {team.length}명</dt>
                      <dd>
                        {team.map((member) => (
                          <span key={member.name} title={member.name}>
                            <Avatar member={member} size={30} />
                            <span className="visually-hidden">
                              {member.name}
                            </span>
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  {project.url && (
                    <Button href={project.url} variant="primary">
                      {new URL(project.url).host} 방문하기
                    </Button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className={styles.archive} aria-labelledby="archive-title">
        <div className="container">
          <SectionHeader
            id="archive-title"
            eyebrow="아카이브"
            title="그동안 만든 것들"
            description="연혁에 남아 있는 지난 프로젝트들입니다."
          />
          <ul className={styles.archiveList}>
            {archive.map((item) => (
              <Reveal as="li" key={item.name}>
                <span className={styles.archiveYear}>{item.year}</span>
                <span className={styles.archiveName}>
                  {item.name}
                  {'nameKr' in item && item.nameKr && (
                    <small>{item.nameKr}</small>
                  )}
                </span>
                <span className={styles.archiveDesc}>{item.description}</span>
                <span className={styles.archiveNote}>{item.note}</span>
              </Reveal>
            ))}
          </ul>

          <p className={styles.next}>앞으로도 다양한 프로젝트가 이어집니다</p>
        </div>
      </section>
    </>
  );
}

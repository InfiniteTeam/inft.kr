import type { Metadata } from 'next';
import Image from 'next/image';
import projects, { archive, statusLabel, type Project } from '@/data/projects';
import { findMembers } from '@/data/members';
import { ArrowUpRight } from '@/components/icons';
import AvatarStack from '@/components/ui/AvatarStack';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import ProjectAura from '@/components/ui/ProjectAura';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '프로젝트',
  description:
    'Aztra, Idle Factory, 2¹², Azalea. Infinite Studio가 만들고 운영하는 디스코드 봇과 게임입니다.',
};

function Facts({ project }: { project: Project }) {
  return (
    <dl className={styles.facts}>
      <div>
        <dt>분야</dt>
        <dd>{project.category}</dd>
      </div>
      <div>
        <dt>시작</dt>
        <dd className="tabular">{project.since}</dd>
      </div>
      <div>
        <dt>상태</dt>
        <dd>{statusLabel[project.status]}</dd>
      </div>
      <div>
        <dt>참여</dt>
        <dd>
          <AvatarStack members={findMembers(project.members)} size={24} />
        </dd>
      </div>
    </dl>
  );
}

export default function ProjectsPage() {
  const [lead, ...rest] = projects;

  return (
    <>
      <PageHeader
        title={'만들고 있는 것들,\n만들어 온 것들'}
        lead="운영 중인 서비스부터 지금의 팀을 만든 첫 작품까지 모았습니다."
      />

      <section className={styles.lead} aria-labelledby={lead.slug}>
        <div className={`container ${styles.split}`}>
          <div className={styles.visual}>
            <ProjectAura icon={lead.icon} placement="center" />
            <Image
              src={lead.icon}
              alt={`${lead.name} 아이콘`}
              width={176}
              height={176}
              sizes="176px"
              priority
            />
          </div>
          <div>
            <h2 id={lead.slug} className={styles.leadName}>
              {lead.name}
            </h2>
            <p className={styles.summary}>{lead.summary}</p>
            <p className={styles.description}>{lead.description}</p>
            <Facts project={lead} />
            {lead.url && (
              <Button href={lead.url}>{new URL(lead.url).host} 열기</Button>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="다른 프로젝트">
        <div className="container">
          <ul className={styles.grid}>
            {rest.map((project) => (
              <li key={project.slug} id={project.slug} className={styles.card}>
                <ProjectAura icon={project.icon} />
                <Image
                  className={styles.icon}
                  src={project.icon}
                  alt={`${project.name} 아이콘`}
                  width={72}
                  height={72}
                  sizes="72px"
                />
                <h2 className={styles.name}>{project.name}</h2>
                <p className={styles.summary}>{project.summary}</p>
                <p className={styles.description}>{project.description}</p>
                <Facts project={project} />
                {project.url && (
                  <a
                    className={styles.link}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {new URL(project.url).host} 열기
                    <ArrowUpRight size={16} />
                    <span className="visually-hidden"> (새 창)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="archive-title">
        <div className="container">
          <SectionHeader id="archive-title" title="연혁에 남은 지난 프로젝트" />
          <table className={styles.archive}>
            <thead>
              <tr>
                <th scope="col">연도</th>
                <th scope="col">이름</th>
                <th scope="col">무엇</th>
                <th scope="col">기록</th>
              </tr>
            </thead>
            <tbody>
              {archive.map((item) => (
                <tr key={item.name}>
                  <td className="tabular">{item.year}</td>
                  <th scope="row">
                    {item.name}
                    {'nameKr' in item && item.nameKr && (
                      <span> {item.nameKr}</span>
                    )}
                  </th>
                  <td>{item.description}</td>
                  <td>{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

import projects from '@/data/projects';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.scss';

export default function Projects() {
  return (
    <section className={styles.section} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          eyebrow="프로젝트"
          title={'디스코드 안에서\n쓰이는 것들을 만듭니다'}
          description="서버를 관리하는 도구부터 가볍게 즐기는 게임까지. 기획과 개발, 운영까지 팀이 직접 합니다."
          link={{ href: '/projects', label: '모든 프로젝트' }}
        />

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              className={styles.cell}
              delay={(i % 2) * 90}
            >
              <ProjectCard project={project} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

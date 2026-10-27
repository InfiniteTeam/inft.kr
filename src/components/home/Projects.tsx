import projects from '@/data/projects';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.scss';

export default function Projects() {
  return (
    <section className={styles.section} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          title="Aztra부터 Idle Factory까지"
          lead="관리 봇부터 방치형 게임까지, 디스코드에서 쓰는 서비스를 직접 만들고 운영합니다."
          link={{ href: '/projects', label: '프로젝트 자세히 보기' }}
        />

        <ul className={styles.grid}>
          {projects.map((project, i) => (
            <li key={project.slug} className={styles.cell}>
              <ProjectCard project={project} lead={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

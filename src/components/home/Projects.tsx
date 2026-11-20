import projects from '@/data/projects';
import { site } from '@/data/site';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.scss';

export default function Projects() {
  return (
    <section className={styles.section} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          title={site.mission}
          lead={site.missionLead}
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

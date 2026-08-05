import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/data/projects';

import styles from './project-card.module.css';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const projectNumber = String(index + 1).padStart(2, '0');

  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <Image
          src={`/${project.heroImage.src}`}
          alt={project.heroImage.alt}
          fill
          sizes="(max-width: 928px) 100vw, 58vw"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{projectNumber}</span>
          <span>{project.team}</span>
          <span>{project.period}</span>
        </div>

        <div>
          <h3>{project.title}</h3>
          <p className={styles.summary}>{project.summary}</p>
          <p className={styles.role}>{project.role}</p>
        </div>

        <div className={styles.cardFooter}>
          <ul aria-label={`${project.title} 주요 기술`}>
            {project.technologies.slice(0, 5).map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <Link
            className={styles.link}
            href={`/projects/${project.slug}`}
            aria-label={`${project.title} 사례 자세히 보기`}
          >
            사례 자세히 보기 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

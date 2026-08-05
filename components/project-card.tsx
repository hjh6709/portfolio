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
  const isDiagram = project.heroImage.src.endsWith('.svg');

  return (
    <article className={styles.card}>
      <Link
        className={`${styles.visual} ${isDiagram ? styles.diagramVisual : ''}`}
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} 사례 이미지로 자세히 보기`}
      >
        <Image
          src={`/${project.heroImage.src}`}
          alt={project.heroImage.alt}
          fill
          sizes="(max-width: 928px) 100vw, 58vw"
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{projectNumber}</span>
          <span>{project.team}</span>
          <span>{project.period}</span>
        </div>

        <div>
          <h3>
            <Link className={styles.titleLink} href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
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

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
      <div className={styles.visual} aria-hidden="true">
        <span className={styles.visualIndex}>{projectNumber}</span>
        <div className={styles.systemMap}>
          {project.architecture.nodes.slice(0, 5).map((node, nodeIndex) => (
            <span
              key={node.id}
              className={node.ownership === 'mine' ? styles.mine : styles.node}
              style={{ '--node-index': nodeIndex } as React.CSSProperties}
            >
              {node.label}
            </span>
          ))}
        </div>
        <p>{project.technologies.slice(0, 4).join(' · ')}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{projectNumber}</span>
          <span>{project.team}</span>
          <span>{project.period}</span>
        </div>

        <h3>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
        <p className={styles.role}>{project.role}</p>

        <Link
          className={styles.link}
          href={`/projects/${project.slug}`}
          aria-label={`프로젝트 자세히 보기: ${project.title}`}
        >
          프로젝트 자세히 보기 <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}


import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/data/projects';

import styles from './other-project-card.module.css';

type OtherProjectCardProps = {
  project: Project;
  index: number;
};

export function OtherProjectCard({ project, index }: OtherProjectCardProps) {
  return (
    <article className={styles.card}>
      <Link
        className={styles.visual}
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} 사례 이미지로 자세히 보기`}
      >
        <Image
          src={`/${project.heroImage.src}`}
          alt={project.heroImage.alt}
          fill
          sizes="(max-width: 928px) 100vw, 38vw"
        />
      </Link>

      <div className={styles.content}>
        <p className={styles.meta}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{project.status}</span>
        </p>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <p className={styles.role}>{project.role}</p>

        <div className={styles.links}>
          <Link href={`/projects/${project.slug}`} aria-label={`${project.title} 사례 보기`}>
            Case study <span aria-hidden="true">→</span>
          </Link>
          {project.evidence.slice(0, 2).map((evidence) => (
            <a key={evidence.href} href={evidence.href} target="_blank" rel="noreferrer">
              {evidence.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

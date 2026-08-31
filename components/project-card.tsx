import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/data/projects';
import { homeProjectProfiles } from '@/data/home';

import styles from './project-card.module.css';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const projectNumber = String(index + 1).padStart(2, '0');
  const profile = homeProjectProfiles[project.slug];
  const media = profile?.media;
  const isDiagram = !media && project.heroImage.src.endsWith('.svg');
  const fitsInside = media?.fit === 'contain' || isDiagram;
  const projectLabel = profile?.visualLabel ?? '구현 증거';

  return (
    <article className={styles.card} data-project={project.slug} id={project.slug}>
      <Link
        className={`${styles.visual} ${fitsInside ? styles.containedVisual : ''} ${isDiagram ? styles.diagramVisual : ''}`}
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} 사례 이미지로 자세히 보기`}
      >
        <span className={styles.visualKicker}>{projectLabel}</span>
        <span className={styles.visualOverlay} aria-hidden="true">
          <span className={styles.visualOverlayLabel}>
            사례 자세히 보기 <span className={styles.visualOverlayArrow}>→</span>
          </span>
        </span>
        {media?.kind === 'video' ? (
          // 화면이 움직이는 편이 흐름을 훨씬 빨리 전달해, 영상이 있으면 영상을 먼저 씁니다.
          <video autoPlay muted loop playsInline poster={media.poster} aria-label={media.alt}>
            <source src={`/${media.src}`} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={`/${media?.src ?? project.heroImage.src}`}
            alt={media?.alt ?? project.heroImage.alt}
            fill
            unoptimized={Boolean(media)}
            sizes="(max-width: 68rem) 100vw, 52vw"
          />
        )}
      </Link>

      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span>{projectNumber}</span>
            <span>{profile?.eyebrow ?? project.status}</span>
            <span>{project.period}</span>
          </div>

          <h3 className={styles.title}>
            <Link className={styles.titleLink} href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
          <p className={styles.headline}>{profile?.headline ?? project.summary}</p>
          <p className={styles.role}>{project.role}</p>
        </header>

        {profile ? (
          <div className={styles.evidenceBlock}>
            <p className={styles.flowLabel}>
              {project.slug === 'kagoshima-travel' ? 'USER JOURNEY' : 'IMPLEMENTATION FLOW'}
            </p>
            <p className={styles.flow}>{profile.flow}</p>
            <dl className={styles.proofs}>
              {profile.proofs.map((proof) => (
                <div key={proof.label}>
                  <dt>{proof.value}</dt>
                  <dd>{proof.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

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

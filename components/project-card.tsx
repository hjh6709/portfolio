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
  const isDiagram = project.heroImage.src.endsWith('.svg');
  const profile = homeProjectProfiles[project.slug];
  const visualCount = profile?.visuals?.length ?? 0;
  const hasVisualCollection = visualCount > 0;
  const isSingleVisualCollection = visualCount === 1;
  const isLandscapeCollection = profile?.visualLayout === 'landscape';
  const projectLabel = profile?.visualLabel ?? (hasVisualCollection ? '실제 서비스 화면' : '구현 증거');

  return (
    <article className={styles.card} data-project={project.slug} id={project.slug}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <span>{projectNumber}</span>
          <span>{profile?.eyebrow ?? project.status}</span>
          <span>{project.period}</span>
        </div>

        <div className={styles.titleBlock}>
          <h3>
            <Link className={styles.titleLink} href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
          <p className={styles.headline}>{profile?.headline ?? project.summary}</p>
        </div>

        <div className={styles.intro}>
          <p className={styles.summary}>{project.summary}</p>
          <p className={styles.role}>{project.role}</p>
        </div>
      </header>

      <Link
        className={`${styles.visual} ${isDiagram ? styles.diagramVisual : ''} ${hasVisualCollection ? styles.visualCollection : ''} ${isSingleVisualCollection ? styles.singleVisualCollection : ''} ${isLandscapeCollection ? styles.landscapeVisualCollection : ''}`}
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} 사례 이미지로 자세히 보기`}
      >
        <span className={styles.visualKicker}>{projectLabel}</span>
        <span className={styles.visualOverlay} aria-hidden="true">
          <span className={styles.visualOverlayLabel}>
            사례 자세히 보기 <span className={styles.visualOverlayArrow}>→</span>
          </span>
        </span>
        {profile?.visuals ? (
          <div className={styles.visualGrid} data-visual-count={visualCount}>
            {profile.visuals.map((visual, visualIndex) => (
              <figure
                key={visual.src}
                className={visualIndex === Math.floor(visualCount / 2) ? styles.visualPrimary : ''}
                data-visual-index={visualIndex}
              >
                <Image
                  src={`/${visual.src}`}
                  alt={visual.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 928px) 100vw, 36vw"
                />
                <figcaption>{visual.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <Image
            src={`/${project.heroImage.src}`}
            alt={project.heroImage.alt}
            fill
            sizes="(max-width: 928px) 100vw, 58vw"
          />
        )}
      </Link>

      <div className={styles.content}>
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

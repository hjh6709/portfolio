import type { Metadata } from 'next';
import Link from 'next/link';

import { provenCapabilities } from '@/data/home';
import { education, experience, profile } from '@/data/profile';
import { getFeaturedProjects } from '@/lib/projects';

import styles from './resume.module.css';

export const metadata: Metadata = {
  title: '이력서',
  description: '백엔드 개발자 한정현의 기술 역량, 프로젝트 방향, 교육과 실무 경험을 정리했습니다.',
};

export default function ResumePage() {
  const projects = getFeaturedProjects();

  return (
    <main className={styles.page}>
      <section className={styles.intro} aria-labelledby="resume-title">
        <p className={styles.eyebrow}>RESUME · HAN JEONGHYUN</p>
        <h1 id="resume-title">이력서</h1>
        <div className={styles.introGrid}>
          <p className={styles.title}>{profile.title}</p>
          <p className={styles.summary}>{profile.introduction}</p>
        </div>
        <div className={styles.actions}>
          <a href={`mailto:${profile.email}`}>
            {profile.email} <span aria-hidden="true">↗</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link href="/#projects">
            프로젝트로 역량 확인하기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="projects-title">
        <header className={styles.sectionHeader}>
          <span>01</span>
          <div>
            <p>SELECTED PROJECTS</p>
            <h2 id="projects-title">주요 프로젝트</h2>
          </div>
        </header>

        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <article key={project.slug}>
              <div className={styles.projectHeading}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.status} · {project.team} · {project.period}</p>
                </div>
              </div>
              <p className={styles.projectRole}>{project.role}</p>
              <p>{project.summary}</p>
              <ul aria-label={`${project.title} 주요 결과`}>
                {project.outcomes.slice(0, 2).map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
              <div className={styles.projectFooter}>
                <p>{project.technologies.slice(0, 6).join(' · ')}</p>
                <div>
                  <Link href={`/projects/${project.slug}`}>사례 보기 →</Link>
                  {project.evidence[0] ? (
                    <a href={project.evidence[0].href} target="_blank" rel="noreferrer">
                      근거 링크 ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="capability-title">
        <header className={styles.sectionHeader}>
          <span>02</span>
          <div>
            <p>PROVEN CAPABILITIES</p>
            <h2 id="capability-title">기술 역량</h2>
          </div>
        </header>

        <div className={styles.capabilityGrid}>
          {provenCapabilities.map((capability) => (
            <article key={capability.title}>
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.project}</p>
              </div>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="experience-title">
        <header className={styles.sectionHeader}>
          <span>03</span>
          <div>
            <p>EXPERIENCE</p>
            <h2 id="experience-title">경험</h2>
          </div>
        </header>

        <div className={styles.timeline}>
          {experience.map((item) => (
            <article key={`${item.organization}-${item.title}`}>
              <div>
                <p>{item.organization} {item.period ? `· ${item.period}` : ''}</p>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="education-title">
        <header className={styles.sectionHeader}>
          <span>04</span>
          <div>
            <p>EDUCATION</p>
            <h2 id="education-title">교육</h2>
          </div>
        </header>

        <div className={styles.timeline}>
          {education.map((item) => (
            <article key={`${item.organization}-${item.title}`}>
              <div>
                <p>{item.organization} {item.period ? `· ${item.period}` : ''}</p>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className={styles.verification} aria-labelledby="verification-title">
        <div>
          <p className={styles.eyebrow}>VERIFIABLE WORK</p>
          <h2 id="verification-title">직접 확인하기</h2>
        </div>
        <div className={styles.verificationLinks}>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub에서 코드 보기 <span aria-hidden="true">↗</span>
          </a>
          <Link href="/#projects">
            프로젝트 사례 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </aside>
    </main>
  );
}

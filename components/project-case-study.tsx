import Link from 'next/link';

import type { Project } from '@/data/projects';

import { ArchitectureDiagram } from './architecture-diagram';
import styles from './project-case-study.module.css';

type ProjectCaseStudyProps = {
  project: Project;
};

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <article className={styles.caseStudy}>
      <header className={styles.hero}>
        <Link href="/#projects" className={styles.backLink}>
          <span aria-hidden="true">←</span> 프로젝트 목록
        </Link>

        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>PROJECT CASE STUDY · {project.period}</p>
            <h1>{project.title}</h1>
            <p className={styles.summary}>{project.summary}</p>
          </div>

          <dl className={styles.metadata}>
            <div>
              <dt>ROLE</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>TEAM</dt>
              <dd>{project.team}</dd>
            </div>
            <div>
              <dt>STACK</dt>
              <dd>{project.technologies.join(' · ')}</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className={styles.context} aria-labelledby="problem-title">
        <div className={styles.sectionNumber}>01</div>
        <div>
          <p className={styles.eyebrow}>BACKGROUND</p>
          <h2 id="problem-title">해결하려던 문제</h2>
          <p>{project.problem}</p>
        </div>
      </section>

      <section className={styles.contribution} aria-labelledby="contribution-title">
        <div className={styles.sectionHeading}>
          <div className={styles.sectionNumber}>02</div>
          <div>
            <p className={styles.eyebrow}>MY CONTRIBUTION</p>
            <h2 id="contribution-title">내가 담당한 영역</h2>
          </div>
        </div>

        <ol className={styles.contributionList}>
          {project.contribution.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.decisions} aria-labelledby="decisions-title">
        <div className={styles.sectionHeading}>
          <div className={styles.sectionNumber}>03</div>
          <div>
            <p className={styles.eyebrow}>ENGINEERING DECISIONS</p>
            <h2 id="decisions-title">설계 판단</h2>
          </div>
        </div>

        <div className={styles.decisionGrid}>
          {project.decisions.map((decision, index) => (
            <article key={decision.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.architecture} aria-labelledby="architecture-title">
        <div className={styles.sectionHeading}>
          <div className={styles.sectionNumber}>04</div>
          <div>
            <p className={styles.eyebrow}>SYSTEM FLOW</p>
            <h2 id="architecture-title">서비스 아키텍처</h2>
          </div>
        </div>

        <ArchitectureDiagram
          title={`${project.title} 시스템 흐름`}
          nodes={project.architecture.nodes}
          edges={project.architecture.edges}
        />
      </section>

      <section className={styles.troubleshooting} aria-labelledby="troubleshooting-title">
        <div className={styles.sectionHeading}>
          <div className={styles.sectionNumber}>05</div>
          <div>
            <p className={styles.eyebrow}>TROUBLESHOOTING</p>
            <h2 id="troubleshooting-title">트러블슈팅</h2>
          </div>
        </div>

        <div className={styles.troubleList}>
          {project.troubleshooting.map((item, index) => (
            <article key={item.problem}>
              <div className={styles.troubleTitle}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.problem}</h3>
              </div>
              <dl>
                <div>
                  <dt>원인</dt>
                  <dd>{item.cause}</dd>
                </div>
                <div>
                  <dt>해결</dt>
                  <dd>{item.solution}</dd>
                </div>
                <div>
                  <dt>결과</dt>
                  <dd>{item.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.evidence}>
        <div>
          <p className={styles.eyebrow}>EVIDENCE</p>
          <h2>직접 확인하기</h2>
        </div>
        <div className={styles.evidenceLinks}>
          {project.evidence.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </footer>
    </article>
  );
}

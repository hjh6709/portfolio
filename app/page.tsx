import Link from 'next/link';

import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { capabilities, education, experience, profile } from '@/data/profile';
import { getFeaturedProjects } from '@/lib/projects';

import styles from './home.module.css';

const archiveProjects = [
  {
    title: 'Wait:ON',
    description: '대기 흐름과 운영 상태를 사용자에게 명확히 전달하는 서비스 프로젝트',
  },
  {
    title: 'Data Visualization',
    description: '수집한 데이터를 탐색 가능한 화면으로 정리한 시각화 프로젝트',
  },
  {
    title: 'SCPC AI Harness',
    description: '반복 가능한 입력과 결과 비교를 위한 AI 실험 도구',
  },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main>
      <section className={styles.hero} id="about">
        <Reveal className={styles.heroMeta}>
          <span>HAN JEONGHYUN</span>
          <span>BACKEND DEVELOPER</span>
          <span>SEOUL · KOREA</span>
        </Reveal>

        <Reveal as="h1" className={styles.heroTitle} delay={90}>
          서비스를 끝까지 연결하는{' '}
          <br />
          <span>백엔드 개발자</span> 한정현입니다.
        </Reveal>

        <div className={styles.heroBottom}>
          <Reveal as="p" className={styles.heroDescription} delay={160}>
            API와 데이터 흐름을 설계하고
            <br />
            사용자 화면부터 클라우드 운영 환경까지 직접 확인합니다.
          </Reveal>

          <Reveal className={styles.heroActions} delay={220}>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <Link href="/resume">이력서 <span aria-hidden="true">→</span></Link>
          </Reveal>
        </div>
      </section>

      <section className={styles.statement} aria-labelledby="statement-title">
        <p className={styles.sectionLabel}>01 / HOW I WORK</p>
        <h2 id="statement-title">
          기능이 동작하는 데서 멈추지 않고
          <br />
          <span>사용자가 끝까지 쓸 수 있는지</span> 확인합니다.
        </h2>
        <p>
          백엔드의 상태는 화면과 세션, 인프라에 그대로 이어집니다. 그래서 API 응답 하나를 만들 때도
          실패했을 때의 다음 행동과 실제 배포 환경을 함께 봅니다.
        </p>
      </section>

      <section className={styles.capabilities} aria-labelledby="capabilities-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>02 / CAPABILITIES</p>
          <h2 id="capabilities-title">백엔드를 중심으로 연결한 경험</h2>
        </div>

        <div className={styles.capabilityList}>
          {capabilities.map((capability, index) => (
            <article key={capability.title} className={styles.capability}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <ul aria-label={`${capability.title} 기술`}>
                  {capability.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.projects} id="projects" aria-labelledby="projects-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>03 / SELECTED WORK</p>
          <h2 id="projects-title">대표 프로젝트</h2>
          <p>
            완성된 화면만 보여주기보다 문제를 어떻게 나눴고 어떤 흐름으로 동작하게 했는지 함께
            정리했습니다.
          </p>
        </div>

        <div className={styles.projectList}>
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className={styles.experience} id="experience" aria-labelledby="experience-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>04 / EXPERIENCE</p>
          <h2 id="experience-title">경험과 교육</h2>
        </div>

        <div className={styles.timeline}>
          {[...experience, ...education].map((item, index) => (
            <article key={`${item.organization}-${item.title}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item.organization}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.archive} aria-labelledby="archive-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>05 / ARCHIVE</p>
          <h2 id="archive-title">계속 만들고 있습니다</h2>
        </div>

        <div className={styles.archiveList}>
          {archiveProjects.map((project, index) => (
            <article key={project.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

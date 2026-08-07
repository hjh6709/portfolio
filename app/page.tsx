import Link from 'next/link';

import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { capabilities, education, experience, profile } from '@/data/profile';
import { getFeaturedProjects } from '@/lib/projects';

import styles from './home.module.css';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main>
      <section className={styles.hero} id="about">
        <Reveal className={styles.heroMeta}>
          <span>HAN JEONGHYUN</span>
          <span>BACKEND · FULL-STACK · CLOUD</span>
          <span>SEOUL, KOREA</span>
        </Reveal>

        <Reveal as="h1" className={styles.heroTitle} delay={80}>
          서비스를 끝까지 연결하는 <span>백엔드 개발자</span>
        </Reveal>

        <div className={styles.heroBottom}>
          <Reveal as="p" className={styles.heroDescription} delay={150}>
            API와 데이터 흐름을 중심에 두고 사용자 화면과 배포 환경까지 직접 확인합니다.
            기능 하나보다 서비스가 실제로 쓰이는 전체 과정을 만듭니다.
          </Reveal>

          <Reveal className={styles.heroActions} delay={210}>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <Link href="/resume">이력서 <span aria-hidden="true">→</span></Link>
          </Reveal>
        </div>
      </section>

      <section className={styles.projects} id="projects" aria-labelledby="projects-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>01 · SELECTED WORK</p>
          <h2 id="projects-title">대표 프로젝트</h2>
          <p>완성 화면과 아키텍처, 문제를 해결한 과정을 함께 담았습니다.</p>
        </div>

        <div className={styles.projectList}>
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className={styles.experience} id="experience" aria-labelledby="experience-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>02 · EXPERIENCE</p>
          <h2 id="experience-title">경험과 교육</h2>
          <p>서비스를 만드는 기술과 정확하게 협업하는 기본을 함께 익혔습니다.</p>
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

      <section className={styles.capabilities} aria-labelledby="capabilities-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>03 · CAPABILITIES</p>
          <h2 id="capabilities-title">사용한 기술</h2>
          <p>프로젝트에서 실제로 연결하고 검증한 영역입니다.</p>
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

      <section className={styles.statement} aria-labelledby="statement-title">
        <p className={styles.sectionLabel}>04 · HOW I WORK</p>
        <h2 id="statement-title">
          기술 단위의 성공보다
          <br />
          <span>사용자가 끝까지 이용하는 흐름</span>을 봅니다.
        </h2>
        <p>
          VM이 생성됐어도 터미널에 연결되지 않으면 실습은 시작되지 않습니다. API 응답과 화면,
          권한, 배포 환경이 만나는 지점까지 확인하고 실패했을 때의 다음 행동도 함께 설계합니다.
        </p>
      </section>
    </main>
  );
}

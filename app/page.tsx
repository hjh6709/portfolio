import Link from 'next/link';

import { OtherProjectCard } from '@/components/other-project-card';
import { ProjectCard } from '@/components/project-card';
import { Reveal } from '@/components/reveal';
import { heroProofs, provenCapabilities } from '@/data/home';
import { education, profile } from '@/data/profile';
import { getFlagshipProjects, getOtherProjects } from '@/lib/projects';

import styles from './home.module.css';

export default function HomePage() {
  const flagshipProjects = getFlagshipProjects();
  const otherProjects = getOtherProjects();

  return (
    <main>
      <section className={styles.hero} id="about">
        <Reveal className={styles.heroMeta}>
          <span>HAN JEONGHYUN</span>
          <span>BACKEND · CLOUD</span>
          <span>GYEONGGI, KOREA</span>
        </Reveal>

        <Reveal as="h1" className={styles.heroTitle} delay={80}>
          <span className={styles.heroTitleLine}>안정적인 서비스를{' '}</span>
          <span className={styles.heroTitleLine}>만드는 <em>개발자</em></span>
        </Reveal>

        <div className={styles.heroBottom}>
          <Reveal as="p" className={styles.heroDescription} delay={150}>
            API와 데이터 흐름을 설계하고 사용자 화면부터 배포 환경까지 직접 확인합니다. 기능
            구현에 그치지 않고 사용자가 서비스를 끝까지 이용할 수 있는 상태를 만듭니다.
          </Reveal>

          <Reveal className={styles.heroActions} delay={210}>
            <a href={`mailto:${profile.email}`}>Email <span aria-hidden="true">↗</span></a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <Link href="/resume">이력서 <span aria-hidden="true">→</span></Link>
          </Reveal>
        </div>

        <Reveal className={styles.heroProofs} delay={270}>
          {heroProofs.map((proof) => (
            <div key={proof.label}>
              <strong>{proof.value}</strong>
              <span>{proof.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className={styles.projects} id="projects" aria-labelledby="projects-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>01 · FLAGSHIP WORK</p>
          <h2 id="projects-title">대표 프로젝트</h2>
          <p>서비스 화면과 구현 흐름, 검증 가능한 결과를 한 카드에서 확인할 수 있습니다.</p>
        </div>

        <div className={styles.projectList}>
          {flagshipProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className={styles.otherWork} aria-labelledby="other-work-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>02 · OTHER WORK</p>
          <h2 id="other-work-title">Other Work</h2>
          <p>배포 경험과 인프라 설계 역량을 보여 주는 보조 프로젝트입니다.</p>
        </div>

        <div className={styles.otherGrid}>
          {otherProjects.map((project, index) => (
            <OtherProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className={styles.capabilities} aria-labelledby="capabilities-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>03 · PROVEN CAPABILITIES</p>
          <h2 id="capabilities-title">기술 역량</h2>
          <p>기술 이름보다 어디에 적용했고 무엇을 동작하게 했는지 설명합니다.</p>
        </div>

        <div className={styles.capabilityList}>
          {provenCapabilities.map((capability, index) => (
            <article key={capability.title} className={styles.capability}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className={styles.capabilityTitle}>
                  <h3>{capability.title}</h3>
                  <p>{capability.project}</p>
                </div>
                <p>{capability.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.experience} id="education" aria-labelledby="education-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>04 · EDUCATION</p>
          <h2 id="education-title">교육</h2>
          <p>AWS와 Kubernetes를 중심으로 클라우드 인프라를 설계하고 운영하는 과정을 익혔습니다.</p>
        </div>

        <div className={styles.timeline}>
          {education.map((item, index) => (
            <article key={`${item.organization}-${item.title}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item.organization} {item.period ? `· ${item.period}` : ''}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

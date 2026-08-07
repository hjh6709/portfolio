import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/data/projects';

import { ArchitectureDiagram } from './architecture-diagram';
import styles from './project-case-study.module.css';
import { TechnologyIcon } from './technology-icon';

type ProjectCaseStudyProps = {
  project: Project;
};

const sectionNumber = (value: number) => String(value).padStart(2, '0');

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const isPortraitHero = project.slug === 'kagoshima-travel';

  return (
    <article className={styles.caseStudy} data-project={project.slug}>
      <header className={styles.hero}>
        <Link href="/#projects" className={styles.backLink}>
          <span aria-hidden="true">←</span> 프로젝트 목록
        </Link>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.status}>{project.status}</p>
            <p className={styles.eyebrow}>PROJECT CASE STUDY · {project.period}</p>
            <h1>{project.title}</h1>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.heroLinks} aria-label={`${project.title} 외부 근거`}>
              {project.evidence.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                  {item.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
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

        <figure className={styles.heroEvidence}>
          <div className={`${styles.heroImage} ${isPortraitHero ? styles.heroImagePortrait : ''}`}>
            <Image
              src={`/${project.heroImage.src}`}
              alt={project.heroImage.alt}
              width={project.heroImage.width}
              height={project.heroImage.height}
              priority
              sizes="(max-width: 900px) 100vw, 90vw"
            />
          </div>
          <figcaption>
            <span>01</span>
            <p>{project.heroImage.caption}</p>
          </figcaption>
        </figure>
      </header>

      <section className={styles.challenge} aria-labelledby="problem-title">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>{sectionNumber(1)}</span>
          <div>
            <p className={styles.eyebrow}>BACKGROUND · PROBLEM</p>
            <h2 id="problem-title">해결하려던 문제</h2>
          </div>
        </div>

        <div className={styles.challengeBody}>
          <p className={styles.lead}>{project.challenge}</p>
          <div className={styles.responsibilities}>
            <p className={styles.eyebrow}>MY RESPONSIBILITY</p>
            <h3>내가 담당한 영역</h3>
            <ol>
              {project.responsibilities.map((item, index) => (
                <li key={item}>
                  <span>{sectionNumber(index + 1)}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.features} aria-labelledby="features-title">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>{sectionNumber(2)}</span>
          <div>
            <p className={styles.eyebrow}>PRODUCT · IMPLEMENTATION</p>
            <h2 id="features-title">핵심 구현</h2>
          </div>
        </div>

        <div className={styles.featureList}>
          {project.featureStories.map((story, index) => {
            const duplicatesHero = story.src === project.heroImage.src;

            return (
              <article
                className={`${styles.feature} ${duplicatesHero ? styles.featureCopyOnly : ''}`}
                key={`${story.src}-${story.title}`}
              >
                {!duplicatesHero && (
                  <figure>
                    <div className={styles.featureImage}>
                      <Image
                        src={`/${story.src}`}
                        alt={story.alt}
                        width={story.width}
                        height={story.height}
                        sizes="(max-width: 900px) 100vw, 62vw"
                      />
                    </div>
                    <figcaption>{story.caption}</figcaption>
                  </figure>
                )}
                <div className={styles.featureCopy}>
                  <span>{sectionNumber(index + 1)}</span>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.architecture} aria-labelledby="architecture-title">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>{sectionNumber(3)}</span>
          <div>
            <p className={styles.eyebrow}>SYSTEM FLOW</p>
            <h2 id="architecture-title">서비스 아키텍처</h2>
          </div>
        </div>

        {project.architectureImage ? (
          <figure className={styles.architectureEvidence}>
            <div className={styles.architectureCanvas}>
              <Image
                src={`/${project.architectureImage.src}`}
                alt={project.architectureImage.alt}
                width={project.architectureImage.width}
                height={project.architectureImage.height}
                sizes="(max-width: 900px) 100vw, 90vw"
              />
            </div>
            <figcaption>{project.architectureImage.caption}</figcaption>
          </figure>
        ) : (
          <ArchitectureDiagram
            title={`${project.title} 시스템 흐름`}
            nodes={project.architecture.nodes}
            edges={project.architecture.edges}
          />
        )}
      </section>

      <section className={styles.technology} aria-labelledby="technology-title">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>{sectionNumber(4)}</span>
          <div>
            <p className={styles.eyebrow}>TECHNOLOGY · RESPONSIBILITY</p>
            <h2 id="technology-title">기술과 역할</h2>
          </div>
        </div>

        <div className={styles.technologyGrid}>
          {project.technologyRoles.map((technology, index) => (
            <article key={technology.name}>
              <div className={styles.technologyIndex}>{sectionNumber(index + 1)}</div>
              <div className={styles.technologyIcon}>
                <TechnologyIcon name={technology.icon} label={technology.name} />
              </div>
              <div>
                <h3>{technology.name}</h3>
                <p>{technology.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.decisions} aria-labelledby="decisions-title">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>{sectionNumber(5)}</span>
          <div>
            <p className={styles.eyebrow}>ENGINEERING DECISIONS</p>
            <h2 id="decisions-title">설계 판단</h2>
          </div>
        </div>

        <div className={styles.decisionGrid}>
          {project.decisions.map((decision, index) => (
            <article key={decision.title}>
              <span>{sectionNumber(index + 1)}</span>
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.troubleshooting} aria-labelledby="troubleshooting-title">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>{sectionNumber(6)}</span>
          <div>
            <p className={styles.eyebrow}>TROUBLESHOOTING</p>
            <h2 id="troubleshooting-title">트러블슈팅</h2>
          </div>
        </div>

        <div className={styles.troubleList}>
          {project.troubleshooting.map((item, index) => (
            <article key={item.problem}>
              <div className={styles.troubleTitle}>
                <span>{sectionNumber(index + 1)}</span>
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

      <section className={styles.outcomes} aria-labelledby="outcomes-title">
        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>{sectionNumber(7)}</span>
          <div>
            <p className={styles.eyebrow}>RESULT · LESSON</p>
            <h2 id="outcomes-title">결과와 배운 점</h2>
          </div>
        </div>

        <ol>
          {project.outcomes.map((outcome, index) => (
            <li key={outcome}>
              <span>{sectionNumber(index + 1)}</span>
              <p>{outcome}</p>
            </li>
          ))}
        </ol>
      </section>

    </article>
  );
}

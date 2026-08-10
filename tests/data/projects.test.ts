import { describe, expect, it } from 'vitest';

import { projects } from '@/data/projects';
import {
  getFlagshipProjects,
  getOtherProjects,
  getProject,
  getProjectSlugs,
} from '@/lib/projects';

describe('project content', () => {
  it('separates the three flagship case studies from supporting work', () => {
    expect(getFlagshipProjects().map((project) => project.slug)).toEqual([
      'cledyu',
      'codebuddy',
      'kagoshima-travel',
    ]);
    expect(getOtherProjects().map((project) => project.slug)).toEqual([
      'pr-check-doctor',
      'chilseongpa',
    ]);
  });

  it('gives every published project an architecture and evidence', () => {
    for (const slug of getProjectSlugs()) {
      const project = getProject(slug);

      expect(project).toBeDefined();
      expect(project?.architecture.nodes.length).toBeGreaterThan(2);
      expect(project?.architecture.edges.length).toBeGreaterThan(1);
      expect(project?.evidence.length).toBeGreaterThan(0);
    }
  });

  it('gives every featured project evidence-led case study content', () => {
    for (const project of projects.filter((item) => item.featured)) {
      expect(project.heroImage.alt).not.toHaveLength(0);
      expect(project.challenge).not.toHaveLength(0);
      expect(project.responsibilities.length).toBeGreaterThan(0);
      expect(project.featureStories.length).toBeGreaterThan(0);
      expect(project.outcomes.length).toBeGreaterThan(0);
      expect(project.technologyRoles.length).toBeGreaterThan(2);
    }
  });

  it('publishes verified architecture evidence for Cledyu and Kagoshima Travel', () => {
    const cledyu = getProject('cledyu');
    const kagoshima = getProject('kagoshima-travel');

    expect(cledyu?.architectureImage?.src).toBe('projects/cledyu/architecture.png');
    expect(kagoshima?.architectureImage?.src).toBe(
      'projects/kagoshima-travel/service-flow.svg',
    );
  });

  it('marks Kagoshima Travel as an operating project under active revision', () => {
    const kagoshima = getProject('kagoshima-travel');

    expect(kagoshima?.status).toBe('운영 중 · 화면 개선 진행 중');
    expect(kagoshima?.evidence).toContainEqual({
      label: 'Live service',
      href: 'https://kagoshima.hjh-dev.site/',
    });
    expect(kagoshima?.heroImage.src).toBe(
      'projects/kagoshima-travel/live/map-current.png',
    );
    expect(kagoshima?.journey?.map((step) => step.label)).toEqual([
      '공개 탐색',
      '샘플 체험',
      '로그인 · 회원가입',
      '여행 관리',
      '공유',
    ]);
    expect(kagoshima?.featureStories.map((story) => story.src)).toEqual([
        'projects/kagoshima-travel/live/today.png',
        'projects/kagoshima-travel/live/schedule.png',
        'projects/kagoshima-travel/live/map-current.png',
        'projects/kagoshima-travel/live/share.png',
        'projects/kagoshima-travel/live/login.png',
        'projects/kagoshima-travel/live/register.png',
    ]);
    expect(
      kagoshima?.featureStories.slice(0, 3).map(({ width, height }) => [width, height]),
    ).toEqual([
      [1280, 720],
      [1280, 720],
      [908, 1716],
    ]);
    expect(kagoshima?.evidence).toEqual(
      expect.arrayContaining([
        {
          label: 'Sample trip',
          href: 'https://kagoshima.hjh-dev.site/demo',
        },
        {
          label: 'Shared trip',
          href: 'https://kagoshima.hjh-dev.site/share/lo-PEB-IyorpWGzTaRFuuJffCGWZ3tFe',
        },
      ]),
    );
  });

  it('returns undefined for an unknown project', () => {
    expect(getProject('unknown')).toBeUndefined();
  });
});

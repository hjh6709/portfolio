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
      'kagoshima-travel',
      'cledyu',
      'codebuddy',
    ]);
    expect(getOtherProjects().map((project) => project.slug)).toEqual(['pr-check-doctor']);
  });

  it('gives every published project an architecture and evidence', () => {
    for (const slug of getProjectSlugs()) {
      const project = getProject(slug);

      expect(project).toBeDefined();
      expect(project?.architecture.nodes.length).toBeGreaterThan(2);
      expect(project?.architecture.edges.length).toBeGreaterThan(1);
      expect(project?.architecture.zones.length).toBeGreaterThan(1);
      expect(project?.evidence.length).toBeGreaterThan(0);
    }
  });

  it('assigns every architecture component to exactly one deployment zone', () => {
    for (const project of projects) {
      const nodeIds = project.architecture.nodes.map((node) => node.id);
      const assignedNodeIds = project.architecture.zones.flatMap((zone) => zone.nodeIds);

      expect(new Set(assignedNodeIds), project.slug).toEqual(new Set(nodeIds));
      expect(assignedNodeIds, project.slug).toHaveLength(new Set(assignedNodeIds).size);
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

  it('publishes verified architecture evidence for Cledyu and Map Planner', () => {
    const cledyu = getProject('cledyu');
    const kagoshima = getProject('kagoshima-travel');

    expect(cledyu?.architectureImage?.src).toBe('projects/cledyu/architecture.png');
    expect(kagoshima?.architectureImage?.src).toBe(
      'projects/kagoshima-travel/service-flow.svg',
    );
  });

  it('marks Map Planner as an operating project under active revision', () => {
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
      ]),
    );
  });

  it('never publishes a live share token, which would expose real trip data', () => {
    // 공유 토큰 링크는 숙소 실주소와 항공 일정을 로그인 없이 노출합니다.
    // 데모가 아닌 실제 여행 토큰이 다시 들어오면 이 테스트가 막습니다.
    for (const slug of getProjectSlugs()) {
      const project = getProject(slug);
      const links = [
        ...(project?.evidence.map((item) => item.href) ?? []),
        ...(project?.journey?.map((step) => step.href ?? '') ?? []),
      ];

      for (const href of links) {
        expect(href).not.toMatch(/\/share\/[A-Za-z0-9_-]+/);
      }
    }
  });

  it('returns undefined for an unknown project', () => {
    expect(getProject('unknown')).toBeUndefined();
  });
});

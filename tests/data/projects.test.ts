import { describe, expect, it } from 'vitest';

import { projects } from '@/data/projects';
import { getFeaturedProjects, getProject, getProjectSlugs } from '@/lib/projects';

describe('project content', () => {
  it('publishes the five verified case studies in the intended order', () => {
    expect(getFeaturedProjects().map((project) => project.slug)).toEqual([
      'cledyu',
      'codebuddy',
      'kagoshima-travel',
      'chilseongpa',
      'pr-check-doctor',
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
  });

  it('returns undefined for an unknown project', () => {
    expect(getProject('unknown')).toBeUndefined();
  });
});

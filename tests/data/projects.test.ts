import { describe, expect, it } from 'vitest';

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

  it('returns undefined for an unknown project', () => {
    expect(getProject('unknown')).toBeUndefined();
  });
});

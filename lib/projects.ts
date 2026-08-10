import { projects } from '@/data/projects';

const flagshipProjectSlugs = ['cledyu', 'codebuddy', 'kagoshima-travel'];
const otherProjectSlugs = ['pr-check-doctor', 'chilseongpa'];

function getProjectsInOrder(slugs: string[]) {
  return slugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });
}

export function getFlagshipProjects() {
  return getProjectsInOrder(flagshipProjectSlugs);
}

export function getOtherProjects() {
  return getProjectsInOrder(otherProjectSlugs);
}

export function getFeaturedProjects() {
  return [...getFlagshipProjects(), ...getOtherProjects()];
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

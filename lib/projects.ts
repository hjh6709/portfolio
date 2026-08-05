import { projects } from '@/data/projects';

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

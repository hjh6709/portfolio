import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { projects } from '@/data/projects';

describe('project gallery assets', () => {
  it('shows the Cledyu service journey with real product screens', () => {
    const cledyu = projects.find((project) => project.slug === 'cledyu');

    expect(cledyu).toBeDefined();
    expect(cledyu?.gallery.length).toBeGreaterThanOrEqual(5);
  });

  it('ships every referenced image with descriptive alternative text', () => {
    for (const project of projects) {
      const images = [
        project.heroImage,
        ...project.gallery,
        ...project.featureStories,
        ...(project.architectureImage ? [project.architectureImage] : []),
      ];

      for (const image of images) {
        expect(existsSync(join(process.cwd(), 'public', image.src))).toBe(true);
        expect(image.alt.length).toBeGreaterThan(8);
        expect(image.caption.length).toBeGreaterThan(8);
      }
    }
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProjectCaseStudy } from '@/components/project-case-study';
import { projects } from '@/data/projects';
import { getProject } from '@/lib/projects';

describe('ProjectCaseStudy', () => {
  it('separates project scope, personal contribution and troubleshooting', () => {
    render(<ProjectCaseStudy project={getProject('cledyu')!} />);

    expect(screen.getByRole('heading', { name: 'Cledyu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '내가 담당한 영역' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '서비스 아키텍처' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '트러블슈팅' })).toBeInTheDocument();
  });

  it('renders an evidence-led case study in narrative order', () => {
    const project = projects[0];
    render(<ProjectCaseStudy project={project} />);

    const heroImage = screen.getByAltText(project.heroImage.alt);
    const challenge = screen.getByRole('heading', { name: '해결하려던 문제' });
    const architecture = screen.getByRole('heading', { name: '서비스 아키텍처' });
    const outcomes = screen.getByRole('heading', { name: '결과와 배운 점' });

    expect(
      heroImage.compareDocumentPosition(challenge) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      challenge.compareDocumentPosition(architecture) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      architecture.compareDocumentPosition(outcomes) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});

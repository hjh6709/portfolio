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
    const outcomes = screen.getByRole('heading', { name: '구현 결과' });
    const learnings = screen.getByRole('heading', { name: '배운 점' });

    expect(
      heroImage.compareDocumentPosition(challenge) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      challenge.compareDocumentPosition(architecture) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      architecture.compareDocumentPosition(outcomes) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      outcomes.compareDocumentPosition(learnings) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('does not repeat a hero image inside feature stories', () => {
    const project = getProject('codebuddy')!;
    const { container } = render(<ProjectCaseStudy project={project} />);
    const repeatedSource = `/${project.heroImage.src}`;

    const repeatedImages = Array.from(container.querySelectorAll('img')).filter((image) =>
      image.getAttribute('src')?.includes(repeatedSource),
    );

    expect(repeatedImages).toHaveLength(1);
  });

  it('shows project status, verified architecture and technology roles', () => {
    const project = getProject('kagoshima-travel')!;
    render(<ProjectCaseStudy project={project} />);

    expect(screen.getByText('운영 중 · 화면 개선 진행 중')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '기술과 역할' })).toBeInTheDocument();
    expect(
      screen.getByAltText('Kagoshima Travel 실제 배포 구성과 외부 서비스 연결 흐름'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Live service/ })).toHaveAttribute(
      'href',
      'https://kagoshima.hjh-dev.site/',
    );
  });
});

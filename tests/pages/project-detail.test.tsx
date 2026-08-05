import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProjectCaseStudy } from '@/components/project-case-study';
import { getProject } from '@/lib/projects';

describe('ProjectCaseStudy', () => {
  it('separates project scope, personal contribution and troubleshooting', () => {
    render(<ProjectCaseStudy project={getProject('cledyu')!} />);

    expect(screen.getByRole('heading', { name: 'Cledyu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '내가 담당한 영역' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '서비스 아키텍처' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '트러블슈팅' })).toBeInTheDocument();
  });
});

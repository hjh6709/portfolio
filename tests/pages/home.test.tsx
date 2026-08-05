import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('introduces backend positioning and links every featured project', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '서비스를 끝까지 연결하는 백엔드 개발자',
    );
    expect(screen.getByRole('heading', { name: '대표 프로젝트' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /사례 자세히 보기/ })).toHaveLength(5);
  });

  it('presents selected work before capabilities and uses project evidence', () => {
    render(<HomePage />);

    const selectedWork = screen.getByRole('heading', { name: '대표 프로젝트' });
    const capabilities = screen.getByRole('heading', { name: '사용한 기술' });

    expect(
      selectedWork.compareDocumentPosition(capabilities) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getByAltText(/Cledyu.*Lab/)).toBeInTheDocument();
    expect(screen.queryByText('Wait:ON')).not.toBeInTheDocument();
  });

  it('links project images to their case studies', () => {
    render(<HomePage />);

    const cledyuImage = screen.getByAltText(/Cledyu.*Lab/);

    expect(cledyuImage.closest('a')).toHaveAttribute('href', '/projects/cledyu');
  });
});

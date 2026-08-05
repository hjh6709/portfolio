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
    expect(screen.getAllByRole('link', { name: /프로젝트 자세히 보기/ })).toHaveLength(5);
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResumePage from '@/app/resume/page';

describe('ResumePage', () => {
  it('summarizes backend direction, training and internship without inflated claims', () => {
    render(<ResumePage />);

    expect(screen.getByRole('heading', { level: 1, name: '이력서' })).toBeInTheDocument();
    expect(screen.getByText('KT Cloud')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '클라우드 인프라 부트캠프' })).toBeInTheDocument();
    expect(screen.getByText('평택도시공사')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '안전감사실 인턴' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /프로젝트로 역량 확인하기/ })).toHaveAttribute(
      'href',
      '/#projects',
    );
  });
});

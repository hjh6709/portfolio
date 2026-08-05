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

  it('offers verifiable work instead of an unfinished download notice', () => {
    render(<ResumePage />);

    expect(screen.queryByText(/준비되면.*다운로드 링크/)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '직접 확인하기' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub에서 코드 보기/ })).toHaveAttribute(
      'href',
      expect.stringContaining('github.com'),
    );
    expect(screen.getByRole('link', { name: /프로젝트 사례 보기/ })).toHaveAttribute(
      'href',
      '/#projects',
    );
  });
});

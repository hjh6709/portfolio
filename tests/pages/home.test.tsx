import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('introduces backend and cloud positioning with direct proof links', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '안정적인 서비스를 만드는 개발자',
    );
    expect(screen.getByText('BACKEND · CLOUD')).toBeInTheDocument();
    expect(screen.getByText('04', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText('LIVE', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText('102', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText('MARKETPLACE', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Email/ })).toHaveAttribute(
      'href',
      'mailto:jh6780h@naver.com',
    );
    expect(screen.getByRole('heading', { name: '대표 프로젝트' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /사례 자세히 보기/ })).toHaveLength(3);
  });

  it('presents selected work before capabilities and uses project evidence', () => {
    render(<HomePage />);

    const selectedWork = screen.getByRole('heading', { name: '대표 프로젝트' });
    const capabilities = screen.getByRole('heading', { name: '기술 역량' });

    expect(
      selectedWork.compareDocumentPosition(capabilities) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getByAltText(/Cledyu 실습 화면/)).toBeInTheDocument();
  });

  it('presents supporting work separately from the three flagship projects', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Other Work' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'PR Check Doctor' })).toHaveAttribute(
      'href',
      '/projects/pr-check-doctor',
    );
    expect(screen.getByRole('link', { name: 'Wait:ON' })).toHaveAttribute(
      'href',
      '/projects/wait-on',
    );
  });

  it('links project images to their case studies', () => {
    render(<HomePage />);

    const cledyuImage = screen.getByAltText(/Cledyu 실습 화면/);

    expect(cledyuImage.closest('a')).toHaveAttribute('href', '/projects/cledyu');
  });

  it('uses one readable map screen as the Kagoshima home proof', () => {
    render(<HomePage />);

    expect(
      screen.getByAltText(/여행 도우미 앱.*저장 장소.*현재 위치.*지도/),
    ).toBeInTheDocument();
    expect(
      screen.queryByAltText(/Map Planner.*여행 마무리/),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByAltText(/Map Planner.*날짜별 일정/),
    ).not.toBeInTheDocument();
  });

  it('keeps the home timeline focused on education, not clerical internships', () => {
    render(<HomePage />);

    const educationHeading = screen.getByRole('heading', { name: '교육' });

    expect(educationHeading.closest('section')).toHaveAttribute('id', 'education');
    expect(screen.getByText(/KT Cloud/)).toBeInTheDocument();

    expect(screen.queryByRole('heading', { name: '경력' })).not.toBeInTheDocument();
    expect(screen.queryByText(/평택도시공사/)).not.toBeInTheDocument();
    expect(screen.queryByText(/아세테크/)).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SiteHeader } from '@/components/site-header';

describe('SiteHeader', () => {
  it('offers named navigation links without requiring hover', () => {
    render(<SiteHeader />);

    expect(screen.getByRole('navigation', { name: '주요 메뉴' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '프로젝트' })).toHaveAttribute('href', '/#projects');
    expect(screen.getByRole('link', { name: '경험' })).toHaveAttribute('href', '/#experience');
    expect(screen.getByRole('link', { name: '이력서' })).toHaveAttribute('href', '/resume');
  });
});

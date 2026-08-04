import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ArchitectureDiagram } from '@/components/architecture-diagram';

describe('ArchitectureDiagram', () => {
  it('exposes architecture nodes and labeled connections as text', () => {
    render(
      <ArchitectureDiagram
        title="테스트 아키텍처"
        nodes={[
          { id: 'web', label: 'Web', caption: 'Next.js', icon: 'nextjs', ownership: 'mine' },
          { id: 'api', label: 'API', caption: 'Go', icon: 'go', ownership: 'mine' },
        ]}
        edges={[{ from: 'web', to: 'api', label: 'API 요청', kind: 'request' }]}
      />,
    );

    expect(screen.getByRole('figure', { name: '테스트 아키텍처' })).toBeInTheDocument();
    expect(screen.getByText('API 요청')).toBeInTheDocument();
    expect(screen.getAllByText('직접 담당')).toHaveLength(2);
  });
});

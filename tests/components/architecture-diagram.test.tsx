import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { projects } from '@/data/projects';

describe('ArchitectureDiagram', () => {
  it('exposes architecture nodes and labeled connections as text', () => {
    render(
      <ArchitectureDiagram
        title="테스트 아키텍처"
        zones={[
          {
            id: 'application',
            label: '서비스 계층',
            caption: 'Web · API',
            kind: 'application',
            nodeIds: ['web', 'api'],
          },
        ]}
        nodes={[
          { id: 'web', label: 'Web', caption: 'Next.js', icon: 'nextjs', ownership: 'mine' },
          { id: 'api', label: 'API', caption: 'Go', icon: 'go', ownership: 'mine' },
        ]}
        edges={[{ from: 'web', to: 'api', label: 'API 요청', kind: 'request' }]}
      />,
    );

    expect(screen.getByRole('figure', { name: '테스트 아키텍처' })).toBeInTheDocument();
    expect(
      screen.getByRole('article', { name: 'Web: Next.js · 직접 구현' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('서비스 계층')).not.toHaveLength(0);
    expect(screen.getByText('API 요청')).toBeInTheDocument();
    expect(screen.getAllByText('직접 구현')).not.toHaveLength(0);
  });

  it.each([
    {
      slug: 'kagoshima-travel',
      boundaries: [
        'OCI REGION: Seoul region',
        'VIRTUAL CLOUD NETWORK: Private application network',
        'PUBLIC SUBNET',
        'PRIVATE APPLICATION SUBNET',
        'PRIVATE DATA SUBNET',
        'GOOGLE MAPS PLATFORM',
      ],
    },
  ])('renders nested deployment boundaries for $slug', ({ slug, boundaries }) => {
    const project = projects.find((item) => item.slug === slug);
    expect(project).toBeDefined();

    render(
      <ArchitectureDiagram
        project={slug}
        title={`${project!.title} 아키텍처`}
        zones={project!.architecture.zones}
        nodes={project!.architecture.nodes}
        edges={project!.architecture.edges}
      />,
    );

    boundaries.forEach((name) => {
      expect(screen.getByRole('region', { name })).toBeInTheDocument();
    });
  });

  it('routes the Cledyu validation return and overflow away from the main request path', () => {
    const project = projects.find((item) => item.slug === 'cledyu');
    expect(project).toBeDefined();

    const { container } = render(
      <ArchitectureDiagram
        project="cledyu"
        title="Cledyu 아키텍처"
        zones={project!.architecture.zones}
        nodes={project!.architecture.nodes}
        edges={project!.architecture.edges}
      />,
    );
    const routes = [...container.querySelectorAll('path')].map((path) => path.getAttribute('d'));

    expect(routes).toContain('M 1080 340 H 1108 V 96 H 824 V 132');
    expect(routes).toContain('M 852 160 H 882 V 550 H 820');
  });

  it('fits the Cledyu architecture inside a desktop viewport without local horizontal scrolling', () => {
    const project = projects.find((item) => item.slug === 'cledyu');
    expect(project).toBeDefined();

    const { container } = render(
      <ArchitectureDiagram
        project="cledyu"
        title="Cledyu 아키텍처"
        zones={project!.architecture.zones}
        nodes={project!.architecture.nodes}
        edges={project!.architecture.edges}
      />,
    );

    const viewport = screen.getByRole('group', { name: '아키텍처 다이어그램' });
    const canvas = container.querySelector('[data-project="cledyu"]');

    expect(viewport).toHaveAttribute('data-fit', 'desktop');
    expect(canvas).toHaveStyle({ minWidth: '1120px', width: '1120px' });
    expect(screen.queryByRole('article', { name: /BigQuery/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('article', { name: /Airflow/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('article', { name: /Redis/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('article', { name: /Session Dispatcher/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('article', { name: /Argo CD/ })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('region')).toHaveLength(0);
    expect(screen.queryByText('운영')).not.toBeInTheDocument();
  });

  it('routes the Kagoshima Maps request from the API without crossing the data subnet', () => {
    const project = projects.find((item) => item.slug === 'kagoshima-travel');
    expect(project).toBeDefined();

    const { container } = render(
      <ArchitectureDiagram
        project="kagoshima-travel"
        title="Map Planner 아키텍처"
        zones={project!.architecture.zones}
        nodes={project!.architecture.nodes}
        edges={project!.architecture.edges}
      />,
    );
    const routes = [...container.querySelectorAll('path')].map((path) => path.getAttribute('d'));

    expect(routes).toContain('M 862 226 H 958 V 334 H 1026');
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { projects } from '@/data/projects';

/** 경로 문자열에서 좌표만 뽑습니다. 모서리를 둥글게 다듬어도 지나는 지점은 그대로입니다. */
function pathPoints(d: string) {
  const numbers = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  const points: Array<{ x: number; y: number }> = [];
  for (let index = 0; index + 1 < numbers.length; index += 2) {
    points.push({ x: numbers[index], y: numbers[index + 1] });
  }
  return points;
}

/** 연결선만 고릅니다. 기술 아이콘도 path라서 좁히지 않으면 아이콘 좌표까지 딸려옵니다. */
function connectionRoutes(container: HTMLElement) {
  return [...container.querySelectorAll('g[data-kind] path')].map((path) =>
    pathPoints(path.getAttribute('d') ?? ''),
  );
}

function routeThrough(container: HTMLElement, predicate: (points: Array<{ x: number; y: number }>) => boolean) {
  return connectionRoutes(container).some((points) => points.length > 2 && predicate(points));
}

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

    // 검증 결과가 API로 돌아오는 선은 요청 행 위로 우회해야 요청 흐름을 가리지 않습니다.
    expect(routeThrough(container, (points) => points.some((point) => point.y < 99))).toBe(true);
    // 예비 계통으로 내려가는 선은 지원 계층을 지나 세 번째 행까지 닿아야 합니다.
    expect(routeThrough(container, (points) => points.some((point) => point.y >= 459))).toBe(true);
    // 어떤 선도 노드 열 안쪽을 세로로 관통하지 않고 열 사이 통로로만 지납니다.
    const gutters = [640, 802, 963];
    const verticalRuns = connectionRoutes(container)
      .flatMap((points) => points.slice(1).map((point, index) => ({ from: points[index], to: point })))
      .filter((run) => Math.abs(run.from.x - run.to.x) < 2 && Math.abs(run.from.y - run.to.y) > 60);
    verticalRuns.forEach((run) => {
      const insideRow = run.from.y < 366 && run.to.y > 279;
      if (!insideRow) return;
      expect(gutters.some((gutter) => Math.abs(run.from.x - gutter) < 8)).toBe(true);
    });
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
    // Maps 호출만 골라냅니다. 외부 구역의 Places 노드까지 닿는 선이 그것 하나입니다.
    const mapsRoute = connectionRoutes(container).find((points) =>
      points.some((point) => point.x > 1000),
    );

    expect(mapsRoute).toBeDefined();
    // 그 선은 비공개 데이터 서브넷(x 710~914, y 350~524) 안을 지나면 안 됩니다.
    expect(
      mapsRoute!.some((point) => point.x > 710 && point.x < 914 && point.y > 350 && point.y < 524),
    ).toBe(false);
  });
});

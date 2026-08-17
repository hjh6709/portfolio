import { useId } from 'react';

import type {
  ArchitectureEdge,
  ArchitectureNode,
  ArchitectureZone,
} from '@/data/projects';

import styles from './architecture-diagram.module.css';
import { TechnologyIcon } from './technology-icon';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 720;

type Point = { x: number; y: number };
type Boundary = {
  id: string;
  label: string;
  caption?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tone: 'neutral' | 'cloud' | 'cluster' | 'subnet' | 'data' | 'external' | 'recovery' | 'operations';
  dashed?: boolean;
};

type DiagramPreset = {
  width?: number;
  height?: number;
  boundaries: Boundary[];
  positions: Record<string, Point>;
  routes?: Record<string, string>;
  labels?: Record<string, Point>;
  hiddenLabels?: string[];
};

type ArchitectureDiagramProps = {
  project?: string;
  title: string;
  zones: ArchitectureZone[];
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

const ownershipLabels: Record<ArchitectureNode['ownership'], string> = {
  mine: '직접 구현',
  team: '팀 구현',
  external: '외부 서비스',
};

const legendLabels: Record<ArchitectureEdge['kind'], string> = {
  request: '요청',
  data: '데이터',
  security: '인증·보안',
  operations: '운영',
  recovery: '복구',
};

const cledyuPreset: DiagramPreset = {
  width: 1120,
  height: 690,
  boundaries: [],
  positions: {
    learner: { x: 68, y: 160 },
    edge: { x: 216, y: 160 },
    tunnel: { x: 368, y: 160 },
    traefik: { x: 520, y: 160 },
    web: { x: 672, y: 160 },
    api: { x: 824, y: 160 },
    vm: { x: 1052, y: 160 },
    keycloak: { x: 672, y: 340 },
    db: { x: 800, y: 340 },
    kafka: { x: 932, y: 340 },
    validation: { x: 1052, y: 340 },
    ai: { x: 672, y: 520 },
    overflow: { x: 792, y: 550 },
    dr: { x: 960, y: 550 },
    s3: { x: 1052, y: 630 },
  },
  routes: {
    'learner:edge': 'M 96 160 H 188',
    'edge:tunnel': 'M 244 160 H 340',
    'tunnel:traefik': 'M 396 160 H 492',
    'traefik:web': 'M 548 160 H 644',
    'web:api': 'M 700 160 H 796',
    'api:vm': 'M 852 160 H 1024',
    'web:keycloak': 'M 700 160 H 720 V 340 H 700',
    'api:ai': 'M 796 160 H 744 V 520 H 700',
    'api:db': 'M 796 160 H 766 V 340 H 772',
    'api:kafka': 'M 852 160 H 882 V 340 H 904',
    'kafka:validation': 'M 960 340 H 1024',
    'vm:validation': 'M 1080 160 H 1098 V 340 H 1080',
    'validation:api': 'M 1080 340 H 1108 V 96 H 824 V 132',
    'api:overflow': 'M 852 160 H 882 V 550 H 820',
    'overflow:dr': 'M 820 550 H 932',
    's3:dr': 'M 1024 630 H 1008 V 550 H 988',
  },
  labels: {
    'api:vm': { x: 938, y: 146 },
    'web:keycloak': { x: 742, y: 250 },
    'api:ai': { x: 732, y: 506 },
    'api:kafka': { x: 892, y: 250 },
    'vm:validation': { x: 1088, y: 250 },
    'validation:api': { x: 968, y: 84 },
    'api:overflow': { x: 854, y: 500 },
    'overflow:dr': { x: 876, y: 536 },
    's3:dr': { x: 1050, y: 606 },
  },
  hiddenLabels: [
    'learner:edge',
    'edge:tunnel',
    'tunnel:traefik',
    'traefik:web',
    'web:api',
    'api:db',
    'kafka:validation',
  ],
};

const codebuddyPreset: DiagramPreset = {
  boundaries: [
    { id: 'source', label: 'GITHUB', caption: 'Source event', x: 36, y: 126, width: 190, height: 420, tone: 'external' },
    { id: 'aws', label: 'AWS CLOUD', caption: 'Serverless review pipeline', x: 252, y: 62, width: 716, height: 548, tone: 'cloud' },
    { id: 'ingress', label: 'INGRESS', caption: 'Validated webhook', x: 280, y: 130, width: 180, height: 410, tone: 'neutral', dashed: true },
    { id: 'compute', label: 'ASYNC COMPUTE', caption: 'Lambda orchestration', x: 482, y: 130, width: 278, height: 410, tone: 'cluster', dashed: true },
    { id: 'inference', label: 'AI INFERENCE', caption: 'Bedrock Agent', x: 780, y: 130, width: 160, height: 410, tone: 'data', dashed: true },
    { id: 'delivery', label: 'DELIVERY', caption: 'Review and notification', x: 994, y: 126, width: 170, height: 420, tone: 'external' },
  ],
  positions: {
    github: { x: 130, y: 330 }, gateway: { x: 368, y: 330 }, orchestrator: { x: 548, y: 330 }, worker: { x: 686, y: 330 }, bedrock: { x: 860, y: 330 }, delivery: { x: 1080, y: 330 },
  },
};

const kagoshimaPreset: DiagramPreset = {
  boundaries: [
    { id: 'client', label: 'CLIENT', caption: 'Mobile browser', x: 24, y: 148, width: 144, height: 374, tone: 'external' },
    { id: 'vercel', label: 'VERCEL CLOUD', caption: 'PWA delivery', x: 190, y: 92, width: 250, height: 486, tone: 'cloud' },
    { id: 'region', label: 'OCI REGION', caption: 'Seoul region', x: 464, y: 42, width: 502, height: 552, tone: 'cloud' },
    { id: 'oci', label: 'VIRTUAL CLOUD NETWORK', caption: 'Private application network', x: 490, y: 84, width: 450, height: 478, tone: 'cluster', dashed: true },
    { id: 'public', label: 'PUBLIC SUBNET', x: 514, y: 138, width: 170, height: 386, tone: 'subnet' },
    { id: 'backend', label: 'PRIVATE APPLICATION SUBNET', x: 710, y: 138, width: 204, height: 176, tone: 'subnet' },
    { id: 'data', label: 'PRIVATE DATA SUBNET', x: 710, y: 350, width: 204, height: 174, tone: 'data' },
    { id: 'external', label: 'GOOGLE MAPS PLATFORM', x: 986, y: 148, width: 180, height: 374, tone: 'external' },
    { id: 'cicd', label: 'CI/CD', caption: 'GitHub Actions deployment', x: 224, y: 608, width: 720, height: 92, tone: 'operations' },
  ],
  positions: {
    traveler: { x: 96, y: 334 }, web: { x: 315, y: 410 }, vercel: { x: 315, y: 244 }, caddy: { x: 599, y: 334 }, api: { x: 812, y: 226 }, db: { x: 812, y: 438 }, places: { x: 1076, y: 334 }, actions: { x: 584, y: 656 },
  },
  routes: {
    'traveler:vercel': 'M 146 334 H 265',
    'vercel:web': 'M 315 279 V 375',
    'web:caddy': 'M 365 410 H 458 V 334 H 549',
    'caddy:api': 'M 649 334 H 680 V 226 H 762',
    'api:db': 'M 812 261 V 403',
    'api:places': 'M 862 226 H 958 V 334 H 1026',
    'actions:vercel': 'M 552 621 V 580 H 315 V 279',
    'actions:api': 'M 616 621 V 580 H 812 V 261',
  },
  labels: {
    'traveler:vercel': { x: 206, y: 324 },
    'vercel:web': { x: 332, y: 330 },
    'web:caddy': { x: 458, y: 396 },
    'caddy:api': { x: 694, y: 246 },
    'api:db': { x: 840, y: 334 },
    'api:places': { x: 956, y: 252 },
    'actions:vercel': { x: 430, y: 570 },
    'actions:api': { x: 720, y: 570 },
  },
};

const prCheckPreset: DiagramPreset = {
  boundaries: [
    { id: 'github', label: 'GITHUB ACTIONS RUNNER', caption: 'Pull request event', x: 34, y: 150, width: 200, height: 380, tone: 'external' },
    { id: 'action', label: 'PR CHECK DOCTOR ACTION', caption: 'Isolated analysis pipeline', x: 262, y: 82, width: 700, height: 516, tone: 'cluster' },
    { id: 'privacy', label: 'PRIVACY BOUNDARY', caption: 'Local redaction before inference', x: 446, y: 144, width: 312, height: 392, tone: 'data', dashed: true },
    { id: 'result', label: 'PULL REQUEST', caption: 'Action summary and annotations', x: 990, y: 150, width: 176, height: 380, tone: 'external' },
  ],
  positions: {
    ci: { x: 132, y: 340 }, collector: { x: 344, y: 340 }, redactor: { x: 516, y: 340 }, classifier: { x: 690, y: 340 }, renderer: { x: 862, y: 340 }, pr: { x: 1078, y: 340 },
  },
};

const presets: Record<string, DiagramPreset> = {
  cledyu: cledyuPreset,
  codebuddy: codebuddyPreset,
  'kagoshima-travel': kagoshimaPreset,
  'pr-check-doctor': prCheckPreset,
};

function buildFallbackPreset(zones: ArchitectureZone[], nodes: ArchitectureNode[]): DiagramPreset {
  const columns = Math.max(zones.length, 1);
  const zoneWidth = 1080 / columns;
  const positions: Record<string, Point> = {};
  const boundaries = zones.map((zone, index) => {
    const nodeIds = zone.nodeIds.filter((id) => nodes.some((node) => node.id === id));
    nodeIds.forEach((id, nodeIndex) => {
      positions[id] = {
        x: 80 + zoneWidth * index + zoneWidth / 2,
        y: 210 + nodeIndex * Math.min(116, 330 / Math.max(nodeIds.length, 1)),
      };
    });
    return {
      id: zone.id,
      label: zone.label,
      caption: zone.caption,
      x: 60 + zoneWidth * index,
      y: 92,
      width: zoneWidth - 24,
      height: 520,
      tone: zone.kind === 'recovery' ? 'recovery' : zone.kind === 'data' ? 'data' : 'neutral',
    } satisfies Boundary;
  });
  return { boundaries, positions };
}

function edgePath(from: Point, to: Point) {
  const deltaX = Math.abs(to.x - from.x);
  const deltaY = Math.abs(to.y - from.y);
  if (deltaY > deltaX) {
    const direction = to.y >= from.y ? 1 : -1;
    const startY = from.y + 36 * direction;
    const endY = to.y - 36 * direction;
    const middleY = startY + (endY - startY) / 2;
    return `M ${from.x} ${startY} V ${middleY} H ${to.x} V ${endY}`;
  }

  const direction = to.x >= from.x ? 1 : -1;
  const startX = from.x + 49 * direction;
  const endX = to.x - 49 * direction;
  if (Math.abs(from.y - to.y) < 24) return `M ${startX} ${from.y} H ${endX}`;
  const middleX = startX + (endX - startX) / 2;
  return `M ${startX} ${from.y} H ${middleX} V ${to.y} H ${endX}`;
}

export function ArchitectureDiagram({ project, title, zones, nodes, edges }: ArchitectureDiagramProps) {
  const markerId = useId().replace(/:/g, '');
  const preset = (project && presets[project]) || buildFallbackPreset(zones, nodes);
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const canvasWidth = preset.width ?? CANVAS_WIDTH;
  const canvasHeight = preset.height ?? CANVAS_HEIGHT;
  const usedEdgeKinds = new Set(edges.map((edge) => edge.kind));

  return (
    <figure className={styles.figure} aria-label={title}>
      <figcaption className={styles.caption}>
        <div>
          <span>{project === 'cledyu' ? 'SYSTEM ARCHITECTURE · SERVICE FLOW' : 'SYSTEM ARCHITECTURE · DEPLOYMENT TOPOLOGY'}</span>
          <h2>{title}</h2>
          <p>
            {project === 'cledyu'
              ? '사용자 요청부터 인증, 세션 생성, 검증, 오버플로와 복구까지 실제 구현 흐름만 표현했습니다.'
              : '배포 경계, 실행 위치, 데이터 이동과 장애 대응 경로를 실제 구성 기준으로 표현했습니다.'}
          </p>
        </div>
        <ul className={styles.legend} aria-label="연결선 범례">
          {(Object.entries(legendLabels) as Array<[ArchitectureEdge['kind'], string]>)
            .filter(([kind]) => usedEdgeKinds.has(kind))
            .map(([kind, label]) => <li data-kind={kind} key={kind}><span />{label}</li>)}
        </ul>
      </figcaption>

      <div
        className={styles.viewport}
        data-fit={project === 'cledyu' ? 'desktop' : undefined}
        role="group"
        aria-label="아키텍처 다이어그램"
      >
        <div
          className={styles.canvas}
          data-project={project}
          style={{ height: canvasHeight, minWidth: canvasWidth, width: canvasWidth }}
        >
          <div className={styles.cloudLabel}>{project === 'cledyu' ? 'CORE SERVICE FLOW' : 'DEPLOYMENT BOUNDARIES'}</div>
          {preset.boundaries.map((boundary) => (
            <section
              className={styles.boundary}
              data-dashed={boundary.dashed || undefined}
              data-tone={boundary.tone}
              key={boundary.id}
              style={{ left: boundary.x, top: boundary.y, width: boundary.width, height: boundary.height }}
              aria-label={`${boundary.label}${boundary.caption ? `: ${boundary.caption}` : ''}`}
            >
              <header><strong>{boundary.label}</strong></header>
            </section>
          ))}

          <svg className={styles.connections} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} aria-hidden="true">
            <defs>
              {(['request', 'data', 'security', 'operations', 'recovery'] as const).map((kind) => (
                <marker id={`${markerId}-${kind}`} key={kind} markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
                  <path className={styles[`${kind}Arrow`]} d="M0,0 L8,4 L0,8 Z" />
                </marker>
              ))}
            </defs>
            {edges.map((edge) => {
              const from = preset.positions[edge.from];
              const to = preset.positions[edge.to];
              if (!from || !to) return null;
              const routeKey = `${edge.from}:${edge.to}`;
              const labelPosition = preset.labels?.[routeKey];
              const labelX = labelPosition?.x ?? from.x + (to.x - from.x) / 2;
              const labelY = labelPosition?.y ?? from.y + (to.y - from.y) / 2 - 8;
              const showLabel = !preset.hiddenLabels?.includes(routeKey)
                && (Boolean(labelPosition) || Math.abs(from.x - to.x) > 130 || Math.abs(from.y - to.y) > 90);
              return (
                <g className={styles.connection} data-kind={edge.kind} key={`${edge.from}-${edge.to}-${edge.label}`}>
                  <path d={preset.routes?.[routeKey] ?? edgePath(from, to)} markerEnd={`url(#${markerId}-${edge.kind})`} />
                  {showLabel ? <text x={labelX} y={labelY} textAnchor="middle">{edge.label}</text> : null}
                </g>
              );
            })}
          </svg>

          {nodes.map((node) => {
            const position = preset.positions[node.id];
            if (!position) return null;
            return (
              <article
                aria-label={`${node.label}: ${node.caption} · ${ownershipLabels[node.ownership]}`}
                className={styles.node}
                data-icon={node.icon}
                data-node={node.id}
                data-ownership={node.ownership}
                key={node.id}
                style={{ left: position.x, top: position.y }}
              >
                <span className={styles.nodeIcon}><TechnologyIcon name={node.icon} label={node.label} /></span>
                <strong>{node.label}</strong>
                <small>{node.caption}</small>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.accessibleDetails}>
        <h3>구성 요소와 통신 경로</h3>
        <ul>
          {edges.map((edge) => (
            <li key={`${edge.from}-${edge.to}-${edge.label}`}>
              {nodeById.get(edge.from)?.label}에서 {nodeById.get(edge.to)?.label}(으)로 {edge.label}
            </li>
          ))}
        </ul>
        <ul>
          {nodes.map((node) => (
            <li key={node.id}>
              {node.label}: {node.caption} · <strong>{ownershipLabels[node.ownership]}</strong>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

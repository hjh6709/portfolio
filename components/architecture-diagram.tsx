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

/*
 * 노드를 같은 간격의 격자에 올리고, 열 사이에 30px 통로를 남깁니다. 세로선이
 * 그 통로로만 지나가면 박스를 뚫고 가는 선이 생기지 않습니다.
 */
const cledyuPreset: DiagramPreset = {
  width: 1120,
  height: 640,
  boundaries: [],
  positions: {
    learner: { x: 76, y: 120 },
    edge: { x: 237, y: 120 },
    tunnel: { x: 398, y: 120 },
    traefik: { x: 560, y: 120 },
    web: { x: 721, y: 120 },
    api: { x: 882, y: 120 },
    vm: { x: 1044, y: 120 },
    keycloak: { x: 560, y: 300 },
    db: { x: 721, y: 300 },
    kafka: { x: 882, y: 300 },
    validation: { x: 1044, y: 300 },
    ai: { x: 560, y: 480 },
    overflow: { x: 721, y: 480 },
    dr: { x: 882, y: 480 },
    s3: { x: 1044, y: 480 },
  },
  routes: {
    'learner:edge': 'M 142 120 H 171',
    'edge:tunnel': 'M 303 120 H 332',
    'tunnel:traefik': 'M 464 120 H 494',
    'traefik:web': 'M 626 120 H 655',
    'web:api': 'M 787 120 H 816',
    'api:vm': 'M 948 120 H 978',
    'web:keycloak': 'M 700 186 V 240 H 560 V 279',
    'api:ai': 'M 838 202 V 230 H 640 V 410 H 560 V 459',
    'api:db': 'M 860 202 V 250 H 721 V 279',
    'api:kafka': 'M 900 202 V 279',
    'api:overflow': 'M 920 202 V 268 H 802 V 430 H 721 V 459',
    'kafka:validation': 'M 948 300 H 978',
    'vm:validation': 'M 1044 186 V 279',
    'validation:api': 'M 1044 366 V 400 H 963 V 78 H 882 V 99',
    'overflow:dr': 'M 787 480 H 816',
    's3:dr': 'M 978 480 H 948',
  },
  labels: {
    'api:vm': { x: 963, y: 92 },
    'web:keycloak': { x: 628, y: 228 },
    'api:ai': { x: 660, y: 398 },
    'api:kafka': { x: 916, y: 244 },
    'api:overflow': { x: 760, y: 418 },
    'vm:validation': { x: 1060, y: 236 },
    'validation:api': { x: 979, y: 70 },
    'overflow:dr': { x: 801, y: 452 },
    's3:dr': { x: 963, y: 452 },
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

const waitOnPreset: DiagramPreset = {
  boundaries: [
    { id: 'client', label: '보호자 화면', caption: 'Next.js 16 · React 19', x: 40, y: 150, width: 200, height: 380, tone: 'external' },
    { id: 'application', label: '보호자 여정 API', caption: 'NestJS 11 · 공유 Zod 계약', x: 280, y: 60, width: 380, height: 560, tone: 'cluster' },
    { id: 'external', label: '공식 소스', caption: '삼성서울병원 공개 층별 안내도', x: 760, y: 150, width: 220, height: 380, tone: 'external' },
  ],
  positions: {
    web: { x: 140, y: 340 },
    api: { x: 470, y: 340 },
    journeyRepo: { x: 470, y: 150 },
    restrictionService: { x: 470, y: 530 },
    hospitalMap: { x: 870, y: 340 },
  },
  routes: {
    'web:api': 'M 189 340 H 421',
    'api:journeyRepo': 'M 470 304 V 186',
    'api:restrictionService': 'M 470 376 V 494',
    'api:hospitalMap': 'M 519 340 H 821',
  },
  labels: {
    'web:api': { x: 355, y: 326 },
    'api:journeyRepo': { x: 552, y: 245 },
    'api:restrictionService': { x: 570, y: 435 },
    'api:hospitalMap': { x: 695, y: 326 },
  },
};

const presets: Record<string, DiagramPreset> = {
  cledyu: cledyuPreset,
  codebuddy: codebuddyPreset,
  'kagoshima-travel': kagoshimaPreset,
  'pr-check-doctor': prCheckPreset,
  'wait-on': waitOnPreset,
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

/*
 * 경로가 직각으로 꺾이면 모서리가 날카로워 선이 거칠게 보입니다. 꺾이는 지점마다
 * 짧은 곡선을 넣어 잇습니다. M, H, V로만 이루어진 경로에만 적용하고 그 밖의
 * 형태는 원본을 그대로 돌려줍니다.
 */
function roundPath(d: string, radius = 14) {
  const tokens = d.trim().split(/\s+/);
  const points: Point[] = [];
  let x = 0;
  let y = 0;

  for (let index = 0; index < tokens.length; index += 1) {
    const command = tokens[index];
    if (command === 'M') {
      x = Number(tokens[index + 1]);
      y = Number(tokens[index + 2]);
      index += 2;
    } else if (command === 'H') {
      x = Number(tokens[index + 1]);
      index += 1;
    } else if (command === 'V') {
      y = Number(tokens[index + 1]);
      index += 1;
    } else {
      return d;
    }
    if (Number.isNaN(x) || Number.isNaN(y)) return d;
    points.push({ x, y });
  }

  if (points.length < 3) return d;

  const round = (value: number) => Math.round(value * 10) / 10;
  let path = `M ${round(points[0].x)} ${round(points[0].y)}`;

  for (let index = 1; index < points.length - 1; index += 1) {
    const previous = points[index - 1];
    const corner = points[index];
    const next = points[index + 1];
    const inLength = Math.hypot(corner.x - previous.x, corner.y - previous.y);
    const outLength = Math.hypot(next.x - corner.x, next.y - corner.y);
    if (inLength === 0 || outLength === 0) continue;

    // 짧은 구간에서는 곡선이 구간보다 커지지 않도록 반지름을 줄입니다.
    const r = Math.min(radius, inLength / 2, outLength / 2);
    const enter = {
      x: corner.x + ((previous.x - corner.x) / inLength) * r,
      y: corner.y + ((previous.y - corner.y) / inLength) * r,
    };
    const exit = {
      x: corner.x + ((next.x - corner.x) / outLength) * r,
      y: corner.y + ((next.y - corner.y) / outLength) * r,
    };
    path += ` L ${round(enter.x)} ${round(enter.y)} Q ${round(corner.x)} ${round(corner.y)} ${round(exit.x)} ${round(exit.y)}`;
  }

  const last = points[points.length - 1];
  return `${path} L ${round(last.x)} ${round(last.y)}`;
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
              // 노드 상자는 연결점보다 21px 위에서 시작합니다. 라벨을 그보다 더
              // 띄워야 이웃 노드의 이름을 덮지 않습니다.
              const labelY = labelPosition?.y ?? from.y + (to.y - from.y) / 2 - 28;
              const showLabel = !preset.hiddenLabels?.includes(routeKey)
                && (Boolean(labelPosition) || Math.abs(from.x - to.x) > 130 || Math.abs(from.y - to.y) > 90);
              return (
                <g className={styles.connection} data-kind={edge.kind} key={`${edge.from}-${edge.to}-${edge.label}`}>
                  <path d={roundPath(preset.routes?.[routeKey] ?? edgePath(from, to))} markerEnd={`url(#${markerId}-${edge.kind})`} />
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

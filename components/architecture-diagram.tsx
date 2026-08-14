import { useId } from 'react';

import type { ArchitectureEdge, ArchitectureNode } from '@/data/projects';

import styles from './architecture-diagram.module.css';
import { TechnologyIcon } from './technology-icon';

const ownershipLabels: Record<ArchitectureNode['ownership'], string> = {
  mine: '직접 구현',
  team: '팀 구현',
  external: '외부 서비스',
};

const laneOrder: ArchitectureEdge['kind'][] = [
  'request',
  'data',
  'security',
  'operations',
  'recovery',
];

const laneMeta: Record<ArchitectureEdge['kind'], { label: string; caption: string }> = {
  request: { label: '사용자·서비스 요청', caption: '접속부터 기능 실행까지의 동기 호출' },
  data: { label: '데이터·이벤트', caption: '상태 저장과 비동기 검증 흐름' },
  security: { label: '보안·구성', caption: '인증 정보와 Secret 전달 경계' },
  operations: { label: '배포·관측', caption: '배포 자동화와 운영 상태 수집' },
  recovery: { label: '복구·대체', caption: '용량 초과와 장애 시 우회 경로' },
};

type ArchitectureDiagramProps = {
  title: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

function Endpoint({ node }: { node: ArchitectureNode }) {
  return (
    <div className={styles.endpoint} data-ownership={node.ownership}>
      <span className={styles.endpointIcon}>
        <TechnologyIcon name={node.icon} label={node.label} />
      </span>
      <span className={styles.endpointCopy}>
        <strong>{node.label}</strong>
        <small>{node.caption}</small>
      </span>
    </div>
  );
}

export function ArchitectureDiagram({ title, nodes, edges }: ArchitectureDiagramProps) {
  const diagramId = useId();
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const activeLanes = laneOrder.filter((kind) => edges.some((edge) => edge.kind === kind));

  return (
    <figure className={styles.figure} aria-label={title}>
      <figcaption className={styles.caption}>
        <div>
          <span>SYSTEM ARCHITECTURE · CURRENT IMPLEMENTATION</span>
          <h2>{title}</h2>
          <p>실제 구현과 배포 경계를 기준으로 구성 요소와 데이터 흐름을 정리했습니다.</p>
        </div>
        <dl className={styles.summary}>
          <div><dt>COMPONENTS</dt><dd>{String(nodes.length).padStart(2, '0')}</dd></div>
          <div><dt>CONNECTIONS</dt><dd>{String(edges.length).padStart(2, '0')}</dd></div>
        </dl>
      </figcaption>

      <section className={styles.inventory} aria-labelledby={`${diagramId}-components`}>
        <header>
          <span>01</span>
          <div>
            <h3 id={`${diagramId}-components`}>구성 요소와 책임 경계</h3>
            <p>색상 표시는 구현 담당 범위를, 제품 로고는 실제 사용 기술을 뜻합니다.</p>
          </div>
          <ul className={styles.legend} aria-label="담당 범위 범례">
            {(Object.entries(ownershipLabels) as [ArchitectureNode['ownership'], string][]).map(([key, label]) => (
              <li key={key} data-ownership={key}><span aria-hidden="true" />{label}</li>
            ))}
          </ul>
        </header>
        <ul className={styles.componentGrid}>
          {nodes.map((node, index) => (
            <li key={node.id} data-ownership={node.ownership}>
              <span className={styles.componentIndex}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.componentIcon}><TechnologyIcon name={node.icon} label={node.label} /></span>
              <span className={styles.componentCopy}>
                <strong>{node.label}</strong>
                <small>{node.caption}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.flow} aria-labelledby={`${diagramId}-flow`}>
        <header className={styles.flowHeader}>
          <span>02</span>
          <div>
            <h3 id={`${diagramId}-flow`}>연결 흐름</h3>
            <p>선이 교차하지 않도록 목적별 레인으로 분리해 요청의 방향과 역할을 표시했습니다.</p>
          </div>
        </header>

        <div className={styles.lanes}>
          {activeLanes.map((kind, laneIndex) => {
            const laneEdges = edges.filter((edge) => edge.kind === kind);
            const meta = laneMeta[kind];

            return (
              <section className={styles.lane} data-kind={kind} key={kind}>
                <header>
                  <span>{String(laneIndex + 1).padStart(2, '0')}</span>
                  <h4>{meta.label}</h4>
                  <p>{meta.caption}</p>
                </header>
                <ol>
                  {laneEdges.map((edge) => {
                    const from = nodeById.get(edge.from);
                    const to = nodeById.get(edge.to);
                    if (!from || !to) return null;

                    return (
                      <li key={`${edge.from}-${edge.to}-${edge.label}`}>
                        <Endpoint node={from} />
                        <div className={styles.connector}>
                          <span>{edge.label}</span>
                          <i aria-hidden="true" />
                        </div>
                        <Endpoint node={to} />
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>
      </section>
    </figure>
  );
}

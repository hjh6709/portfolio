import type { ArchitectureEdge, ArchitectureNode } from '@/data/projects';

import styles from './architecture-diagram.module.css';
import { TechnologyIcon } from './technology-icon';

const ownershipLabels: Record<ArchitectureNode['ownership'], string> = {
  mine: '직접 담당',
  team: '팀 담당',
  external: '외부 서비스',
};

const ownershipLegendLabels: Record<ArchitectureNode['ownership'], string> = {
  mine: '내 담당 영역',
  team: '팀 담당 영역',
  external: '외부 서비스',
};

const edgeLabels: Record<ArchitectureEdge['kind'], string> = {
  request: '요청',
  data: '데이터',
  recovery: '복구·대체',
};

type ArchitectureDiagramProps = {
  title: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

export function ArchitectureDiagram({ title, nodes, edges }: ArchitectureDiagramProps) {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  return (
    <figure className={styles.figure} aria-label={title}>
      <figcaption className={styles.caption}>
        <div>
          <span>ARCHITECTURE</span>
          <h2>{title}</h2>
        </div>
        <ul aria-label="담당 범위 범례" className={styles.legend}>
          {Object.entries(ownershipLegendLabels).map(([key, label]) => (
            <li key={key} data-ownership={key}>
              <span aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </figcaption>

      <div className={styles.viewport} tabIndex={0} aria-label="아키텍처 구성 요소">
        <div className={styles.nodeGrid}>
          {nodes.map((node, index) => (
            <article className={styles.node} key={node.id} data-ownership={node.ownership}>
              <div className={styles.nodeIndex}>{String(index + 1).padStart(2, '0')}</div>
              <div className={styles.icon}>
                <TechnologyIcon name={node.icon} label={node.label} />
              </div>
              <div className={styles.nodeCopy}>
                <h3>{node.label}</h3>
                <p>{node.caption}</p>
              </div>
              <span className={styles.ownership}>{ownershipLabels[node.ownership]}</span>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.routes}>
        <div className={styles.routesHeading}>
          <h3>연결 흐름</h3>
          <span>{String(edges.length).padStart(2, '0')} CONNECTIONS</span>
        </div>
        <ol>
          {edges.map((edge, index) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);

            if (!from || !to) return null;

            return (
              <li key={`${edge.from}-${edge.to}-${edge.label}`} data-kind={edge.kind}>
                <span className={styles.routeIndex}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.routeNode}>{from.label}</span>
                <span className={styles.routeLine} aria-hidden="true" />
                <span className={styles.routeLabel}>
                  <small>{edgeLabels[edge.kind]}</small>
                  {edge.label}
                </span>
                <span className={styles.routeArrow} aria-hidden="true">→</span>
                <span className={styles.routeNode}>{to.label}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}

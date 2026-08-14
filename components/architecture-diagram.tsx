import { useId } from 'react';

import type {
  ArchitectureEdge,
  ArchitectureNode,
  ArchitectureZone,
} from '@/data/projects';

import styles from './architecture-diagram.module.css';
import { TechnologyIcon } from './technology-icon';

const ownershipLabels: Record<ArchitectureNode['ownership'], string> = {
  mine: '직접 구현',
  team: '팀 구현',
  external: '외부 서비스',
};

const interfaceLabels: Record<ArchitectureEdge['kind'], string> = {
  request: 'REQUEST',
  data: 'DATA',
  security: 'SECURITY',
  operations: 'OPERATIONS',
  recovery: 'RECOVERY',
};

type ArchitectureDiagramProps = {
  title: string;
  zones: ArchitectureZone[];
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

export function ArchitectureDiagram({ title, zones, nodes, edges }: ArchitectureDiagramProps) {
  const diagramId = useId();
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const zoneByNode = new Map<string, ArchitectureZone>();

  zones.forEach((zone) => {
    zone.nodeIds.forEach((nodeId) => zoneByNode.set(nodeId, zone));
  });

  const connectedZones = new Map<string, Set<string>>(
    zones.map((zone) => [zone.id, new Set<string>()]),
  );

  edges.forEach((edge) => {
    const sourceZone = zoneByNode.get(edge.from);
    const targetZone = zoneByNode.get(edge.to);

    if (sourceZone && targetZone && sourceZone.id !== targetZone.id) {
      connectedZones.get(sourceZone.id)?.add(targetZone.label);
      connectedZones.get(targetZone.id)?.add(sourceZone.label);
    }
  });

  return (
    <figure className={styles.figure} aria-label={title}>
      <figcaption className={styles.caption}>
        <div>
          <span>SYSTEM ARCHITECTURE · DEPLOYMENT TOPOLOGY</span>
          <h2>{title}</h2>
          <p>실제 배포 경계와 런타임 책임을 기준으로 구성 요소와 인터페이스를 정리했습니다.</p>
        </div>
        <dl className={styles.summary}>
          <div><dt>ZONES</dt><dd>{String(zones.length).padStart(2, '0')}</dd></div>
          <div><dt>COMPONENTS</dt><dd>{String(nodes.length).padStart(2, '0')}</dd></div>
          <div><dt>INTERFACES</dt><dd>{String(edges.length).padStart(2, '0')}</dd></div>
        </dl>
      </figcaption>

      <section className={styles.topology} aria-labelledby={`${diagramId}-topology`}>
        <header className={styles.sectionHeader}>
          <span>01</span>
          <div>
            <h3 id={`${diagramId}-topology`}>배포 영역과 책임 경계</h3>
            <p>같은 실행·운영 경계를 공유하는 구성 요소를 묶어 시스템의 물리적 책임을 표시합니다.</p>
          </div>
          <ul className={styles.legend} aria-label="담당 범위 범례">
            {(Object.entries(ownershipLabels) as [ArchitectureNode['ownership'], string][]).map(([key, label]) => (
              <li key={key} data-ownership={key}><span aria-hidden="true" />{label}</li>
            ))}
          </ul>
        </header>

        <div className={styles.zoneGrid}>
          {zones.map((zone, zoneIndex) => {
            const zoneNodes = zone.nodeIds
              .map((nodeId) => nodeById.get(nodeId))
              .filter((node): node is ArchitectureNode => Boolean(node));
            const destinations = Array.from(connectedZones.get(zone.id) ?? []);

            return (
              <article className={styles.zone} data-kind={zone.kind} key={zone.id}>
                <header>
                  <span>{String(zoneIndex + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{zone.label}</h4>
                    <p>{zone.caption}</p>
                  </div>
                </header>
                <ul className={styles.nodeList}>
                  {zoneNodes.map((node) => (
                    <li data-ownership={node.ownership} key={node.id}>
                      <span className={styles.nodeIcon}>
                        <TechnologyIcon name={node.icon} label={node.label} />
                      </span>
                      <span className={styles.nodeCopy}>
                        <strong>{node.label}</strong>
                        <small>{node.caption}</small>
                      </span>
                      <span className={styles.owner}>{ownershipLabels[node.ownership]}</span>
                    </li>
                  ))}
                </ul>
                <footer>
                  <span>CONNECTED TO</span>
                  <strong>{destinations.length > 0 ? destinations.join(' · ') : '독립 영역'}</strong>
                </footer>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.interfaces} aria-labelledby={`${diagramId}-interfaces`}>
        <header className={styles.sectionHeader}>
          <span>02</span>
          <div>
            <h3 id={`${diagramId}-interfaces`}>영역 간 인터페이스</h3>
            <p>요청, 데이터, 보안, 운영, 복구 경로의 방향과 실제 계약을 표시합니다.</p>
          </div>
        </header>

        <ol className={styles.interfaceList}>
          {edges.map((edge, index) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);
            if (!from || !to) return null;

            return (
              <li data-kind={edge.kind} key={`${edge.from}-${edge.to}-${edge.label}`}>
                <span className={styles.interfaceIndex}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.endpoint}>
                  <TechnologyIcon name={from.icon} label={from.label} />
                  <span><small>{zoneByNode.get(from.id)?.label}</small><strong>{from.label}</strong></span>
                </div>
                <div className={styles.contract}>
                  <small>{interfaceLabels[edge.kind]}</small>
                  <strong>{edge.label}</strong>
                  <span aria-hidden="true">→</span>
                </div>
                <div className={styles.endpoint}>
                  <TechnologyIcon name={to.icon} label={to.label} />
                  <span><small>{zoneByNode.get(to.id)?.label}</small><strong>{to.label}</strong></span>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </figure>
  );
}

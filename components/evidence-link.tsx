import type { ReactNode } from 'react';
import { FaArrowUpRightFromSquare, FaGithub, FaGlobe, FaStore } from 'react-icons/fa6';

import styles from './evidence-link.module.css';

type EvidenceLinkProps = {
  label: string;
  href: string;
  className?: string;
};

// 링크가 어디로 가는지 아이콘으로 먼저 알려줍니다.
function renderIcon(href: string): ReactNode {
  const className = styles.icon;

  if (href.includes('github.com/marketplace')) {
    return <FaStore aria-hidden="true" className={className} />;
  }
  if (href.includes('github.com')) {
    return <FaGithub aria-hidden="true" className={className} />;
  }
  return <FaGlobe aria-hidden="true" className={className} />;
}

export function EvidenceLink({ label, href, className }: EvidenceLinkProps) {
  return (
    <a
      className={`${styles.evidenceLink} ${className ?? ''}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {renderIcon(href)}
      <span>{label}</span>
      <FaArrowUpRightFromSquare aria-hidden="true" className={styles.arrow} />
    </a>
  );
}

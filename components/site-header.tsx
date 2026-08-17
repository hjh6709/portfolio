import Link from 'next/link';

import styles from './site-shell.module.css';

const navigation = [
  { href: '/#about', label: '소개' },
  { href: '/#projects', label: '프로젝트' },
  { href: '/#education', label: '교육' },
  { href: '/resume', label: '이력서' },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.wordmark} href="/" aria-label="한정현 포트폴리오 홈">
          HJH
          <span aria-hidden="true">/</span>
          PORTFOLIO
        </Link>

        <nav className={styles.navigation} aria-label="주요 메뉴">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}


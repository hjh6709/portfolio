import Link from 'next/link';

import { profile } from '@/data/profile';

import styles from './site-shell.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerLead}>
        <p className={styles.eyebrow}>CONTACT</p>
        <h2>함께 해결할 문제를 이야기해 주세요.</h2>
      </div>

      <div className={styles.footerLinks}>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <Link href="/resume">이력서 보기 <span aria-hidden="true">→</span></Link>
      </div>

      <p className={styles.copyright}>© {new Date().getFullYear()} HAN JEONGHYUN</p>
    </footer>
  );
}


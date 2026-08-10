import Link from 'next/link';

import { profile } from '@/data/profile';

import styles from './site-shell.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerLead}>
        <p className={styles.eyebrow}>CONTACT</p>
        <h2>안정적인 서비스를 함께 만들고 싶습니다.</h2>
      </div>

      <div className={styles.footerLinks}>
        <a href={`mailto:${profile.email}`}>
          {profile.email} <span aria-hidden="true">↗</span>
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <Link href="/resume">이력서 보기 <span aria-hidden="true">→</span></Link>
      </div>

      <p className={styles.copyright}>© {new Date().getFullYear()} HAN JEONGHYUN</p>
    </footer>
  );
}

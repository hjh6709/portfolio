import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '한정현 | Backend Developer',
    template: '%s | 한정현',
  },
  description:
    'API와 데이터 흐름을 설계하고 사용자 화면부터 클라우드 운영 환경까지 연결하는 백엔드 개발자 한정현의 포트폴리오입니다.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}


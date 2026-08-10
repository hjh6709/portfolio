import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getSiteUrl } from '@/lib/site-url';

import './globals.css';

const kerisBaeum = localFont({
  src: [
    { path: './fonts/KERISBAEUM_L.otf', weight: '300', style: 'normal' },
    { path: './fonts/KERISBAEUM_R.otf', weight: '400', style: 'normal' },
    { path: './fonts/KERISBAEUM_B.otf', weight: '700', style: 'normal' },
    { path: './fonts/KERISBAEUM_EB.otf', weight: '800', style: 'normal' },
  ],
  variable: '--font-keris-baeum',
  display: 'swap',
});

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: '한정현 | Backend Developer',
    template: '%s | 한정현',
  },
  description:
    'API와 데이터 흐름을 설계하고 사용자 화면부터 클라우드 운영 환경까지 연결하는 백엔드 개발자 한정현의 포트폴리오입니다.',
  applicationName: '한정현 포트폴리오',
  authors: [{ name: '한정현', url: 'https://github.com/hjh6709' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '한정현 | Backend Developer',
    description:
      '백엔드를 중심으로 사용자 화면과 클라우드 운영 환경까지 연결한 프로젝트를 소개합니다.',
    siteName: '한정현 포트폴리오',
  },
  twitter: {
    card: 'summary_large_image',
    title: '한정현 | Backend Developer',
    description:
      '백엔드를 중심으로 사용자 화면과 클라우드 운영 환경까지 연결한 프로젝트를 소개합니다.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={`${kerisBaeum.variable} ${pretendard.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

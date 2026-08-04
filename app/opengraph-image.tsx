import { ImageResponse } from 'next/og';

export const alt = '한정현 백엔드 개발자 포트폴리오';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '64px 72px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f4f2ed',
          color: '#141414',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, letterSpacing: 4 }}>
          HJH <span style={{ margin: '0 16px', color: '#1758d6' }}>/</span> PORTFOLIO
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: '0 0 20px', color: '#1758d6', fontSize: 23, letterSpacing: 3 }}>
            BACKEND DEVELOPER
          </p>
          <h1 style={{ maxWidth: 940, margin: 0, fontSize: 84, letterSpacing: -4, lineHeight: 1.08 }}>
            서비스를 끝까지 연결하는
            <br />
            백엔드 개발자 한정현
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 23, color: '#66645f' }}>Backend · Full-stack · Cloud</span>
          <span style={{ width: 150, height: 3, background: '#1758d6' }} />
        </div>
      </div>
    ),
    size,
  );
}

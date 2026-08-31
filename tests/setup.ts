import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// 테스트는 실제 App Router 트리 밖에서 컴포넌트를 렌더링하므로, useRouter를 쓰는
// 컴포넌트(예: ProjectCard의 카드 클릭 전환)가 "expected app router to be mounted"로
// 죽지 않도록 최소 동작만 흉내 낸 스텁으로 대체합니다.
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual<typeof import('next/navigation')>('next/navigation');
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});

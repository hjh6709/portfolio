import { expect, test } from '@playwright/test';

test('채용 담당자가 Cledyu의 문제와 아키텍처를 확인할 수 있다', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Cledyu 사례 자세히 보기' }).click();

  await expect(page.getByRole('heading', { level: 1, name: 'Cledyu' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '해결하려던 문제' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '핵심 구현' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '서비스 아키텍처' })).toBeVisible();

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('모바일에서 이력서와 프로젝트 페이지가 가로로 넘치지 않는다', async ({ page }) => {
  await page.goto('/resume');
  await expect(page.getByRole('heading', { level: 1, name: '이력서' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.goto('/projects/cledyu');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

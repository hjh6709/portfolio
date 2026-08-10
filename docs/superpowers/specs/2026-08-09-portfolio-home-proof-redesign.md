# Portfolio Home Proof Redesign

## Goal

채용 담당자가 첫 화면에서 지원 분야와 검증 가능한 근거를 파악하고, 대표 프로젝트 세 개를 우선 탐색한 뒤 보조 작업과 기술·경험·연락처까지 자연스럽게 확인하도록 홈을 재구성한다.

## Information architecture

1. Hero — `BACKEND · CLOUD`, `안정적인 서비스를 만드는 개발자`, 네 가지 근거, Email·GitHub·이력서
2. Featured Work — Cledyu, CodeBuddy, Kagoshima Travel
3. Other Work — PR Check Doctor, Chilseongpa
4. Proven Capabilities — 기술 이름을 실제 프로젝트의 구현 근거와 연결
5. Experience & Education — 평택도시공사, KT Cloud
6. Contact — 이메일을 가장 명확한 CTA로 제공

## Content principles

- 역할이나 기술을 주장하는 대신 실행 흐름과 결과를 보여준다.
- 대표 프로젝트는 문제, 역할, 시스템 흐름, 숫자 또는 운영 증거를 한 카드에서 확인할 수 있게 한다.
- 보조 프로젝트는 작은 카드로 분리하되 GitHub, Marketplace, 아키텍처 등 증거 링크를 유지한다.
- Cledyu에는 실제 Lab 세션 화면, CodeBuddy에는 아키텍처, Kagoshima Travel에는 실제 모바일 서비스 화면을 사용한다.
- 이력서 PDF가 없으므로 `/resume` 링크만 제공한다.

## Responsive and accessibility contract

- 58rem 이하에서는 대표 프로젝트 카드와 기술 근거를 단일 열로 전환한다.
- CTA는 키보드 포커스를 제공하고 프로젝트 이미지 링크에는 목적을 설명하는 접근 가능한 이름을 유지한다.
- 장식적 번호와 라벨이 본문보다 강해지지 않도록 대비와 크기를 제한한다.
- reduced motion 환경에서는 기존 Reveal 애니메이션을 중지한다.

## Success criteria

- 대표 프로젝트 섹션에는 정확히 세 프로젝트만 노출된다.
- Other Work에는 PR Check Doctor와 Chilseongpa가 노출된다.
- Hero에서 이메일, GitHub, 이력서에 바로 접근할 수 있다.
- 네 가지 근거가 첫 화면 안에서 읽힌다.
- 기술 섹션의 각 항목이 프로젝트 이름과 구체적 구현 내용을 포함한다.

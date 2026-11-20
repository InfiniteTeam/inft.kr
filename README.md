# inft.kr

Infinite Studio 공식 홈페이지. _무한한 미래를 만들어 갑니다_

## 개발

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # 프로덕션 빌드
yarn lint       # ESLint
yarn typecheck  # TypeScript
```

Node.js 20.9 이상이 필요합니다.

## 스택

- **Next.js 16** (App Router, Turbopack) · React 19 · TypeScript
- **three.js + React Three Fiber + drei**: 메인 화면의 홀로그램 유리 로고
- SCSS Modules, 디자인 토큰은 `src/app/globals.scss`
- 서체: Cafe24 PRO Slim (큰 제목과 숫자), Pretendard Variable (그 밖의 모든 글자)

## 구조

```
src/
  app/              라우트 (/, /about, /projects, /privacy)
  components/
    hero/           3D 히어로 (유리 로고 셰이더, 로고 애니메이션 시간표, 인터랙션)
    home/           메인 화면 섹션
    site/           내비게이션, 푸터
    ui/             공용 컴포넌트
  content/          개인정보 처리방침 (Markdown)
  data/             사이트 정보, 프로젝트, 멤버, 연혁
  fonts/            Cafe24 PRO Slim과 라이선스 전문
public/
  brand/            로고 SVG 개별 파일 (히어로의 WebGL 대체 이미지가 Logo_W.svg를 씁니다)
```

내용 수정은 대부분 `src/data/*.ts`만 고치면 됩니다.

- 프로젝트 추가: `src/data/projects.ts`
- 멤버 추가: `src/data/members.ts` (아바타는 `src/assets/`)
- 연혁 추가: `src/data/history.ts` (`highlight: true`면 메인 화면 연혁에도 노출)

디자인 원칙과 컬러/타이포 규칙은 [`docs/DESIGN.md`](docs/DESIGN.md)에 있습니다.

## 서체 라이선스

- Pretendard: SIL Open Font License 1.1
- Cafe24 PRO Slim: © 카페24(주), SIL Open Font License 1.1. 눈누가 배포하는 Max(700) woff2를 그대로 씁니다. 저작권 안내와 라이선스 전문은 [`src/fonts/Cafe24PROSlim-OFL.txt`](src/fonts/Cafe24PROSlim-OFL.txt)에 있습니다. 상업적 사용과 BI/CI 사용이 허용되고 화면에 출처를 적지 않아도 되지만, 폰트 파일 자체를 팔 수는 없습니다.

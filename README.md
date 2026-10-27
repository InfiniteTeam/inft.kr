# inft.kr

Infinite Studio 공식 홈페이지 — _무한한 미래를 만들어 갑니다_

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
- **three.js + React Three Fiber + drei** — 메인 화면의 유리 홀로그램 로고
- SCSS Modules, 디자인 토큰은 `src/app/globals.scss`
- 서체: Pretendard Variable (본문), KORAIL Condensed / 코레일 장체 (슬로건·큰 숫자)

## 구조

```
src/
  app/              라우트 (/, /about, /projects, /brand, /privacy)
  components/
    hero/           3D 히어로 (지오메트리, 셰이더 배경, 인터랙션)
    home/           메인 화면 섹션
    site/           내비게이션, 푸터
    ui/             공용 컴포넌트
  content/          개인정보 처리방침 (Markdown)
  data/             사이트 정보, 프로젝트, 멤버, 연혁
  fonts/            KORAIL Condensed
public/
  assets/logo.zip   로고 패키지 (SVG · PNG)
  brand/            로고 SVG 개별 파일
```

내용 수정은 대부분 `src/data/*.ts`만 고치면 됩니다.

- 프로젝트 추가: `src/data/projects.ts`
- 멤버 추가: `src/data/members.ts` (아바타는 `src/assets/`)
- 연혁 추가: `src/data/history.ts` (`highlight: true`면 메인 화면 타임라인에도 노출)

디자인 원칙과 컬러/타이포 규칙은 [`docs/DESIGN.md`](docs/DESIGN.md)에 있습니다.

## 서체 라이선스

- Pretendard — SIL Open Font License 1.1
- KORAIL Condensed (코레일 장체) — 한국철도공사 배포 무료 서체, [눈누](https://noonnu.cc/font_page/1071)의 웹폰트 파일을 그대로 사용합니다. 사용 범위는 배포처 라이선스를 따릅니다.

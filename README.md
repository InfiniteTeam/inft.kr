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
- 서체: Pretendard Variable (본문, 영문, 숫자), 빈폴체 (슬로건과 제목의 한글만)

## 구조

```
src/
  app/              라우트 (/, /about, /projects, /brand, /privacy)
  components/
    hero/           3D 히어로 (유리 로고 셰이더, 로고 애니메이션 시간표, 인터랙션)
    home/           메인 화면 섹션
    site/           내비게이션, 푸터
    ui/             공용 컴포넌트
  content/          개인정보 처리방침 (Markdown)
  data/             사이트 정보, 프로젝트, 멤버, 연혁
  fonts/            빈폴체
public/
  brand/            로고 SVG 개별 파일
```

내용 수정은 대부분 `src/data/*.ts`만 고치면 됩니다.

- 프로젝트 추가: `src/data/projects.ts`
- 멤버 추가: `src/data/members.ts` (아바타는 `src/assets/`)
- 연혁 추가: `src/data/history.ts` (`highlight: true`면 메인 화면 연혁에도 노출)

디자인 원칙과 컬러/타이포 규칙은 [`docs/DESIGN.md`](docs/DESIGN.md)에 있습니다.

## 서체 라이선스

- Pretendard: SIL Open Font License 1.1
- 빈폴체: © 삼성물산(주)패션부문. 눈누 배포 패키지(`@noonnu/beanpoleot-m00`)의 woff 파일을 고치지 않고 그대로 씁니다. 라이선스 전문은 [`src/fonts/Beanpole-LICENSE.md`](src/fonts/Beanpole-LICENSE.md)에 있고, 사이트 푸터에 출처를 적습니다. 폰트 파일을 수정하거나 변환하지 말고, 인쇄물, 굿즈, 공식 BI/CI에 쓰기 전에는 삼성물산(주)패션부문에 먼저 문의하세요.

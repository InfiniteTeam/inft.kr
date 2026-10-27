import type { Metadata } from 'next';
import Construction from '@/components/brand/Construction';
import { DownloadIcon } from '@/components/icons';
import Button from '@/components/ui/Button';
import CopyButton from '@/components/ui/CopyButton';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '브랜드',
  description:
    'Infinite Studio의 심볼, 컬러, 서체와 사용 규정을 안내하고 로고 파일을 제공합니다.',
};

const variants = [
  { file: 'Logo_NG', label: '네이비 위 민트' },
  { file: 'Logo_GN', label: '민트 위 네이비' },
  { file: 'Logo_WN', label: '흰 바탕 위 네이비' },
  { file: 'Logo_NW', label: '네이비 위 흰색' },
];

/* 브랜드 컬러 값 자체가 이 페이지의 내용이라, 칩의 색은 토큰이 아닌 데이터로 둡니다. */
const colors = [
  { name: 'Infinite Mint', hex: '#00CC99', rgb: '0, 204, 153', dark: true },
  {
    name: 'Infinite Turquoise',
    hex: '#33CCCC',
    rgb: '51, 204, 204',
    dark: true,
  },
  { name: 'Aztra Violet', hex: '#6D28D9', rgb: '109, 40, 217', dark: false },
  { name: 'Infinite Navy', hex: '#131828', rgb: '19, 24, 40', dark: false },
];

const rules = [
  '본 브랜드 상징은 Infinite Studio 및 그 제품을 나타내는 용도로만 자유롭게 사용하실 수 있습니다.',
  'Infinite Studio 브랜드 상징(로고를 비롯한 CI, BI)의 저작권은 모두 Infinite Studio에 있습니다.',
  '당사의 상표 또는 디자인을 모조, 모방 또는 날조하여 당사의 상표 또는 디자인과 혼동될 가능성이 있는 유사한 상표 또는 디자인을 사용하면 안 됩니다.',
  '특히, 당사의 식별력이나 명성을 손상하게 할 가능성이 있는 행위에 대해서는 상표를 사용하면 안 됩니다.',
];

export default function BrandPage() {
  return (
    <>
      <PageHeader
        title="브랜드 가이드"
        lead="심볼과 컬러, 서체, 사용 규정입니다. 로고 패키지에는 SVG와 PNG 파일 20종이 들어 있습니다."
      >
        <Button
          href="/assets/logo.zip"
          download
          icon={<DownloadIcon size={16} />}
        >
          로고 패키지 받기
        </Button>
      </PageHeader>

      <section className={styles.section} aria-labelledby="symbol">
        <div className="container">
          <SectionHeader id="symbol" title="i와 N을 한 획으로 이은 심볼" />
          <div className={styles.symbol}>
            <div className={styles.construction}>
              <Construction />
            </div>
            <dl className={styles.symbolFacts}>
              <div>
                <dt>격자</dt>
                <dd>128 단위, 4 × 4 격자 위에 그렸습니다.</dd>
              </div>
              <div>
                <dt>곡선</dt>
                <dd>
                  i의 점을 감싸는 곡선은 점과 중심이 같은 반지름 128의
                  원호입니다.
                </dd>
              </div>
              <div>
                <dt>사선</dt>
                <dd>두 기둥을 잇는 사선은 45°입니다.</dd>
              </div>
            </dl>
          </div>

          <ul className={styles.variants}>
            {variants.map((variant) => (
              <li key={variant.file}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.tile}
                  src={`/brand/${variant.file}.svg`}
                  alt={`${variant.label} 로고`}
                  width={512}
                  height={512}
                />
                <p className={styles.tileMeta}>
                  <span>{variant.label}</span>
                  <a href={`/brand/${variant.file}.svg`} download>
                    SVG 받기
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="color">
        <div className="container">
          <SectionHeader
            id="color"
            title="네 가지 브랜드 컬러"
            lead="칩을 누르면 HEX 값이 복사됩니다."
          />
          <ul className={styles.colors}>
            {colors.map((color) => (
              <li key={color.hex}>
                <CopyButton
                  value={color.hex}
                  label={`${color.name} ${color.hex} 복사`}
                  className={styles.swatch}
                >
                  <span
                    className={styles.chip}
                    style={{ background: color.hex }}
                    data-ink={color.dark ? 'dark' : 'light'}
                  >
                    {color.name}
                  </span>
                  <span className={styles.values}>
                    <span>{color.hex}</span>
                    <span>RGB {color.rgb}</span>
                  </span>
                </CopyButton>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="type">
        <div className="container">
          <SectionHeader id="type" title="본문은 Pretendard, 제목은 빈폴체" />
          <div className={styles.type}>
            <figure className={styles.specimen}>
              <p className={styles.sans}>무한한 미래를 만들어 갑니다</p>
              <figcaption>
                Pretendard. 본문과 인터페이스 전체에 씁니다.
              </figcaption>
            </figure>
            <figure className={styles.specimen}>
              <p className={styles.display}>무한한 미래를 만들어 갑니다</p>
              <figcaption>
                빈폴체. 슬로건과 큰 숫자처럼 짧고 큰 글자에만 씁니다.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="rules">
        <div className="container">
          <SectionHeader id="rules" title="쓰기 전에 지켜 주세요" />
          <ol className={styles.rules}>
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

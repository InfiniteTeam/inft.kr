import type { Metadata } from 'next';
import Construction from '@/components/brand/Construction';
import { DownloadIcon } from '@/components/icons';
import Button from '@/components/ui/Button';
import CopyButton from '@/components/ui/CopyButton';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '브랜드',
  description:
    'Infinite Studio의 심볼, 컬러, 타이포그래피와 사용 규정을 안내하고 로고 파일을 제공합니다.',
};

const variants = [
  { file: 'Logo_NG', label: 'Mint on Navy', bg: '#131828' },
  { file: 'Logo_GN', label: 'Navy on Mint', bg: '#00CC99' },
  { file: 'Logo_WN', label: 'Navy on White', bg: '#FFFFFF' },
  { file: 'Logo_NW', label: 'White on Navy', bg: '#131828' },
];

const colors = [
  { name: 'Infinite Mint', hex: '#00CC99', rgb: '0, 204, 153', ink: '#0B0D12' },
  {
    name: 'Infinite Turquoise',
    hex: '#33CCCC',
    rgb: '51, 204, 204',
    ink: '#0B0D12',
  },
  { name: 'Aztra Violet', hex: '#6D28D9', rgb: '109, 40, 217', ink: '#FFFFFF' },
  { name: 'Infinite Navy', hex: '#131828', rgb: '19, 24, 40', ink: '#FFFFFF' },
];

const spectrum = [
  '#8DF2D2',
  '#A3E6FF',
  '#B7C1FF',
  '#DCC6FF',
  '#FFD0E6',
  '#FFF1D6',
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
        eyebrow="브랜드"
        title={'Infinite Studio\n브랜드 가이드'}
        lead="심볼과 컬러, 타이포그래피, 그리고 사용 규정을 안내합니다. 로고 패키지에는 SVG와 PNG 파일 20종이 들어 있습니다."
      >
        <Button
          href="/assets/logo.zip"
          download
          icon={<DownloadIcon size={16} />}
        >
          로고 패키지 다운로드
        </Button>
      </PageHeader>

      <section className={styles.section} aria-labelledby="symbol">
        <div className="container">
          <SectionHeader id="symbol" eyebrow="심볼" title="i와 N, 한 획으로" />
          <Reveal className={styles.symbol}>
            <div className={styles.construction}>
              <Construction />
            </div>
            <div className={styles.symbolText}>
              <p>
                소문자 <strong>i</strong>의 점과 기둥, 그리고 대문자{' '}
                <strong>N</strong>이 하나로 이어진 심볼입니다.
              </p>
              <ul>
                <li>
                  <span>격자</span>128 단위 4 × 4 격자 위에 그려졌습니다.
                </li>
                <li>
                  <span>곡선</span>i의 점을 감싸는 곡선은 점과 같은 중심을 가진
                  반지름 128의 원호입니다.
                </li>
                <li>
                  <span>사선</span>두 기둥을 잇는 사선은 45°로 기울어져
                  있습니다.
                </li>
              </ul>
            </div>
          </Reveal>

          <ul className={styles.variants}>
            {variants.map((variant, i) => (
              <Reveal as="li" key={variant.file} delay={i * 70}>
                <div className={styles.tile} style={{ background: variant.bg }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/brand/${variant.file}.svg`} alt={variant.label} />
                </div>
                <div className={styles.tileMeta}>
                  <span>{variant.label}</span>
                  <a href={`/brand/${variant.file}.svg`} download>
                    SVG
                    <DownloadIcon size={13} />
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="color">
        <div className="container">
          <SectionHeader
            id="color"
            eyebrow="컬러"
            title="브랜드 컬러"
            description="컬러 칩을 누르면 HEX 값이 복사됩니다."
          />
          <ul className={styles.colors}>
            {colors.map((color, i) => (
              <Reveal as="li" key={color.hex} delay={i * 70}>
                <CopyButton
                  value={color.hex}
                  label={`${color.name} ${color.hex} 복사`}
                  className={styles.swatch}
                >
                  <span
                    className={styles.chip}
                    style={{ background: color.hex, color: color.ink }}
                  >
                    <span className={styles.chipName}>{color.name}</span>
                  </span>
                  <span className={styles.values}>
                    <span>{color.hex}</span>
                    <span>RGB {color.rgb}</span>
                  </span>
                </CopyButton>
              </Reveal>
            ))}
          </ul>

          <Reveal className={styles.spectrum}>
            <div
              className={styles.spectrumBar}
              style={{
                background: `linear-gradient(90deg, ${spectrum.join(', ')})`,
              }}
            />
            <div className={styles.spectrumMeta}>
              <p>
                <strong>Pearl Spectrum</strong> — 웹사이트의 홀로그램 표현에만
                쓰는 보조 팔레트
              </p>
              <ul>
                {spectrum.map((hex) => (
                  <li key={hex}>
                    <span style={{ background: hex }} />
                    {hex}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="type">
        <div className="container">
          <SectionHeader id="type" eyebrow="타이포그래피" title="서체" />
          <div className={styles.type}>
            <Reveal className={styles.specimen}>
              <p className={styles.specimenMeta}>
                <span>본문 · UI</span>
                <span>Pretendard</span>
              </p>
              <p className={styles.specimenSans}>무한한 미래를 만들어 갑니다</p>
              <p className={styles.specimenGlyphs}>
                가나다라마바사 ABCDEFG abcdefg 0123456789
              </p>
            </Reveal>
            <Reveal className={styles.specimen} delay={80}>
              <p className={styles.specimenMeta}>
                <span>디스플레이</span>
                <span>KORAIL Condensed (코레일 장체)</span>
              </p>
              <p className={styles.specimenCondensed}>
                무한한 미래를 만들어 갑니다
              </p>
              <p className={styles.specimenGlyphs}>
                슬로건, 큰 숫자처럼 짧고 강한 문장에만 사용합니다.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="rules">
        <div className="container">
          <SectionHeader id="rules" eyebrow="사용 규정" title="주의사항" />
          <ol className={styles.rules}>
            {rules.map((rule, i) => (
              <Reveal as="li" key={i} delay={i * 60}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <p>{rule}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

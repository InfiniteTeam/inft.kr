import { site } from '@/data/site';
import { ArrowUpRight } from '@/components/icons';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Spotlight from '@/components/ui/Spotlight';
import styles from './Join.module.scss';

export default function Join() {
  return (
    <section className={styles.section} aria-labelledby="join-title">
      <div className="container">
        <Reveal>
          <Spotlight className={styles.panel}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.foil} aria-hidden="true" />

            <div className={styles.copy}>
              <p className={styles.eyebrow}>함께하기</p>
              <h2 id="join-title" className={styles.title}>
                다음 미래를
                <br />
                함께 만들어요
              </h2>
              <p className={styles.description}>
                팀원 모집 소식은 채용 페이지에서, 서비스 문의와 새 소식은
                디스코드 서버에서 가장 먼저 만날 수 있어요.
              </p>
              <div className={styles.actions}>
                <Button href={site.links.careers} variant="light" size="lg">
                  채용 페이지
                </Button>
                <Button href={site.links.discord} variant="ghost" size="lg">
                  디스코드 서버 참여
                </Button>
              </div>
            </div>

            <ul className={styles.links}>
              <li>
                <a href={site.links.status} target="_blank" rel="noreferrer">
                  서비스 상태
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={site.links.github} target="_blank" rel="noreferrer">
                  GitHub
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}

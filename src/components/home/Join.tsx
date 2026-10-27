import { site } from '@/data/site';
import Button from '@/components/ui/Button';
import styles from './Join.module.scss';

/** 바탕색이 한 단계 밝아지는 띠. 페이지가 하려는 일(합류)로 끝납니다. */
export default function Join() {
  return (
    <section className={styles.band} aria-labelledby="join-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="join-title">같이 만들어요</h2>
          <p className={styles.lead}>
            채용 소식은 채용 페이지에, 서비스 문의와 새 소식은 디스코드 서버에
            올라옵니다.
          </p>
        </div>
        <div className={styles.actions}>
          <Button href={site.links.careers} variant="secondary">
            채용 페이지
          </Button>
          <Button href={site.links.discord} variant="secondary">
            디스코드 서버 참여
          </Button>
        </div>
      </div>
    </section>
  );
}

import Button from '@/components/ui/Button';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <section className={styles.page}>
      <div className={styles.halo} aria-hidden="true" />
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>찾으시는 페이지가 없어요</h1>
        <p className={styles.lead}>
          주소가 바뀌었거나 사라진 페이지일 수 있어요.
        </p>
        <div className={styles.actions}>
          <Button href="/">홈으로</Button>
          <Button href="/projects" variant="secondary">
            프로젝트 보기
          </Button>
        </div>
      </div>
    </section>
  );
}

import Button from '@/components/ui/Button';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <section className={styles.page}>
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>이 주소에는 페이지가 없습니다</h1>
        <p className={styles.lead}>
          주소가 바뀌었거나 사라진 페이지일 수 있습니다.
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

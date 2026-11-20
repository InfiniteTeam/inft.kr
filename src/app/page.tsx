import Hero from '@/components/hero/Hero';
import Projects from '@/components/home/Projects';
import Record from '@/components/home/Record';
import History from '@/components/home/History';
import Team from '@/components/home/Team';
import Join from '@/components/home/Join';

// 연혁 제목의 "N년째"가 다시 배포하지 않아도 해마다 맞도록 하루에 한 번 새로 그립니다.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Record />
      <History />
      <Team />
      <Join />
    </>
  );
}

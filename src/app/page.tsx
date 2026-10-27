import Hero from '@/components/hero/Hero';
import Projects from '@/components/home/Projects';
import Record from '@/components/home/Record';
import History from '@/components/home/History';
import Team from '@/components/home/Team';
import Join from '@/components/home/Join';

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

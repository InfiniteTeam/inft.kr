import Hero from '@/components/hero/Hero';
import Intro from '@/components/home/Intro';
import Projects from '@/components/home/Projects';
import Journey from '@/components/home/Journey';
import Team from '@/components/home/Team';
import Join from '@/components/home/Join';

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Projects />
      <Journey />
      <Team />
      <Join />
    </>
  );
}

import type { NextPage } from 'next';
import Layout from 'components/Layout';
import styles from 'styles/pages/Projects.module.scss';
import aztra from 'assets/aztra.png';
import Image from 'next/image';

const Projects: NextPage = () => {
  return (
    <Layout page="프로젝트">
      <div className={styles.section}>
        <span className={styles.title}>
          <span>프로젝트 리스트</span>
          <small>PROJECTS</small>
        </span>
      </div>

      <div className="md:flex text-center md:text-left rounded-xl hover:bg-black/[0.15] shadow-xl hover:shadow-2xl transition-all duration-500 mt-8 px-6 py-5 gap-5 items-center border-solid border-[1px] border-gray-800">
        <Image
          className="rounded-full"
          src={aztra}
          alt="aztra"
          width={100}
          height={100}
        />
        <div className="md:pr-8 md:mr-4 md:border-r-[0.5px] my-8 md:my-0 border-solid border-zinc-700">
          <h2 className="text-4xl font-semibold tracking-wide mb-3">Aztra</h2>
          <div className="text-gray-500 font-light">
            웹 대시보드를 지원하는 한국어 디스코드 관리봇
          </div>
        </div>
        <div className="text-gray-200">
          <div className="mb-2">2021.01.21 ~ 진행 중</div>
          <div className="font-light text-sm">미래를 바꿀 디스코드 관리봇.</div>
        </div>
        <hr className="md:hidden w-full border-b-[0.5px] border-solid border-zinc-700 my-6" />
        <div className="md:ml-auto">
          <a href="https://aztra.xyz" target="_blank" rel="noreferrer">
            <button
              type="button"
              className="bg-violet-600 hover:bg-violet-500 transition-all duration-300 px-5 py-3 rounded-xl"
            >
              사이트로 이동
            </button>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center py-10 mt-16">
        <div className="flex items-center gap-3">
          <hr className="w-8 border-b-[0.1px] border-white border-solid" />
          <div className="">COMMING SOON</div>
          <hr className="w-8 border-b-[0.1px] border-white border-solid" />
        </div>
        <div className="text-sm font-light text-zinc-400">
          앞으로도 다양한 프로젝트가 진행됩니다!
        </div>
      </div>
    </Layout>
  );
};

export default Projects;

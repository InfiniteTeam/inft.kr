import type { NextPage } from 'next';
import Layout from 'components/Layout';
import styles from 'styles/pages/Projects.module.scss';
import aztra from 'assets/aztra.png';
import azalea from 'assets/azalea.jpeg';
import bot4096 from 'assets/4096.png';
import Image from 'next/image';
import members from 'data/members';
import { Popover, Transition } from '@headlessui/react';
import { useState } from 'react';

const Projects: NextPage = () => {
  const [isShowing, setIsShowing] = useState<[string, string] | null>(null);

  return (
    <Layout page="프로젝트">
      <div className={styles.section}>
        <span className={styles.title}>
          <span>프로젝트 리스트</span>
          <small>PROJECTS</small>
        </span>
      </div>

      <div className="lg:flex text-center lg:text-left rounded-xl hover:bg-black/[0.15] shadow-xl hover:shadow-2xl transition-all duration-500 mt-10 px-6 py-5 gap-5 items-center border-solid border-[1px] border-gray-800">
        <div className="flex-shrink-0">
          <Image
            className="rounded-full"
            src={aztra}
            alt="aztra"
            width={100}
            height={100}
          />
        </div>
        <div className="flex-shrink-0 text-center lg:text-left w-full lg:w-1/3 lg:pr-8 lg:mr-4 lg:border-r-[0.5px] my-5 lg:my-0 border-solid border-zinc-700 py-2.5">
          <h2 className="text-4xl font-semibold tracking-wide mb-3">Aztra</h2>
          <div className="text-gray-500 font-light">
            웹 대시보드를 지원하는 한국어 디스코드 관리봇
          </div>
        </div>
        <div className="text-gray-200 flex-shrink-0">
          <div className="mb-2">2021.01.21 ~ 진행 중</div>
          <div className="text-sm font-light mt-3.5 mb-4 lg:mb-2.5">
            참여 멤버:{' '}
          </div>
          <div className="flex gap-1.5 items-center justify-center lg:justify-start">
            {members.map((one) => (
              <Popover
                key={one.name}
                className="relative"
                onMouseEnter={() => setIsShowing(['aztra', one.name])}
                onMouseLeave={() => setIsShowing(null)}
              >
                <Popover.Button className="outline-none">
                  <Image
                    className="rounded-full"
                    alt={one.name}
                    src={one.avatar}
                    width={32}
                    height={32}
                  />
                </Popover.Button>

                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                  show={
                    !!isShowing &&
                    isShowing[0] == 'aztra' &&
                    isShowing[1] === one.name
                  }
                  onMouseEnter={() => setIsShowing(['aztra', one.name])}
                  onMouseLeave={() => setIsShowing(null)}
                >
                  {isShowing ? (
                    <Popover.Panel className="absolute top-2 z-10 bg-gray-800/75 rounded-xl px-3 py-2 text-sm w-fit whitespace-nowrap">
                      {one.name}
                    </Popover.Panel>
                  ) : null}
                </Transition>
              </Popover>
            ))}
          </div>
        </div>
        <hr className="lg:hidden w-full border-b-[0.5px] border-solid border-zinc-700 my-6" />
        <div className="lg:ml-auto">
          <a href="https://aztra.xyz" target="_blank" rel="noreferrer">
            <button
              type="button"
              className="bg-violet-600 hover:bg-violet-500 transition-all duration-300 w-32 px-5 py-3 rounded-xl"
            >
              사이트로 이동
            </button>
          </a>
        </div>
      </div>

      <div className="lg:flex text-center lg:text-left rounded-xl hover:bg-black/[0.15] shadow-xl hover:shadow-2xl transition-all duration-500 mt-5 px-6 py-5 gap-5 items-center border-solid border-[1px] border-gray-800">
        <div className="flex-shrink-0">
          <Image
            className="rounded-full"
            src={bot4096}
            alt="2¹²"
            width={100}
            height={100}
          />
        </div>
        <div className="flex-shrink-0 text-center lg:text-left w-full lg:w-1/3 lg:pr-8 lg:mr-4 lg:border-r-[0.5px] my-5 lg:my-0 border-solid border-zinc-700 py-2.5">
          <h2 className="text-4xl font-semibold tracking-wide mb-3">2¹²</h2>
          <div className="text-gray-500 font-light">
            디스코드 2048 미니게임 봇
          </div>
        </div>
        <div className="text-gray-200 flex-shrink-0">
          <div className="mb-2">2022.08.05 ~ 진행 중</div>
          <div className="text-sm font-light mt-3.5 mb-4 lg:mb-2.5">
            참여 멤버:{' '}
          </div>
          <div className="flex gap-1.5 items-center justify-center lg:justify-start">
            {members
              .filter((one) => ['ArpaAP', 'COiN', 'Dacoon'].includes(one.name))
              .map((one) => (
                <Popover
                  key={one.name}
                  className="relative"
                  onMouseEnter={() => setIsShowing(['4096', one.name])}
                  onMouseLeave={() => setIsShowing(null)}
                >
                  <Popover.Button className="outline-none">
                    <Image
                      className="rounded-full"
                      alt={one.name}
                      src={one.avatar}
                      width={32}
                      height={32}
                    />
                  </Popover.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    show={
                      !!isShowing &&
                      isShowing[0] == '4096' &&
                      isShowing[1] === one.name
                    }
                    onMouseEnter={() => setIsShowing(['4096', one.name])}
                    onMouseLeave={() => setIsShowing(null)}
                  >
                    {isShowing ? (
                      <Popover.Panel className="absolute top-2 z-10 bg-gray-800/75 rounded-xl px-3 py-2 text-sm w-fit whitespace-nowrap">
                        {one.name}
                      </Popover.Panel>
                    ) : null}
                  </Transition>
                </Popover>
              ))}
          </div>
        </div>
        <hr className="lg:hidden w-full border-b-[0.5px] border-solid border-zinc-700 my-6" />
        <div className="lg:ml-auto">
          <a href="https://4096.inft.kr" target="_blank" rel="noreferrer">
            <button
              type="button"
              className="bg-rose-500 hover:bg-rose-400 transition-all duration-300 w-32 px-5 py-3 rounded-xl"
            >
              사이트로 이동
            </button>
          </a>
        </div>
      </div>

      <div className="lg:flex text-center lg:text-left rounded-xl hover:bg-black/[0.15] shadow-xl hover:shadow-2xl transition-all duration-500 mt-5 px-6 py-5 gap-5 items-center border-solid border-[1px] border-gray-800">
        <div className="flex-shrink-0">
          <Image
            className="rounded-full"
            src={azalea}
            alt="azalea"
            width={100}
            height={100}
          />
        </div>
        <div className="flex-shrink-0 text-center lg:text-left w-full lg:w-1/3 lg:pr-8 lg:mr-4 lg:border-r-[0.5px] my-5 lg:my-0 border-solid border-zinc-700 py-2.5">
          <h2 className="text-4xl font-semibold tracking-wide mb-3">Azalea</h2>
          <div className="text-gray-500 font-light">디스코드 RPG 게임봇</div>
        </div>
        <div className="text-gray-200 flex-shrink-0">
          <div className="mb-2">2020.05.04 ~ 개발 일시중단</div>
          <div className="text-sm font-light mt-3.5 mb-4 lg:mb-2.5">
            참여 멤버:{' '}
          </div>
          <div className="flex gap-1.5 items-center justify-center lg:justify-start">
            {members
              .filter((one) => ['ArpaAP', 'COiN', 'Dacoon'].includes(one.name))
              .map((one) => (
                <Popover
                  key={one.name}
                  className="relative"
                  onMouseEnter={() => setIsShowing(['azalea', one.name])}
                  onMouseLeave={() => setIsShowing(null)}
                >
                  <Popover.Button className="outline-none">
                    <Image
                      className="rounded-full"
                      alt={one.name}
                      src={one.avatar}
                      width={32}
                      height={32}
                    />
                  </Popover.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    show={
                      !!isShowing &&
                      isShowing[0] === 'azalea' &&
                      isShowing[1] === one.name
                    }
                    onMouseEnter={() => setIsShowing(['azalea', one.name])}
                    onMouseLeave={() => setIsShowing(null)}
                  >
                    {isShowing ? (
                      <Popover.Panel className="absolute top-2 z-10 bg-gray-800/75 rounded-xl px-3 py-2 text-sm w-fit whitespace-nowrap">
                        {one.name}
                      </Popover.Panel>
                    ) : null}
                  </Transition>
                </Popover>
              ))}
          </div>
        </div>
        <hr className="lg:hidden w-full border-b-[0.5px] border-solid border-zinc-700 my-6" />
        <div className="lg:ml-auto">
          <button
            type="button"
            className="bg-gray-600 w-32 px-5 py-3 rounded-xl text-gray-400"
            disabled
          >
            개발 중단
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center py-10 mt-12">
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

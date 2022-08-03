import type { NextPage } from 'next';
import Layout from 'components/Layout';
import styles from 'styles/pages/About.module.scss';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';
import { SiDiscord, SiGithub } from 'react-icons/si';
import { TbMail } from 'react-icons/tb';
import members from 'data/members';
import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import history from 'data/history';

const About: NextPage = () => {
  let years = history.map((o) => o.year);

  return (
    <Layout page="소개" className={styles.page}>
      <div className={styles.info}>
        <div className={styles.mission}>
          <RiDoubleQuotesL />
          무한한 미래를 만들어갑니다
          <RiDoubleQuotesR />
        </div>
        <span className={styles.since}>SINCE 2018.08</span>
      </div>

      <div className={styles.section}>
        <span className={styles.title}>
          <span>팀원</span>
          <small>MEMBERS</small>
        </span>
      </div>
      <div className={styles.members}>
        {members.map((member) => (
          <div key={member.name} className={styles.member}>
            <span className={styles.name}>
              {member.name}
              <small>{member.kr}</small>
            </span>
            <div
              className={styles.bar}
              style={{
                background: `linear-gradient(to right, ${member.color[0]}, ${member.color[1]})`,
              }}
            ></div>

            <div className={styles.description}>
              <div className="flex-shrink-0">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={100}
                  height={100}
                  layout="fixed"
                />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <span className={styles.role}>{member.role.join(' & ')}</span>
                {member.motto && (
                  <span className={styles.motto}>
                    <RiDoubleQuotesL />
                    {member.motto}
                    <RiDoubleQuotesR />
                  </span>
                )}

                <div className={styles.contact}>
                  {member.discord && (
                    <Popover className="relative">
                      <Popover.Button className="outline-none">
                        <SiDiscord
                          title={member.discord}
                          className={styles.icon}
                        />
                      </Popover.Button>

                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Popover.Panel className="absolute top-2 z-10 bg-gray-800/75 rounded-xl px-3 py-2 text-sm w-fit whitespace-nowrap">
                          {member.discord}
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  )}
                  {member.github && (
                    <a href={`https://github.com/${member.github}`}>
                      <SiGithub className={styles.icon} />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`}>
                      <TbMail className={styles.icon} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <span className={styles.title}>
          <span>연혁</span>
          <small>HISTORY</small>
        </span>
      </div>
      <div className="flex justify-center py-5 mt-12">
        <table>
          <thead>
            <tr>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {history.map((item, i) => (
              <tr key={i}>
                <td className="pr-12 border-r-[1px] border-solid border-zinc-700">
                  <div className="text-2xl pb-3">
                    {years.indexOf(item.year) === i ? item.year : ''}
                  </div>
                </td>
                <td className="pl-12">
                  <div className="pb-1 text-gray-400 font-light">
                    {item.month}월
                  </div>
                  <h2 className="text-2xl mb-8">{item.content}</h2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default About;

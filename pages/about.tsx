import type { NextPage } from "next";
import Layout from "../components/Layout";
import styles from "../styles/pages/About.module.scss";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { SiDiscord, SiGithub } from "react-icons/si";
import { TbMail } from "react-icons/tb";
import members from "../data/members";

const About: NextPage = () => {
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
                    팀원
                    <small>MEMBERS</small>
                </span>
            </div>
            <div className={styles.members}>
                {Object.entries(members).map(([name, member]) => (
                    <div className={styles.member}>
                        <span className={styles.name}>
                            {name}
                            <small>{member.kr}</small>
                        </span>
                        <div
                            className={styles.bar}
                            style={{
                                background: `linear-gradient(to right, ${member.color[0]}, ${member.color[1]})`,
                            }}
                        ></div>

                        <div className={styles.description}>
                            <span className={styles.role}>{member.role.join(" & ")}</span>
                            {member.motto && (
                                <span className={styles.motto}>
                                    <RiDoubleQuotesL />
                                    {member.motto}
                                    <RiDoubleQuotesR />
                                </span>
                            )}

                            <div className={styles.contact}>
                                {member.discord && (
                                    <a>
                                        <SiDiscord title={member.discord} className={styles.icon} />
                                    </a>
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
                ))}
            </div>
        </Layout>
    );
};

export default About;

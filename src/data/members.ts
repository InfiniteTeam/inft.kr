import type { StaticImageData } from 'next/image';
import arpaap from '@/assets/arpa.png';
import coin from '@/assets/coin.png';
import dacon from '@/assets/dacon.png';
import gangjun from '@/assets/gangjun06.png';
import filename from '@/assets/filename.png';
import hankaru from '@/assets/hankaru.png';
import ray from '@/assets/ray.png';

export interface Member {
  name: string;
  kr: string;
  role: string[];
  color: [string, string];
  discord: string | null;
  github: string | null;
  email: string | null;
  motto: string | null;
  solvedac: string | null;
  avatar: StaticImageData | null;
}

const members: Member[] = [
  {
    name: 'ArpaAP',
    kr: '알파',
    role: ['대표', '주 개발자'],
    color: ['rgb(95, 165, 253)', 'rgb(163, 23, 252)'],
    discord: '@applekorea',
    github: 'ArpaAP',
    email: 'arpaap@inft.kr',
    motto: '안녕하세요 알 팝니다',
    solvedac: 'arpaap',
    avatar: arpaap,
  },
  {
    name: 'COiN',
    kr: '코인',
    role: ['개발자', '디자이너'],
    color: ['#9ccfe8', '#fbb826'],
    discord: '@tltb',
    github: 'kndlr',
    email: 'coin@inft.kr',
    motto: '비트코인 안합니다',
    solvedac: 'coinkr',
    avatar: coin,
  },
  {
    name: 'Dacoon',
    kr: '다쿤',
    role: ['알고리즘 개발자'],
    color: ['rgb(169, 134, 211)', 'rgb(148, 245, 158)'],
    discord: '@daco_on',
    github: 'dacoonkr',
    email: 'dacoon@inft.kr',
    motto: '음',
    solvedac: 'wjdgud0621',
    avatar: dacon,
  },
  {
    name: 'gangjun06',
    kr: '펭귄',
    role: ['Aztra 웹 풀스택 엔지니어'],
    color: ['#22c6fa', '#1c9dca'],
    discord: '@react.dev',
    github: 'gangjun06',
    email: 'gangjun@inft.kr',
    motto: null,
    solvedac: null,
    avatar: gangjun,
  },
  {
    name: '__filename',
    kr: '수박',
    role: ['봇 개발자', 'Idle Factory 주 개발자'],
    color: ['#93c5fd', '#fdfdfd'],
    discord: '@__filename',
    github: 'filename24',
    email: 'filename@inft.kr',
    motto: '⬆ 이코인 사세요',
    solvedac: 'filename',
    avatar: filename,
  },
  {
    name: 'DowonLee',
    kr: '도원',
    role: ['커뮤니티 매니저'],
    color: ['#ffffff', '#aaaaaa'],
    discord: '@dobawonbo',
    github: null,
    email: 'iamleedowon@gmail.com',
    motto: '도바원보',
    solvedac: null,
    // 기존 dowon.png는 단색 이미지라 모노그램으로 대신 표시합니다.
    avatar: null,
  },
  {
    name: 'Hankaru',
    kr: '한카루',
    role: ['커뮤니티 매니저'],
    color: ['rgb(240, 233, 235)', 'rgb(119, 148, 213)'],
    discord: '@_ksh.',
    github: null,
    email: 'hankaru@inft.kr',
    motto: '캬루 아닙니다',
    solvedac: null,
    avatar: hankaru,
  },
  {
    name: 'Ray',
    kr: '레이',
    role: ['개발자', '물리서버 관리자'],
    color: ['#ffffff', '#aaaaaa'],
    discord: '@raymix__',
    github: 'erukim',
    email: 'erukim@hiplay.kr',
    motto: null,
    solvedac: null,
    avatar: ray,
  },
];

export function findMembers(names: string[]) {
  return names
    .map((name) => members.find((member) => member.name === name))
    .filter((member): member is Member => Boolean(member));
}

export default members;

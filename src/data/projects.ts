import type { StaticImageData } from 'next/image';
import aztra from '@/assets/aztra.png';
import azalea from '@/assets/azalea.jpeg';
import bot4096 from '@/assets/4096.png';
import idlefactory from '@/assets/idlefactory.png';

export type ProjectStatus = 'active' | 'paused';

export interface Project {
  slug: string;
  name: string;
  nameKr?: string;
  category: string;
  summary: string;
  description: string;
  since: string;
  status: ProjectStatus;
  url: string | null;
  icon: StaticImageData;
  /** 카드 광택에 쓰는 프로젝트 고유 색 */
  tint: string;
  members: string[];
  /** 카드에 크게 보여 줄 대표 수치 */
  highlight?: { value: string; label: string };
}

const projects: Project[] = [
  {
    slug: 'aztra',
    name: 'Aztra',
    nameKr: '아즈트라',
    category: '관리 봇',
    summary: '웹 대시보드를 지원하는 한국어 디스코드 관리봇',
    description:
      '서버 관리에 필요한 기능을 한국어로, 그리고 웹 대시보드에서 손쉽게. 2021년 정식 출시 후 2022년 여름 4,000개 서버를 넘어섰습니다.',
    since: '2021.01.21',
    status: 'active',
    url: 'https://aztra.xyz',
    icon: aztra,
    tint: '#6D28D9',
    members: [
      'ArpaAP',
      'COiN',
      'Dacoon',
      'gangjun06',
      '__filename',
      'DowonLee',
      'Hankaru',
      'Ray',
    ],
    highlight: { value: '4,000+', label: '도입 서버 · 2022년 7월' },
  },
  {
    slug: 'idle-factory',
    name: 'Idle Factory',
    nameKr: '아이들 팩토리',
    category: '방치형 게임',
    summary: '디스코드 방치형 게임봇',
    description:
      '자리를 비운 사이에도 공장은 돌아갑니다. 디스코드 안에서 즐기는 방치형 게임, Infinite Studio의 가장 새로운 프로젝트입니다.',
    since: '2026.07.04',
    status: 'active',
    url: 'https://idle.inft.kr',
    icon: idlefactory,
    tint: '#F59E0B',
    members: ['__filename', 'ArpaAP', 'COiN'],
  },
  {
    slug: '2-12',
    name: '2¹²',
    category: '미니게임',
    summary: '디스코드 2048 미니게임 봇',
    description:
      '익숙한 2048 퍼즐을 디스코드 채팅창 안으로. 2의 12제곱, 4096을 향해 타일을 밀어 보세요.',
    since: '2022.08.05',
    status: 'active',
    url: 'https://4096.inft.kr',
    icon: bot4096,
    tint: '#F43F5E',
    members: ['ArpaAP', 'COiN', 'Dacoon'],
  },
  {
    slug: 'azalea',
    name: 'Azalea',
    nameKr: '아젤리아',
    category: 'RPG',
    summary: '디스코드 RPG 게임봇',
    description:
      '디스코드에서 즐기는 RPG를 목표로 시작한 프로젝트입니다. 현재는 개발이 일시 중단된 상태입니다.',
    since: '2020.05.04',
    status: 'paused',
    url: null,
    icon: azalea,
    tint: '#64748B',
    members: ['ArpaAP', 'COiN', 'Dacoon'],
  },
];

export default projects;

/** 연혁에 기록된 그동안의 프로젝트 */
export const archive = [
  {
    year: 2022,
    name: 'Aztra Music',
    description: 'Aztra에 음악 재생을 더한 프로젝트',
    note: '2022.07 개발 시작',
  },
  {
    year: 2020,
    name: 'RTBOT',
    nameKr: '알티봇',
    description: '디스코드 미니게임 봇',
    note: '2020.08 운영',
  },
  {
    year: 2020,
    name: '연어봇',
    description: '디스코드 검색 봇',
    note: '2020.02 개발',
  },
  {
    year: 2019,
    name: 'On-Off',
    description: '엔트리 퍼즐 게임',
    note: '2019.06 출시 · 스태프 및 인기 작품 선정',
  },
];

export const site = {
  name: 'Infinite Studio',
  nameKr: '인피니트 스튜디오',
  url: 'https://inft.kr',
  slogan: '무한한 미래를 만들어 갑니다',
  description:
    '2018년부터 디스코드 봇과 게임을 만들어 온 개발팀, Infinite Studio입니다.',
  founded: { year: 2018, month: 8 },
  links: {
    discord: 'https://discord.gg/7aFczQk',
    github: 'https://github.com/InfiniteTeam',
    status: 'https://status.inft.kr',
    careers: 'https://employment.inft.kr',
  },
  gaTrackingId: 'G-M2LQ8FE356',
} as const;

export const navigation = [
  { href: '/about', label: '소개' },
  { href: '/projects', label: '프로젝트' },
  { href: '/brand', label: '브랜드' },
  { href: site.links.status, label: '서비스 상태', external: true },
  { href: site.links.careers, label: '채용', external: true },
] as const;

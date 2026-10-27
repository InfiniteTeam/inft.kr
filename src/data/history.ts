export interface HistoryItem {
  year: number;
  month: number;
  content: string;
  /** 홈 화면 요약 타임라인에 노출할 항목 */
  highlight?: boolean;
}

const history: HistoryItem[] = [
  {
    year: 2018,
    month: 8,
    content: '청소년 엔트리 개발 팀 InfiniteTeam 설립',
    highlight: true,
  },
  { year: 2019, month: 1, content: "엔트리 퍼즐 게임 'On-Off' 개발" },
  { year: 2019, month: 1, content: '제2기 멤버 채용 (COiN, DACOON 합류)' },
  {
    year: 2019,
    month: 6,
    content: "'On-Off' 정식 출시, 스태프 및 인기 작품 선정",
    highlight: true,
  },
  {
    year: 2020,
    month: 2,
    content: '디스코드 봇 개발 팀으로 출범',
    highlight: true,
  },
  { year: 2020, month: 2, content: '디스코드 검색 봇 연어봇 개발' },
  {
    year: 2020,
    month: 5,
    content: '디스코드 RPG 게임 봇 Azalea (아젤리아) 개발 시작',
  },
  { year: 2020, month: 8, content: '첫 Infinite Studio 홈페이지 공개' },
  {
    year: 2020,
    month: 8,
    content: '디스코드 미니게임 봇 RTBOT (알티봇) 위탁 운영',
  },
  {
    year: 2020,
    month: 9,
    content: '디스코드 관리 봇 Aztra (아즈트라) 개발 시작',
  },
  { year: 2021, month: 1, content: 'Aztra 정식 출시', highlight: true },
  { year: 2021, month: 7, content: 'Aztra 1,000서버 달성' },
  { year: 2022, month: 1, content: 'Aztra 출시 1주년, 2,000서버 달성' },
  { year: 2022, month: 3, content: 'Aztra 3,000서버 달성' },
  { year: 2022, month: 7, content: 'Aztra 4,000서버 달성', highlight: true },
  {
    year: 2022,
    month: 7,
    content: '제4기 멤버 채용 (gangjun06, __filename, Dowon, Hankaru)',
  },
  {
    year: 2022,
    month: 7,
    content: 'Aztra에 음악 재생을 더한, Aztra Music 개발 시작',
  },
  { year: 2022, month: 7, content: '팀 홈페이지 리뉴얼' },
  { year: 2022, month: 8, content: '디스코드 2048 미니게임 봇 2¹² 개발 시작' },
  {
    year: 2026,
    month: 7,
    content: '디스코드 방치형 게임 봇 Idle Factory 개발 시작',
    highlight: true,
  },
  { year: 2026, month: 10, content: '팀 홈페이지 리뉴얼' },
];

export function groupByYear(items: HistoryItem[]) {
  const groups = new Map<number, HistoryItem[]>();
  for (const item of items) {
    groups.set(item.year, [...(groups.get(item.year) ?? []), item]);
  }
  return [...groups.entries()].map(([year, entries]) => ({ year, entries }));
}

export default history;

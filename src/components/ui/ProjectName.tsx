const SUPERSCRIPT = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/**
 * 프로젝트 이름. "2¹²"처럼 위첨자 숫자가 있으면 제목 서체에 그 글자가 없으므로,
 * 같은 서체의 작은 숫자를 위로 올려 씁니다. 화면 낭독기에는 원래 이름을 읽어 줍니다.
 */
export default function ProjectName({ name }: { name: string }) {
  const parts = name.split(/([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/);
  if (parts.length === 1) return name;

  return (
    <>
      <span className="visually-hidden">{name}</span>
      <span aria-hidden="true">
        {parts.map((part, i) =>
          i % 2 ? (
            <sup key={i}>
              {[...part].map((ch) => SUPERSCRIPT.indexOf(ch)).join('')}
            </sup>
          ) : (
            part
          )
        )}
      </span>
    </>
  );
}

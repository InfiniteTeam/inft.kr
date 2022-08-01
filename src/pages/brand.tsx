import type { NextPage } from 'next';
import Layout from 'components/Layout';
import styles from 'styles/pages/Brand.module.scss';

const About: NextPage = () => {
  return (
    <Layout page="브랜드" className={styles.page}>
      <div className={styles.section}>
        <span className={styles.title}>
          <span>브랜드</span>
          <small>BRAND</small>
        </span>
      </div>

      <div className="mt-8 flex flex-col">
        <h2 className="text-2xl py-6 font-semibold">InfiniteTeam 상징</h2>
        <div className="grid grid-cols-4 bg-slate-500/10 rounded-2xl p-3 gap-3 sm:p-4 sm:gap-4 sm:w-2/3 md:w-3/5 lg:p-5 lg:gap-5 lg:w-3/5 mx-auto shadow-xl">
          <div className="col-span-1">
            <img src="/logos/logo_wg.png" alt="logo_wg" />
          </div>
          <div className="col-span-1">
            <img src="/logos/logo_tg.png" alt="logo_wtg" />
          </div>
          <div className="col-span-1">
            <img src="/logos/logo_gw.png" alt="logo_gw" />
          </div>
          <div className="col-span-1">
            <img src="/logos/logo_wn.png" alt="logo_wn" />
          </div>
        </div>

        <a className="mx-auto mt-16 mb-6" href="/assets/logo.zip" download>
          <button
            type="button"
            className="rounded-xl bg-emerald-500 px-8 py-3 shadow-lg shadow-emerald-500/30"
          >
            로고 다운로드
          </button>
        </a>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl py-6 font-semibold">브랜드 컬러</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 bg-slate-500/10 p-3 rounded-2xl gap-5 shadow-xl">
          <div className="col-span-1 bg-[#00CC99] shadow-lg shadow-[#00cc996f] h-48 px-4 md:px-5 pb-4 flex flex-col justify-end rounded-xl">
            <div className="leading-7 text-2xl font-bold pb-1">
              Infinite
              <br />
              Mint
            </div>
            <div className="font-medium leading-6">
              = #00CC99
              <br />= RGB(0, 204, 153)
            </div>
          </div>
          <div className="col-span-1 bg-[#33CCCC] shadow-lg shadow-[#33cccc6f] h-48 px-4 md:px-5 pb-4 flex flex-col justify-end rounded-xl">
            <div className="leading-7 text-2xl font-bold pb-1">
              Infinite
              <br />
              Turquoise
            </div>
            <div className="font-medium leading-6">
              = #33CCCC
              <br />= RGB(51, 204, 204)
            </div>
          </div>
          <div className="col-span-1 bg-[#6D28D9] shadow-lg shadow-[#6c28d9a9] h-48 px-4 md:px-5 pb-4 flex flex-col justify-end rounded-xl">
            <div className="leading-7 text-2xl font-bold pb-1">
              Aztra
              <br />
              Violet
            </div>
            <div className="font-medium leading-6">
              = #6D28D9
              <br />= RGB(109, 40, 217)
            </div>
          </div>
          <div className="col-span-1 bg-[#131828] shadow-lg shadow-[#131828e2] h-48 px-4 md:px-5 pb-4 flex flex-col justify-end rounded-xl">
            <div className="leading-7 text-2xl font-bold pb-1">
              Infinite
              <br />
              Navy
            </div>
            <div className="font-medium leading-6">
              = #131828
              <br />= RGB(19, 24, 40)
            </div>
          </div>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl py-6 font-semibold">주의사항</h2>
        <ul className="list-disc gap-2 px-7 flex flex-col">
          <li className="leading-7 font-light">
            본 브랜드 상징은 InfiniteTeam 및 그 제품을 나타내는 용도로 자유롭게
            사용하실 수 있습니다.
          </li>
          <li className="leading-7 font-light">
            InfiniteTeam 브랜드 상징(로고를 비롯한 CI, BI)의 저작권은 모두
            InfiniteTeam에 있습니다.
          </li>
          <li className="leading-7 font-light">
            당사의 상표 또는 디자인을 모조, 모방 또는 날조하여 당사의 상표 또는
            디자인과 혼동될 가능성이 있는 유사한 상표 또는 디자인을 사용하면 안
            됩니다.
          </li>
          <li className="leading-7 font-light">
            특히, 당사의 식별력이나 명성을 손상하게 할 가능성이 있는 행위에
            대해서는 상표를 사용하면 안 됩니다.
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default About;

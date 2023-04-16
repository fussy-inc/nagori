import Head from "next/head";
import { useAppContext } from "./_app";
import Link from "next/link";
import mainStyle from "~/css/index.css";
import Button from "~/components/common/Button";

export default function Home() {
  const { currentUser } = useAppContext();

  return (
    <>
      <Head>
        <title>なごり</title>
        <meta name="description" content="聖地巡礼をもっと楽しく。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={mainStyle}>
        {currentUser ? (
          <section>
            <Button>
              <Link href={"/create"}>聖地巡礼マップを作る</Link>
            </Button>
            <Button>
              <Link href={"/checkin"}>近くのベニューを探す</Link>
            </Button>
          </section>
        ) : (
          <section>
            <p>
              <Link href={"/auth/login"}>ログイン</Link>してください
            </p>
          </section>
        )}
      </main>
    </>
  );
}

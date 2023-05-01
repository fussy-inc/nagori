import Head from "next/head";
import { useAppContext } from "./_app";
import Link from "next/link";
import { indexStyle } from "~/css/index.css";
import NearLocationList from "~/components/checkin/NearLocationList";
import CheckinModal from "~/components/checkin/CheckinModal";
import { MouseEvent, useState } from "react";
import { NearLocation } from "~/lib/hooks/useNearLocations";

export default function Home() {
  const { currentUser } = useAppContext();
  const [location, setLocation] = useState<NearLocation>();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const PageHead = (
    <Head>
      <title>なごり</title>
      <meta name="description" content="聖地巡礼をもっと楽しく。" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );

  if (currentUser == undefined) {
    return (
      <>
        {PageHead}
        <main className={indexStyle.mainStyle}>
          <section>
            <p>ログイン状態を確認中...</p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      {PageHead}
      <main className={indexStyle.mainStyle}>
        {currentUser ? (
          <section>
            <h2>近くのスポット</h2>
            <NearLocationList
              setNearLocation={setLocation}
              openCheckinModal={openModal}
            />
            {location && (
              <CheckinModal
                isOpen={isOpen}
                closeModal={closeModal}
                location={location}
              />
            )}
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

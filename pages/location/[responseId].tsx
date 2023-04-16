/** WORK IN PROGRESS */

import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";

type Props = {
  responseId: number;
};

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<Props> {
  const { responseId } = context.query;

  if (typeof responseId !== "string") {
    return { notFound: true };
  }

  return {
    props: {
      responseId: parseInt(responseId),
    },
  };
}

const Page: NextPage<Props> = () => {
  return (
    <>
      <main>
        <article>
          <p>この機能は現在開発中です</p>
        </article>
      </main>
    </>
  );
};

export default Page;

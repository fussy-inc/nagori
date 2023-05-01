import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import Link from "next/link";
import { useEffect } from "react";
import fetchAccessToken from "~/lib/fussy/fetchAccessToken";
import fetchUserByAccessToken from "~/lib/fussy/fetchUserByAccessToken";
import { useAppContext } from "~/pages/_app";
import { setCookie } from "nookies";

type Error = {
  message: string;
};

type Props = {
  sessionId: string | null;
  errors: Error[];
};

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<Props> {
  const { session_id } = context.query;

  if (typeof session_id !== "string") {
    return {
      props: {
        sessionId: null,
        errors: [
          {
            message: "session_id is not a string",
          },
        ],
      },
    };
  }

  return {
    props: {
      sessionId: session_id,
      errors: [],
    },
  };
}

const Page: NextPage<Props> = ({ sessionId, errors }) => {
  const { currentUser, setCurrentUser } = useAppContext();

  useEffect(() => {
    (async () => {
      if (sessionId) {
        const fetchAccessTokenResult = await fetchAccessToken(sessionId);
        if (fetchAccessTokenResult.isFailure()) {
          return;
        }
        const accessToken =
          fetchAccessTokenResult.value.issueFussyAccessToken.accessToken;

        setCookie(null, "fat", accessToken, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        const fetchUserResult = await fetchUserByAccessToken(accessToken);
        if (fetchUserResult.isFailure()) {
          return;
        }
        const user = fetchUserResult.value.userByAccessToken;
        setCurrentUser(user);
      }
    })();
  }, [sessionId, setCurrentUser]);

  if (errors.length > 0) {
    return (
      <main>
        <h1>エラーが発生しました</h1>
        <ul>
          {errors.map((error) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      </main>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <main>
      <h1>ログインできました</h1>
      <p>こんにちは {currentUser.name} さん</p>
      <Link href={"/"}>トップへ戻る</Link>
    </main>
  );
};

export default Page;

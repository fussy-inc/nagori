import "~/styles/globals.css";
import type { AppProps } from "next/app";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { parseCookies } from "nookies";
import fetchUserByAccessToken from "~/lib/fussy/fetchUserByAccessToken";
import Layout from "~/pages/_layout";

export type CurrentUser = {
  id: number;
  name: string;
};

export const AppContext = createContext(
  {} as {
    currentUser: CurrentUser | null | undefined; // null: ログインしていない, undefined: ログイン状態を確認中
    setCurrentUser: Dispatch<SetStateAction<CurrentUser | null | undefined>>;
  }
);

export const useAppContext = () => useContext(AppContext);

export default function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<
    CurrentUser | null | undefined
  >(undefined);
  const cookies = parseCookies();

  // ログイン
  useEffect(() => {
    const fussyAccessToken = cookies["fat"];
    if (
      typeof fussyAccessToken == "undefined" ||
      fussyAccessToken.length == 0
    ) {
      setCurrentUser(null);
      return;
    }

    if (currentUser) {
      return;
    }

    (async () => {
      const result = await fetchUserByAccessToken(fussyAccessToken);
      if (result.isFailure()) {
        setCurrentUser(null);
        return;
      }

      setCurrentUser(result.value.userByAccessToken);
    })();
  }, [cookies, currentUser]);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

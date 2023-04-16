import { NextPage } from "next";
import { v4 as uuidv4 } from "uuid";
import { FUSSY_SERVICE_URL, NAGORI_SERVICE_URL } from "~/lib/constant";

const ServiceInformation = {
  serviceName: "なごり",
  serviceUrl: NAGORI_SERVICE_URL,
  callbackUrl: `${NAGORI_SERVICE_URL}/auth/callback`,
};

function buildAuthUrl(sessionId: string): string {
  const url = new URL(`${FUSSY_SERVICE_URL}/auth/${sessionId}`);
  url.searchParams.append("serviceName", ServiceInformation.serviceName);
  url.searchParams.append("serviceUrl", ServiceInformation.serviceUrl);
  url.searchParams.append("callbackUrl", ServiceInformation.callbackUrl);

  return url.toString();
}

const Page: NextPage = () => {
  const sessionId = uuidv4();
  const url = buildAuthUrl(sessionId);

  return (
    <main>
      <h1>ログイン</h1>
      <a href={url.toString()} role="button">
        FUSSY でログインする
      </a>
    </main>
  );
};

export default Page;

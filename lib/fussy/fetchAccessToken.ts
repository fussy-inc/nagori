import { Failure, Result, Success } from "~/lib/result";
import { FUSSY_API_URL, NAGORI_SERVICE_URL } from "~/lib/constant";

const issueFussyAccessTokenQuery = `
  mutation IssueFussyAccessToken($sessionId: String!) {
    issueFussyAccessToken(input: {sessionId: $sessionId}) {
      accessToken
    }
  }
`;

type IssueFussyAccessTokenResponse = {
  issueFussyAccessToken: {
    accessToken: string;
  };
};

async function fetchAccessToken(
  sessionId: string
): Promise<Result<IssueFussyAccessTokenResponse, Error>> {
  const response = await fetch(FUSSY_API_URL + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": NAGORI_SERVICE_URL,
    },
    body: JSON.stringify({
      query: issueFussyAccessTokenQuery,
      variables: {
        sessionId,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    const error = errors[0];
    return new Failure(new Error(error.message));
  } else {
    return new Success(data);
  }
}

export default fetchAccessToken;

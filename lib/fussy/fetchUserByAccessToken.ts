import { Failure, Result, Success } from "~/lib/result";
import { FUSSY_API_URL } from "../constant";

const fetchUserByAccessTokenQuery = `
  query FetchUserByAccessToken($accessToken: String!) {
    userByAccessToken(accessToken: $accessToken) {
      id
      name
      bio
    }
  }
`;

type FetchUserByAccessTokenResponse = {
  userByAccessToken: {
    id: number;
    name: string;
    bio: string | null;
  };
};

async function fetchUserByAccessToken(
  accessToken: string
): Promise<Result<FetchUserByAccessTokenResponse, Error>> {
  const response = await fetch(FUSSY_API_URL + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: fetchUserByAccessTokenQuery,
      variables: {
        accessToken,
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

export default fetchUserByAccessToken;

import { Failure, Result, Success } from "~/lib/result";
import { FetchNearLocationsQuery } from "~/lib/graphql/graphql";
import { FUSSY_API_URL } from "~/lib/constant";

const fetchNearLocationsQuery = /* GraphQL */ `
  query fetchNearLocations(
    $latitude: Float!
    $longitude: Float!
    $distance: Float!
  ) {
    responses(
      locationNearby: {
        latitude: $latitude
        longitude: $longitude
        distance: $distance
      }
    ) {
      id
      answers {
        ... on LocationAnswer {
          id
          locationValue: value {
            latitude
            longitude
          }
          position
          __typename
        }

        ... on TextAnswer {
          id
          textValue: value
          position
          __typename
        }

        ... on NumberAnswer {
          id
          numberValue: value
          position
          __typename
        }
      }
      form {
        id
        categories {
          id
          name
        }
      }
    }
  }
`;

type Location = {
  latitude: number;
  longitude: number;
};

async function fetchNearLocations(
  currentPosition: Location
): Promise<Result<FetchNearLocationsQuery, Error>> {
  const response = await fetch(FUSSY_API_URL + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: fetchNearLocationsQuery,
      variables: {
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        distance: 10_000, // 10km圏内を表示する
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

export default fetchNearLocations;

import { FetchNearLocationsQuery } from "~/lib/graphql/graphql";
import { useCallback, useEffect, useState } from "react";
import fetchNearLocations from "~/lib/fussy/fetchNearLocations";

export type NearLocation = Location & { distance: number };

type Location = {
  name: string;
  description: string;
  point: Coordinate;
  url: string;
  responseId: number;
  category: {
    id: number;
    name: string;
  };
};

type Coordinate = {
  latitude: number;
  longitude: number;
};

function distance(point1: Coordinate, point2: Coordinate): number {
  const rad = (degrees: number) => degrees * (Math.PI / 180);
  const lat1 = rad(point1.latitude);
  const lng1 = rad(point1.longitude);
  const lat2 = rad(point2.latitude);
  const lng2 = rad(point2.longitude);

  return (
    6371 *
    Math.acos(
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
        Math.sin(lat1) * Math.sin(lat2)
    )
  );
}

function convertResponseToLocation(
  response: FetchNearLocationsQuery["responses"][number]
): Location {
  const name = (() => {
    const nameAnswerPosition = 0;
    const candidates = response.answers.map((answer) => {
      return answer.__typename === "TextAnswer" &&
        answer.position == nameAnswerPosition
        ? answer.textValue
        : undefined;
    });

    return candidates.find((candidate) => candidate !== undefined);
  })()!;

  const description = (() => {
    const descriptionAnswerPosition = 1;
    const candidates = response.answers.map((answer) => {
      return answer.__typename === "TextAnswer" &&
        answer.position == descriptionAnswerPosition
        ? answer.textValue
        : undefined;
    });

    return candidates.find((candidate) => candidate !== undefined);
  })()!;

  const point = (() => {
    const pointAnswerPosition = 2;
    const candidates = response.answers.map((answer) => {
      return answer.__typename === "LocationAnswer" &&
        answer.position == pointAnswerPosition
        ? {
            latitude: answer.locationValue.latitude,
            longitude: answer.locationValue.longitude,
          }
        : undefined;
    });

    return candidates.find((candidate) => candidate !== undefined);
  })()!;

  const url = (() => {
    const urlAnswerPosition = 3;
    const candidates = response.answers.map((answer) => {
      return answer.__typename === "TextAnswer" &&
        answer.position == urlAnswerPosition
        ? answer.textValue
        : undefined;
    });

    return candidates.find((candidate) => candidate !== undefined);
  })()!;

  const category = response.form.categories[0] as {
    id: number;
    name: string;
  };

  return {
    name,
    description,
    point,
    url,
    responseId: response.id,
    category,
  };
}

const useLocations = () => {
  // const { latitude, longitude, error } = useGeolocation();
  const { latitude, longitude, error } = {
    latitude: 35.689487,
    longitude: 139.691706,
    error: null,
  };
  const [locations, setLocations] = useState<NearLocation[]>([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(latitude);

  const callFetchNearLocations = useCallback(async () => {
    // if (error) {
    //   setErrorMessage("位置情報が取得できませんでした\n" + error.message);
    // }

    if (!latitude || !longitude) {
      setLoading(true);
      return;
    }

    setLoading(true);
    const result = await fetchNearLocations({ latitude, longitude });
    setLoading(false);

    if (result.isFailure()) {
      setErrorMessage(result.error.message);
      return;
    }

    const nearLocations = result.value.responses
      .map(convertResponseToLocation)
      .map((location) => {
        return {
          ...location,
          distance: distance(
            { latitude: latitude, longitude: longitude },
            {
              latitude: location.point.latitude,
              longitude: location.point.longitude,
            }
          ),
        };
      });
    setLocations(nearLocations);
    setFetched(true);
  }, [error, latitude, longitude]);

  useEffect(() => {
    (async () => await callFetchNearLocations())();

    return () => {
      setFetched(false);
      setLoading(false);
    };
  }, [callFetchNearLocations, latitude, longitude]);

  return {
    locations,
    fetched,
    loading,
    errorMessage,
    callFetchNearLocations,
  };
};

export default useLocations;

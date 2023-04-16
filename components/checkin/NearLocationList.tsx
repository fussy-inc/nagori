import { FC, MouseEvent } from "react";
import Link from "next/link";
import useNearLocations, { NearLocation } from "~/lib/hooks/useNearLocations";
import Button from "~/components/common/Button";
import { usePermission } from "react-use";
import { locationListStyle } from "~/css/checkin/NearLocationList.css";

type Props = {
  setNearLocation: (location: NearLocation) => void;
  openCheckinModal: (e: MouseEvent<HTMLElement>) => void;
};

const NearLocationList: FC<Props> = ({ setNearLocation, openCheckinModal }) => {
  const { locations, loading, fetched, callFetchNearLocations, errorMessage } =
    useNearLocations();
  const permission = usePermission({ name: "geolocation" });

  const handleClickCheckin = (
    e: MouseEvent<HTMLElement>,
    location: NearLocation
  ) => {
    e.preventDefault();
    setNearLocation(location);
    openCheckinModal(e);
  };

  const curriedHandleClickCheckin =
    (location: NearLocation) => (e: MouseEvent<HTMLElement>) => {
      handleClickCheckin(e, location);
    };

  // 初期状態
  if (!loading && !fetched) {
    return <Button onClick={callFetchNearLocations}>近くの聖地を探す</Button>;
  }

  // loading
  if (loading) {
    return <div>読み込み中... #{permission}</div>;
  }

  // loaded
  if (locations.length == 0) {
    return <div>近くに聖地はありません</div>;
  }

  if (errorMessage.length > 0) {
    return <div>{errorMessage}</div>;
  }

  return (
    <section>
      <ul>
        {locations.map((location, index) => {
          return (
            <li key={index} className={locationListStyle.wrapper}>
              <article className={locationListStyle.contentBody}>
                <h3>{location.name}</h3>
                <div className={locationListStyle.details}>
                  <p className={locationListStyle.description}>
                    {location.description}
                  </p>
                  <div className={locationListStyle.metadata}>
                    <p className={locationListStyle.distance}>
                      {location.distance.toFixed(1)}km先
                    </p>
                    <p>￤</p>
                    <Link
                      href={location.url}
                      className={locationListStyle.locationUrl}
                    >
                      🔗
                    </Link>
                    <p>￤</p>
                    <div
                      role={"button"}
                      onClick={curriedHandleClickCheckin(location)}
                    >
                      <p className={locationListStyle.locationUrl}>📍</p>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default NearLocationList;

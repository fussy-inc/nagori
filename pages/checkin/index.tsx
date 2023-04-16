import { NextPage } from "next";
import NearLocationList from "~/components/checkin/NearLocationList";
import CheckinModal from "~/components/checkin/CheckinModal";
import { useState, MouseEvent } from "react";
import { NearLocation } from "~/lib/hooks/useNearLocations";

const Page: NextPage = () => {
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

  return (
    <>
      <main>
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
      </main>
    </>
  );
};

export default Page;

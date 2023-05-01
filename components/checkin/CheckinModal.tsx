import Modal from "react-modal";
import { FC, MouseEvent, useState } from "react";
import { NearLocation } from "~/lib/hooks/useNearLocations";
import { checkinModalStyle } from "~/css/checkin/CheckinModal.css";
import addCheckinRecord from "~/lib/fussy/addCheckinRecord";
import fetchFormIdFromCategoryId from "~/lib/fussy/fetchFormIdFromCategoryId";
import fetchCheckinForm from "~/lib/fussy/fetchCheckinForm";
import { parseCookies } from "nookies";

type Props = {
  isOpen: boolean;
  closeModal: (e: MouseEvent<HTMLElement>) => void;
  location: NearLocation;
};

const checkin = async (
  location: NearLocation,
  message: string,
  categoryId: number,
  accessToken: string
) => {
  const formId = fetchFormIdFromCategoryId(categoryId);
  if (!formId) {
    return;
  }

  const form = await fetchCheckinForm(formId);
  if (form.isFailure()) {
    return;
  }

  await addCheckinRecord(
    formId,
    {
      value: location.name,
      questionId: form.value.form.questions[0].id,
    },
    {
      value: message,
      questionId: form.value.form.questions[1].id,
    },
    {
      value: location.responseId,
      questionId: form.value.form.questions[2].id,
    },
    accessToken
  );
};

const CheckinModal: FC<Props> = ({ isOpen, closeModal, location }) => {
  const [checkinMessage, setCheckinMessage] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const placeholderMessage = `「${location.name}」での気持ちを書き残そう！`;

  const handleClickCheckin = async () => {
    if (isConnecting) {
      return;
    }
    setIsConnecting(true);

    const accessToken = parseCookies(null).fat;
    if (!accessToken) {
      setIsConnecting(false);
      return;
    }

    await checkin(location, checkinMessage, location.category.id, accessToken);
    setIsConnecting(false);
  };

  return (
    <Modal isOpen={isOpen} className={checkinModalStyle.modal}>
      <section className={checkinModalStyle.modalContent}>
        <div>チェックイン!</div>
        <div className={checkinModalStyle.textareaWrapper}>
          <textarea
            placeholder={placeholderMessage}
            onChange={(e) => setCheckinMessage(e.target.value)}
            cols={40}
            rows={2}
            className={checkinModalStyle.textarea}
          />
        </div>

        <div className={checkinModalStyle.buttonContainer}>
          <button
            onClick={handleClickCheckin}
            className={checkinModalStyle.button}
          >
            記録する
          </button>
          <button onClick={closeModal} className={checkinModalStyle.button}>
            閉じる
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default CheckinModal;

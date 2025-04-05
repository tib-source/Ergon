import Modal, { ModalProps } from "../Modal";
import { Equipment } from "../../types.spec.ts"; /**/
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from "react";
import { useAuthorizedClient } from "../../hooks/useAuthorizedClient/useAuthorizedClient.tsx";
import { useMutation } from "@tanstack/react-query";
import Loading from "../Loader";
import axios from "axios";

interface BookingModalProps extends ModalProps {
  equipmentList: Equipment[];
  toggleModal: () => void;
  current?: number;
  refresh: Dispatch<SetStateAction<boolean>>;
}

const BookingModal = ({
                        open,
                        equipmentList,
                        toggleModal,
                        current,
                        refresh
                      }: BookingModalProps) => {
  const client = useAuthorizedClient();
  const equipmentValue = useRef<HTMLSelectElement>(null);
  const fromDateValue = useRef<HTMLInputElement>(null);
  const untilDateValue = useRef<HTMLInputElement>(null);
  const reason = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const fromDateElement = fromDateValue.current;
    if (fromDateElement) {
      fromDateElement.value = today;
      fromDateElement?.setAttribute("min", today);
    }
  }, []);

  const handleBooking = () => {
    const jsonPayload = {
      equipmentId: equipmentValue.current?.value,
      from: fromDateValue.current?.value,
      to: untilDateValue.current?.value,
      reason: reason.current?.value
    };

    return sendBookingRequest(jsonPayload);
  };

  const { mutate, isPending, isError, error } = useMutation({
      mutationFn: handleBooking,
      onSuccess: () => {
        toggleModal();
        refresh(true);
      }

    }
  );

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };
  const sendBookingRequest = (data: object) => {
    return client.post(
      "/bookings",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  };

  if (isPending) {
    return <Modal open={open}>
      <Loading />
    </Modal>;
  }


  return (
    <Modal open={open}>
      <h1 className="modal__title">Book Equipment</h1>
      <form className="modal__content" onSubmit={handleFormSubmit}>
        <div className="input__container full_width">
          <div className="input__label">
            <p>Item :</p>
          </div>
          <select className="input__field " ref={equipmentValue} defaultValue={current || 1} name="equipment" required>
            {equipmentList.map((equipment) => (
              <option key={equipment.id} value={equipment.id}>
                {" "}
                {equipment.id} - {equipment.name}{" "}
              </option>
            ))}
          </select>
        </div>
        <section className="full_width">
          <div className="input__container">
            <div className="input__label">
              <p>From:</p>
            </div>
            <input type="date" className="input__field" id="fromDate" ref={fromDateValue} name="fromDate" required />
          </div>

          <div className="input__container">
            <div className="input__label">
              <p>Until:</p>
            </div>
            <input type="date" className="input__field" id="untilDate" ref={untilDateValue} name="untillDate"
                   required />
          </div>
        </section>

        <div className="input__container full_width">
          <div className="input__label">
            <p>Reason :</p>
          </div>
          <input
            className="input__field"
            type="text"
            name="reason"
            id="bookingReason"
            ref={reason}
          />
          { isError && axios.isAxiosError(error) &&
            <div className="input__error">
              <p>{error?.response?.data.message || "Failed to Book Equipment"}</p>
            </div>
          }
        </div>

        <section className="modal__buttons full_width">
          <button
            type="button"
            className="styled__button cancel"
            onClick={toggleModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="styled__button"
          >
            Book
          </button>
        </section>
      </form>
    </Modal>
  );
};

export default BookingModal;

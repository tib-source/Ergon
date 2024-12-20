import Modal, { ModalProps } from "../Modal";
import { Equipment } from "../../types.spec.ts";
import Env from "../../Env.ts";
import { Dispatch, FormEventHandler, SetStateAction, useEffect } from "react";

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
  refresh,
}: BookingModalProps) => {

  useEffect(()=>{
    const today = new Date().toISOString().split('T')[0]
    const fromDateElement = document.getElementById("fromDate")
    fromDateElement.value = today;
    fromDateElement?.setAttribute('min', today) 
  }, [])
  const handleBooking: FormEventHandler = (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    const equipmentValue = form.elements['equipment'].value;
    const fromDateValue = form.elements['fromDate'].value;
    const untilDateValue = form.elements['untilDate'].value;
    const reason = form.elements["reason"].value;


    const jsonPayload = { 
      equipmentId : equipmentValue,
      from : fromDateValue, 
      to : untilDateValue, 
      reason
    }
    sendBookingRequest(jsonPayload);
    toggleModal();
    refresh(true)
  }

  const sendBookingRequest = (data: object) => {
    fetch(Env.BASE_URL + "/bookings", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data),
      // TODO: CREATE THAT TOASTIFY NOTIFICATION THINGIE WHEN THIS ERRORS OUT :P
    }).then(async (res) => console.log(await res.json()));
  };



  return (
    <Modal open={open}>
      <h1 className="modal__title">Book Equipment</h1>
      <form className="modal__content" onSubmit={handleBooking}>
        <div className="input__container full_width">
          <div className="input__label">
            <p>Item :</p>
          </div>
          <select className="input__field " defaultValue={current || 1} name="equipment" required>
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
            <input type="date" className="input__field" id="fromDate" name="fromDate" required/>
          </div>

          <div className="input__container">
            <div className="input__label">
              <p>Until:</p>
            </div>
            <input type="date" className="input__field" id="untilDate" name="untillDate" required />
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
          />
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

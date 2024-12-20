import Modal, { ModalProps } from "../Modal";
import { Equipment } from "../../types.spec.ts";
import Env from "../../Env.ts";
import { MouseEventHandler, useEffect } from "react";

interface BookingModalProps extends ModalProps {
  equipmentList: Equipment[];
  toggleModal: () => void;
  current?: number;
}

const BookingModal = ({
  open,
  equipmentList,
  toggleModal,
  current,
}: BookingModalProps) => {

  useEffect(()=>{
    const today = new Date().toISOString().split('T')[0]
    const fromDateElement = document.getElementById("fromDate")
    fromDateElement?.setAttribute('min', today) 

  }, [])
  const handleBooking: MouseEventHandler = (e) => {
    e.preventDefault()
    console.log(e)
    sendBookingRequest();
    toggleModal();
  }

  const sendBookingRequest = () => {
    fetch(Env.BASE_URL + "/bookings", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        equipmentId: 20,
        from: "2010-11-20",
        to: "2012-11-20",
        reason: "Testing this",
      }),
      // TODO: CREATE THAT TOASTIFY NOTIFICATION THINGIE WHEN THIS ERRORS OUT :P
    }).then(async (res) => console.log(await res.json()));
  };



  return (
    <Modal open={open}>
      <h1 className="modal__title">Book Equipment</h1>
      <form className="modal__content">
        <div className="input__container full_width">
          <div className="input__label">
            <p>Item :</p>
          </div>
          <select className="input__field " defaultValue={current || 1}>
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
            <input type="date" className="input__field" id="fromDate" />
          </div>

          <div className="input__container">
            <div className="input__label">
              <p>Until:</p>
            </div>
            <input type="date" className="input__field" id="untilDate" />
          </div>
        </section>

        <div className="input__container full_width">
          <div className="input__label">
            <p>Reason :</p>
          </div>
          <input
            className="input__field"
            type="text"
            name="bookingReason"
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
            onClick={handleBooking}
          >
            Book
          </button>
        </section>
      </form>
    </Modal>
  );
};

export default BookingModal;

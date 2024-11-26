import Modal, {ModalProps} from "../Modal";
import {Equipment} from "../../types.spec.ts";
import Env from "../../Env.ts";
interface BookingModalProps extends ModalProps {
    equipmentList: Equipment[];
    toggleModal: () => void;
    current?: number
}
const BookingModal = ({open, equipmentList, toggleModal, current} : BookingModalProps) => {
    function handleBooking() {
        sendBookingRequest()
        toggleModal()
    }


    const sendBookingRequest = () => {
        fetch( Env.BASE_URL + "/booking", {
            method: "POST",
            body: JSON.stringify({
                "equipmentId" : 1,
                "from" : "10/11/2025",
                "to" : "12/11/2025",
                "reason" : "Testing this"
            })
            // TODO: CREATE THAT TOASTIFY NOTIFICATION THINGIE WHEN THIS ERRORS OUT :P
        }).then( async res => console.log( await res.json()))
    }
    return (
        <Modal open={open}>
            <h1 className="modal__title">Book Equipment</h1>
            <div className="modal__content">
            <div className="input__container full_width">
                <div className="input__label">
                    <p>Item :</p>
                </div>
                <select
                    className="input__field "
                    value={current || 1}
                >
                    {equipmentList.map(equipment => (
                        <option key={equipment.id} value={equipment.id}> {equipment.id} - {equipment.name} </option>
                    ))}
                </select>
            </div>
            <section className="full_width">
                <div className="input__container">
                    <div className="input__label">
                        <p>From:</p>
                    </div>
                    <input type="date" className="input__field" id="fromDate"/>
                </div>

                <div className="input__container">
                    <div className="input__label">
                        <p>Until:</p>
                    </div>
                    <input type="date" className="input__field" id="untilDate"/>
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
                <button type="button" className="styled__button" onClick={handleBooking}>
                    Book
                </button>
                <button
                    type="button"
                    className="styled__button cancel"
                    onClick={toggleModal}
                >
                    Cancel
                </button>
            </section>
            </div>
        </Modal>
    );
};

export default BookingModal;
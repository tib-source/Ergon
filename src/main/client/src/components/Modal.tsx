import "./styling/dashboard.css"

interface ModalProps {
    open: boolean
    children: React.ReactNode
}
const Modal = ({ open, children } : ModalProps) => {

    return (
        <div style={{display: open ? "block" : "none"}}>
            <div id="modal_overlay"></div>
            <div className="modal">
                {children}
            </div>
        </div>
    );
};

export default Modal;
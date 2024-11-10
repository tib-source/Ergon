import "./styling/navigation.css"
import hamburgerIcon from "../assets/hamburger.svg"
import closeIcon from "../assets/close.svg"

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export const Hamburger = ({ open, setOpen} : Props) => {
    const width = 30
    return (
        <div className='navigation__hamburger'>
            {open ? (<img onClick={() => setOpen(false)} width={width} src={closeIcon} alt="close icon"/>) : (
                <img onClick={() => setOpen(true)} width={width} src={hamburgerIcon} alt="hamburger icon"/>
            )}


        </div>
    )
}
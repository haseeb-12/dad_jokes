
import ReactDOM from 'react-dom'
import './modal.css'
import ModalOverlay from './ModalOverlay'

const Backdrop = () => {
    return (<div className='backdrop' />)
}

const portalElement = document.getElementById('overlay')

const Modal = () => {
    return (
        <>
            {ReactDOM.createPortal(<ModalOverlay />, portalElement)}
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
        </>
    )
}

export default Modal
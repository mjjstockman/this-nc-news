import { ToastContainer, Toast } from 'react-bootstrap';

const ToastNotification = ({ show, message, variant, onClose }) => {
  return (
    <ToastContainer
      className='position-fixed top-0 start-50 translate-middle-x'
      style={{ zIndex: 9999 }}>
      <Toast bg={variant} onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className='me-auto'>Notification</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Box, styled } from '@mui/material';

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const modalRoot = useRef(
    document.getElementById('modal-root') || document.createElement('div')
  );

  useEffect(() => {
    if (!document.getElementById('modal-root')) {
      modalRoot.current.id = 'modal-root';
      document.body.appendChild(modalRoot.current);
    }

    return () => {
      if (modalRoot.current.parentElement === document.body) {
        document.body.removeChild(modalRoot.current);
      }
    };
  }, []);


  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  return createPortal(
    <ModalBox onClick={handleClick}>
      <ModalContentWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContentWrapper>
    </ModalBox>,
    modalRoot.current
  );
}

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '1000',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ModalContentWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
}));

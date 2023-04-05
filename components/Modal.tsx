import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import event from '../assets/event.jpg';
import { useRouter } from 'next/router';

const ModalPopup: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleNotice = () => {
    setOpen(false);
    router.push(`/news/notice/088da52e-e106-482d-b007-6f30aeaf0275`);
  };

  const handleExpireClose = () => {
    let nowDate = new Date();
    let expires = nowDate.setHours(nowDate.getHours() + 24);
    localStorage.setItem('expireTime', expires.toString());
    setOpen(false);
  };

  const handleClose = (_?, reason?) => {
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
  };

  useEffect(() => {
    const HAS_VISITED_BEFORE = localStorage.getItem('expireTime');

    const handleShowModal = () => {
      if (HAS_VISITED_BEFORE && +HAS_VISITED_BEFORE > +new Date()) {
        return;
      } else {
        localStorage.removeItem('expireTime');
        setOpen(true);
      }

      if (!HAS_VISITED_BEFORE) {
        setOpen(true);
      }
    };

    window.setTimeout(handleShowModal, 100);
  }, []);

  return (
    <Dialog
      id="modal"
      open={isOpen}
      onClose={handleClose}
      className="rounded-lg"
      hideBackdrop={true}
      disableEscapeKeyDown={true}
    >
      <DialogContent className="w-[700px]">
        <DialogContentText className="w-[650px]">
          <Image
            src={event}
            onClick={handleNotice}
            className="cursor-pointer"
            alt="이벤트용 이미지"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          className="text-black-300 rounded-md p-4 hover:bg-[#a9ce8e] hover:text-white"
          onClick={handleExpireClose}
        >
          오늘 하루 안보기
        </button>
        <button
          className="text-black-300 rounded-md p-4 hover:bg-[#a9ce8e] hover:text-white"
          onClick={handleClose}
        >
          닫기
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPopup;

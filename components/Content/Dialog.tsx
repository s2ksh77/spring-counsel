import {
  Dialog as DialogCompo,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import useMutation from '@libs/client/useMutation';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  router: { push: (path: string) => void };
}

const Dialog = ({ open, onClose, id, router }: DialogProps) => {
  const [deleteNotice, { loading }] = useMutation(`/api/notice/${id}/delete`, 'DELETE');

  const handleDelete = async () => {
    if (loading) return;
    await deleteNotice();
    router.push('/news/notice');
    router.refresh();
  };

  return (
    <DialogCompo open={open} onClose={onClose}>
      <DialogTitle>공지사항 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText>게시글을 삭제 하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleDelete}>확인</Button>
      </DialogActions>
    </DialogCompo>
  );
};

export default Dialog;

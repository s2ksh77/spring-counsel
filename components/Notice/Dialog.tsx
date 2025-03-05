import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import useMutation from '@libs/client/useMutation';

interface NoticeDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  router: { push: (path: string) => void };
}

const NoticeDialog = ({ open, onClose, id, router }: NoticeDialogProps) => {
  const [deleteNotice, { loading }] = useMutation(`/api/notice/${id}/delete`);

  const handleDelete = async () => {
    if (loading) return;
    await deleteNotice();
    router.push('/news/notice');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>공지사항 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText>게시글을 삭제 하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleDelete}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoticeDialog;

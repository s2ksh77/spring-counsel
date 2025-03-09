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
  type: 'notice' | 'review';
  id: string;
  router: { push: (path: string) => void };
}

const Dialog = ({ open, onClose, type, id, router }: DialogProps) => {
  const [deleteContent, { loading }] = useMutation(`/api/${type}/${id}/delete`, 'DELETE');

  const handleDelete = async () => {
    if (loading) return;
    await deleteContent();
    router.push(`/news/${type}`);
    router.refresh();
  };

  return (
    <DialogCompo open={open} onClose={onClose}>
      <DialogTitle>{type === 'notice' ? '공지사항' : '상담후기'} 삭제</DialogTitle>
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

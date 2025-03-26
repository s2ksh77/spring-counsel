'use client';
import {
  Dialog as DialogCompo,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/navigation';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  type: 'notice' | 'review' | 'proposal';
  id: string;
}

const dialogOptions = {
  notice: {
    title: '공지사항',
    path: '/news/notice',
  },
  review: {
    title: '상담후기',
    path: '/news/review',
  },
  proposal: {
    title: '상담신청',
    path: '/proposal/list',
  },
};

const Dialog = ({ open, onClose, type, id }: DialogProps) => {
  const router = useRouter();
  const [deleteContent, { loading }] = useMutation(
    `/api/${type}/${id}/delete`,
    'DELETE',
  );

  const handleDelete = async () => {
    if (loading) return;
    await deleteContent(id);
    router.push(dialogOptions[type].path);
    router.refresh();
  };

  return (
    <DialogCompo open={open} onClose={onClose}>
      <DialogTitle>{dialogOptions[type].title} 삭제</DialogTitle>
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

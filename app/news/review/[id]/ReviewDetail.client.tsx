'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { useSession } from 'hooks/useSession';
import { Header, Content, Editor, Dialog } from '@components/Content/index';

interface ReviewDetailClientProps {
  id: string;
  review: {
    id: string;
    title: string;
    content: string;
    isPrimary?: boolean | null;
    updatedAt?: any;
    files?: { id: string; name: string }[];
  };
}

const ReviewDetailClient = ({ id, review }: ReviewDetailClientProps) => {
  const router = useRouter();
  const { isLogin } = useSession();
  const [editState, setEditState] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const goBack = () => router.push('/news/review');
  const handleEdit = () => setEditState(true);
  const handleCancel = () => setEditState(false);
  const handleDeleteOpen = () => setDialogVisible(true);
  const handleDeleteClose = () => setDialogVisible(false);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-8 pt-4">
      {editState ? (
        <Editor type={'review'} data={review} onCancel={handleCancel} />
      ) : (
        <Content
          data={review}
          onEdit={handleEdit}
          handleDialogOpen={handleDeleteOpen}
        />
      )}

      <div className="flex justify-end pt-2">
        <Button onClick={goBack} style={{ color: 'black' }}>
          <MenuOutlined className="mr-1" /> 목록
        </Button>
      </div>

      <Dialog
        open={dialogVisible}
        type={'review'}
        onClose={handleDeleteClose}
        id={id}
      />
    </div>
  );
};

export default ReviewDetailClient;

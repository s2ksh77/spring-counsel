'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { useSession } from 'hooks/useSession';
import { NoticeHeader, NoticeContent, NoticeEditor, Dialog } from '@components/Notice';

interface NoticeDetailClientProps {
  id: string;
  notice: {
    id: string;
    title: string;
    content: string;
    isPrimary: boolean;
    updatedAt?: string;
    files?: { id: string; name: string }[];
  };
}

const NoticeDetailClient = ({ id, notice }: NoticeDetailClientProps) => {
  const router = useRouter();
  const { isLogin } = useSession();
  const [editState, setEditState] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const goBack = () => router.push('/news/notice');
  const handleEdit = () => setEditState(true);
  const handleCancel = () => setEditState(false);
  const handleDeleteOpen = () => setDialogVisible(true);
  const handleDeleteClose = () => setDialogVisible(false);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-8">
      {editState ? (
        <NoticeEditor notice={notice} onCancel={handleCancel} />
      ) : (
        <NoticeContent notice={notice} onEdit={handleEdit} handleDialogOpen={handleDeleteOpen} />
      )}

      <div className="flex justify-end pt-2">
        <Button onClick={goBack} style={{ color: 'black' }}>
          <MenuOutlined className="mr-1" /> 목록
        </Button>
      </div>

      <Dialog open={dialogVisible} onClose={handleDeleteClose} id={id} router={router} />
    </div>
  );
};

export default NoticeDetailClient;

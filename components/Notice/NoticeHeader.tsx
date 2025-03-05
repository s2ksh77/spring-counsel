import { Button } from '@mui/material';
import { EditOutlined, DeleteOutlineOutlined } from '@mui/icons-material';

interface NoticeHeaderProps {
  notice: { title: string };
  isLogin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const NoticeHeader = ({ notice, isLogin, onEdit, onDelete }: NoticeHeaderProps) => (
  <div className="border-b-2 pb-8 text-3xl font-bold">
    공지사항
    <div className="flex items-center justify-between pt-4">
      <span className="text-lg font-bold">{notice?.title}</span>
      {isLogin && (
        <div className="flex gap-2">
          <Button onClick={onEdit} style={{ color: 'black' }}>
            <EditOutlined className="mr-1" /> 수정
          </Button>
          <Button onClick={onDelete} style={{ color: 'black' }}>
            <DeleteOutlineOutlined className="mr-1" /> 삭제
          </Button>
        </div>
      )}
    </div>
  </div>
);

export default NoticeHeader;

import { NextPage } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import { MenuOutlined, EditOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import { Notice } from '@prisma/client';

interface NoticeProps {
  title: string;
  content: string;
  isPrimay: boolean;
}

interface NoticeResponse {
  ok: boolean;
  notice: Notice;
}

const NoticeForm: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [checked, setChecked] = useState(false);
  const [createNotice, { data, loading }] = useMutation<NoticeResponse>('/api/notice');

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleEditorChange = (content: any) => {
    setContent(content);
  };

  const goBack = () => {
    router.push('/news/notice');
  };

  const submitForm = () => {
    if (loading) return;
    if (title === '') {
      alert('제목을 입력하세요.');
      return;
    }
    if (content === '') {
      alert('내용을 입력하세요.');
      return;
    }
    createNotice({
      title,
      content,
      isPrimary: checked,
    });
  };

  useEffect(() => {
    if (data?.ok) {
      router.push('/news/notice');
    }
  }, [data]);

  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">공지사항</div>

      <>
        <div className="float-right ml-auto flex">
          <div>
            공지로 등록
            <Checkbox
              checked={checked}
              onChange={handleCheckBoxChange}
              inputProps={{ 'aria-label': 'controlled' }}
              className="transition-none"
            />
          </div>
        </div>

        <div className="w-full pt-8">
          <div className="flex w-full flex-row items-center">
            <div className="w-[50px] items-center">
              <label>제목</label>
            </div>
            <div className="w-full">
              <input
                onChange={handleChange}
                type="text"
                className="w-full appearance-none rounded-md  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a9ce8e] focus:outline-none focus:ring-[#a9ce8e]"
              />
            </div>
          </div>
        </div>
        <div className="h-full pt-8">
          <Editor
            apiKey="90655irb9nds5o8ycj2bpivk0v2y34e2oa6qta82nclxrnx3"
            init={{
              height: '100%',
              plugins:
                '  autolink   lists link image charmap preview anchor searchreplace visualblocks  fullscreen  insertdatetime media table help wordcount',
              toolbar:
                'undo redo | formatselect | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | link | insertImage insertfile | hr table codesample insertdatetime print',
              statusbar: false,
              menubar: false,
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </>
      <div>
        <div className="float-right ml-auto flex pt-2">
          <Button onClick={goBack} className="mr-2 text-black">
            <MenuOutlined className="mr-1" />
            목록
          </Button>
          <Button onClick={submitForm} className="text-black">
            <EditOutlined className="mr-1" />
            등록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoticeForm;

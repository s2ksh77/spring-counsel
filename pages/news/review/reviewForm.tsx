import { NextPage } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import { MenuOutlined, EditOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import { Review } from '@prisma/client';

interface ReviewProps {
  title: string;
  content: string;
}

interface ReviewResponse {
  ok: boolean;
  review: Review;
}

const ReviewForm: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createReview, { data, loading }] = useMutation<ReviewResponse>('/api/review');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleEditorChange = (content: any) => {
    setContent(content);
  };

  const goBack = () => {
    router.push('/news/review');
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
    createReview({
      title,
      content,
    });
  };

  useEffect(() => {
    if (data?.ok) {
      router.push('/news/review');
    }
  }, [data]);

  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">상담후기</div>

      <>
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
        <div className="h-fit min-h-[500px] pt-8">
          <Editor
            apiKey="8p9h7icidtp8v7ebuiyjo96ymstju4oy95g1xi68gdhvejph"
            init={{
              height: '100%',
              min_height: 500,
              plugins:
                'autolink lists link image charmap preview anchor searchreplace visualblocks  fullscreen  insertdatetime media table help wordcount',
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

export default ReviewForm;

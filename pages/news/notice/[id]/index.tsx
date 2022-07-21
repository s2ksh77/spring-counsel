import { NextPage } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import { MenuOutlined, EditOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import useSWR from 'swr';

interface NoticeResponse {
  ok: boolean;
  notice: Notice;
}

const NoticeDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<NoticeResponse>(
    router.query.id ? `/api/notice/${router.query?.id}` : null
  );

  const goBack = () => {
    router.push('/news/notice');
  };

  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">공지사항</div>

      <div className="w-full pt-8">
        <div className="flex w-full flex-row items-center">
          <div className="w-[50px] items-center">
            <label>제목</label>
          </div>
          <div className="w-full">
            <label className="text-lg font-bold">{data?.notice?.title}</label>
          </div>
        </div>
      </div>
      <div className="w-full pt-8">
        <div className="flex w-full flex-row items-center">
          <div className="w-[140px] items-center">
            <label>작성자 :</label>
          </div>
          <div className="w-full">
            <label>관리자</label>
          </div>
          <div className="w-[120px] items-center">
            <label>날짜 :</label>
          </div>
          <div className="w-full">
            <label>
              {data?.notice?.updatedAt.split('T')[0] +
                ' ' +
                data?.notice?.updatedAt.split('T')[1].slice(0, 5)}
            </label>
          </div>
        </div>
      </div>
      <div className="no-toolbar h-full pt-8">
        <Editor
          value={data?.notice?.content}
          apiKey="90655irb9nds5o8ycj2bpivk0v2y34e2oa6qta82nclxrnx3"
          init={{
            height: '100%',
            plugins:
              'autolink lists link image charmap preview anchor searchreplace visualblocks  fullscreen  insertdatetime media table help wordcount',
            toolbar:
              'undo redo | formatselect | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | link | insertImage insertfile | hr table codesample insertdatetime print',
            statusbar: false,
            menubar: false,
            setup(editor) {
              editor.setMode('readonly');
            },
          }}
        />
      </div>
      <div>
        <div className="float-right ml-auto flex pt-2">
          <Button onClick={goBack} className="mr-2 text-black">
            <MenuOutlined className="mr-1" />
            목록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;

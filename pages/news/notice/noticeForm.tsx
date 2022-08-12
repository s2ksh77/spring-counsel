import { NextPage } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import { MenuOutlined, EditOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import { Notice } from '@prisma/client';
import Uploader from '@components/Uploader';

interface NoticeProps {
  title: string;
  content: string;
  isPrimay: boolean;
}

interface NoticeResponse {
  ok: boolean;
  notice: Notice;
}

interface FileResponse {
  ok: boolean;
}

const NoticeForm: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [content, setContent] = useState('');
  const [checked, setChecked] = useState(false);
  const [createNotice, { data, loading }] = useMutation<NoticeResponse>('/api/notice');
  const editorRef = useRef<HTMLInputElement | null | any>(null);
  const [createUpload] = useMutation<FileResponse>('/api/upload');
  const [fileData, setFileData] = useState<any[]>([]);

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

  const onUploadClick = (type: string) => setUploadType(type);

  const pushObj = (obj: any) => {
    setFileData([...fileData, obj]);
  };

  const uploadFileMeta = (id: string) => {
    const imageList = editorRef?.current?.editor?.getBody()?.querySelectorAll('img');
    if (imageList && imageList.length > 0) {
      [...imageList].map((el) => {
        const fileId = el.getAttribute('id');
        const url = el.getAttribute('src');
        const name = el.getAttribute('data-name');
        createUpload({
          url,
          name,
          form: 'notice',
          id,
          fileId,
        });
      });
    }
    if (fileData && fileData.length > 0) {
      fileData?.map((el: any) => {
        createUpload({
          url: '',
          name: el.name,
          form: 'notice',
          id,
          fileId: el.id[0],
        });
      });
    }
  };

  useEffect(() => {
    if (data?.ok) {
      uploadFileMeta(data?.notice?.id);
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
        <div className="h-fit min-h-[500px] pt-8">
          <Editor
            ref={editorRef}
            apiKey="8p9h7icidtp8v7ebuiyjo96ymstju4oy95g1xi68gdhvejph"
            init={{
              height: '100%',
              min_height: 500,
              plugins:
                '  autolink   lists link image charmap preview anchor searchreplace visualblocks  fullscreen  insertdatetime media table help wordcount',
              toolbar:
                'undo redo | formatselect | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | link | insertImage insertfile | hr table codesample insertdatetime print',
              statusbar: false,
              menubar: false,
              setup(editor) {
                editor.ui.registry.addButton('insertImage', {
                  icon: 'image',
                  onAction() {
                    onUploadClick('image');
                  },
                });
                editor.ui.registry.addButton('insertFile', {
                  icon: 'upload',
                  onAction() {
                    onUploadClick('file');
                  },
                });
              },
            }}
            onEditorChange={handleEditorChange}
          />
          <Uploader
            type={uploadType}
            setType={setUploadType}
            editor={editorRef?.current}
            pushObj={pushObj}
          />
        </div>
        {fileData.length > 0 ? (
          <div className="my-4 flex w-full flex-row">
            <div className="flex min-w-[70px]">첨부파일 : </div>
            <div className="flex max-h-20 w-full flex-col overflow-y-auto">
              {fileData?.map((file) => (
                <>
                  <a
                    key={file.id}
                    className="ml-4 text-blue-400 hover:cursor-pointer hover:underline"
                  >
                    {file.name}
                  </a>
                </>
              ))}
            </div>
          </div>
        ) : null}
      </>
      <div>
        <div className="float-right ml-auto flex pt-2">
          <Button onClick={goBack} className="text-black-300 mr-2">
            <MenuOutlined className="mr-1" />
            목록
          </Button>
          <Button onClick={submitForm} className="text-black-300">
            <EditOutlined className="mr-1" />
            등록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoticeForm;

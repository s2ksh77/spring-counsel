import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Checkbox } from '@mui/material';
import { DoneOutlined, CancelOutlined } from '@mui/icons-material';
import useMutation from '@libs/client/useMutation';
import useSWR from 'swr';
import Uploader from '@components/Uploader';
import { useSession } from 'hooks/useSession';

interface ContentEditorProps {
  data: {
    id: string;
    title: string;
    content: string;
    isPrimary: boolean;
    files?: { id: string; name: string }[];
  };
  type?: 'notice' | 'review';
  onCancel: () => void;
}

const ContentEditor = ({ data, type, onCancel }: ContentEditorProps) => {
  const { isLogin } = useSession();
  let [title, setTitle] = useState<any | null>(data.title || '');
  let [content, setContent] = useState<any | null>(data.content || '');
  const [checked, setChecked] = useState<any | false>(data.isPrimary || false);
  const editorRef = useRef<HTMLInputElement | null | any>(null);
  const [fileData, setFileData] = useState<any[]>([]);
  const [uploadData, setUploadData] = useState<any[]>([]);
  const [uploadType, setUploadType] = useState('');

  const [editContent, { data: editData, loading }] = useMutation(`/api/${type}/${data.id}/edit`);
  const [createUpload] = useMutation<FileResponse>('/api/upload');

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

  const handleSave = async () => {
    if (loading) return;
    if (title === '') title = data?.title;
    if (content === '') content = data?.content;
    await editContent({
      title,
      content,
      isPrimary: checked,
    });
    if (uploadData.length > 0) {
      uploadData?.map((el: any) => {
        createUpload({
          url: '',
          name: el.name,
          form: type,
          id: data.id,
          fileId: el.id[0],
        });
      });
      setUploadData([]);
    }
  };

  const handleCancel = () => {
    onCancel(false);
  };

  const onUploadClick = (type: string) => setUploadType(type);

  const pushObj = (obj: any) => {
    setUploadData([...uploadData, obj]);
    setFileData([...fileData, obj]);
  };

  useEffect(() => {
    if (data) {
      setFileData(data.files);
    }
  }, [data]);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-8">
      <div className="w-full pt-8">
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
        <div className="flex w-full flex-row items-center">
          <div className="w-[50px] items-center">
            <label>제목</label>
          </div>
          <div className="flex w-full flex-row">
            <input
              value={title}
              onChange={handleChange}
              type="text"
              className="w-full appearance-none rounded-md  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a9ce8e] focus:outline-none focus:ring-[#a9ce8e]"
            />
            {isLogin && (
              <>
                <div className="flex">
                  <Button onClick={handleSave} style={{ color: 'black' }} className="mx-2 w-[73px]">
                    <DoneOutlined className="mr-1" />
                    저장
                  </Button>
                </div>
                <div className="flex">
                  <Button
                    onClick={handleCancel}
                    style={{ color: 'black' }}
                    className="mr-2 w-[73px]"
                  >
                    <CancelOutlined className="mr-1" />
                    취소
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="min-h h-fit min-h-[500px] pt-8">
        <Editor
          ref={editorRef}
          value={content}
          apiKey="8p9h7icidtp8v7ebuiyjo96ymstju4oy95g1xi68gdhvejph"
          init={{
            height: '100%',
            min_height: 500,
            plugins:
              'autoresize autolink lists link image charmap preview anchor searchreplace visualblocks  fullscreen  insertdatetime media table help wordcount',
            toolbar:
              'undo redo | formatselect | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | link | insertImage insertfile | hr table codesample insertdatetime print',
            statusbar: false,
            menubar: false,
            setup(editor) {
              editor.on('init', () => {
                // setEditor(editor);
                setTimeout(() => {
                  editor?.mode?.set('design');
                }, 100);
              });
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
        {fileData?.length > 0 ? (
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
      </div>
    </div>
  );
};

export default ContentEditor;

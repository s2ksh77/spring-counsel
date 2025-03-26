import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useSession } from 'hooks/useSession';
import { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

interface ContentProps {
  data: {
    title: string;
    content: string;
    updatedAt?: string;
    files?: { id: string; name: string }[];
  };
  onEdit: (state: boolean) => void;
  handleDialogOpen: () => void;
}

const Content = ({ data, onEdit, handleDialogOpen }: ContentProps) => {
  const { isLogin } = useSession();
  const [fileData, setFileData] = useState<any[]>([]);

  const handleEdit = () => {
    onEdit(true);
  };

  const handleDownload = async (id: string, name: string) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_UPLOAD_KEY,
      secretAccessKey: process.env.S3_UPLOAD_SECRET,
    });

    const bucketParams = {
      Bucket: 'spring-counsel',
      Key: `next-s3-uploads/${id}/${name}`,
    };

    s3.getObject(bucketParams, (s3Err, data: any) => {
      if (s3Err) throw s3Err;
      let blob = new Blob([data?.Body], { type: data.ContentType });
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = name;
      link.click();
    });
  };

  useEffect(() => {
    if (data) {
      setFileData(data.files ?? []);
    }
  }, [data]);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-8">
      <div className="w-full pt-8">
        <div className="flex w-full flex-row items-center">
          <>
            <div className="w-[50px] items-center">
              <label className="flex">제목</label>
            </div>
            <div className="w-full">
              <label className="text-lg font-bold">{data?.title}</label>
            </div>
            {isLogin && (
              <div className="flex flex-row">
                <>
                  <div className="flex">
                    <Button
                      onClick={handleEdit}
                      style={{ color: 'black' }}
                      className="mr-2 w-[73px]"
                    >
                      <EditOutlined className="mr-1" />
                      수정
                    </Button>
                  </div>
                  <div className="flex">
                    <Button
                      onClick={handleDialogOpen}
                      style={{ color: 'black' }}
                      className="mr-2 w-[73px]"
                    >
                      <DeleteOutlineOutlined className="mr-1" />
                      삭제
                    </Button>
                  </div>
                </>
              </div>
            )}
          </>
        </div>
      </div>
      <div className="w-full pt-8">
        <div className="flex w-full flex-row items-center">
          <div className="w-[140px] items-center ">
            <label>작성자 :</label>
          </div>
          <div className="w-full sm:w-[50%]">
            <label>관리자</label>
          </div>
          <div className="w-[120px] items-center">
            <label>날짜 :</label>
          </div>
          <div className="w-full">
            <label>
              {data?.updatedAt !== undefined
                ? data?.updatedAt.toString().split('T')[0] +
                  ' ' +
                  data?.updatedAt.toString().split('T')[1].slice(0, 5)
                : ''}
            </label>
          </div>
        </div>
      </div>
      <div className="no-toolbar h-fit min-h-[500px] pt-8">
        <Editor
          id="readEditor"
          value={data?.content}
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
                  editor?.mode?.set('readonly');
                }, 100);
                setTimeout(() => {
                  editor?.getBody().querySelector('.mce-shim')?.remove();
                }, 500);
              });
            },
            content_style: `.tinymce .mce-preview-object .mce-shim { display: none !important;} .timymce { overflow-y: scroll }`,
          }}
        />
      </div>
      {fileData?.length > 0 ? (
        <div className="my-4 flex w-full flex-row">
          <div className="flex min-w-[70px]">첨부파일 : </div>
          <div className="flex max-h-20 w-full flex-col overflow-y-auto">
            {fileData?.map(file => (
              <>
                <a
                  key={file.id}
                  className="ml-4 text-blue-400 hover:cursor-pointer hover:underline"
                  onClick={() => handleDownload(file.id, file.name)}
                >
                  {file.name}
                </a>
              </>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Content;

import { NextPage, NextPageContext } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import {
  MenuOutlined,
  EditOutlined,
  DeleteOutlineOutlined,
  DoneOutlined,
  CancelOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import useSWR from 'swr';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';
import { withSsrSession } from '@libs/server/withSession';
import { Notice, NoticeFile } from '@prisma/client';
import Uploader from '@components/Uploader';
import AWS from 'aws-sdk';

interface NoticeResponseWithFile extends Notice {
  files: NoticeFile[];
}

interface NoticeResponse {
  ok: boolean;
  notice: NoticeResponseWithFile;
}
interface FileResponse {
  ok: boolean;
}

const NoticeDetail: NextPage = () => {
  const router = useRouter();
  const [editor, setEditor] = useState(null);
  const [editState, setEditState] = useState(false);
  let [title, setTitle] = useState<any | null>('');
  let [content, setContent] = useState<any | null>('');
  const [checked, setChecked] = useState<any | false>(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const { data: loginData } = useSWR('/api/login');
  const [uploadType, setUploadType] = useState('');
  const editorRef = useRef<HTMLInputElement | null | any>(null);
  const [fileData, setFileData] = useState<any[]>([]);
  const [uploadData, setUploadData] = useState<any[]>([]);

  const [isLogin, setIsLogin] = useState<any | false>(false);

  const { data, mutate } = useSWR<NoticeResponse>(
    router.query.id ? `/api/notice/${router.query?.id}` : null
  );

  const [editNotice, { data: editData, loading }] = useMutation(
    `/api/notice/${router.query.id}/edit`
  );

  const [deleteNotice, { data: deleteData, loading: deleteLoading }] = useMutation(
    `/api/notice/${router.query.id}/delete`
  );

  const [createUpload] = useMutation<FileResponse>('/api/upload');

  const goBack = () => {
    router.push('/news/notice');
  };

  const handleEdit = () => {
    setEditState(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleEditorChange = (content: any) => {
    setContent(content);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };

  const handleSave = () => {
    if (loading) return;
    if (title === '') title = data?.notice?.title;
    if (content === '') content = data?.notice?.content;
    editNotice({
      title,
      content,
      isPrimary: checked,
    });
    if (uploadData.length > 0) {
      uploadData?.map((el: any) => {
        createUpload({
          url: '',
          name: el.name,
          form: 'notice',
          id: router.query?.id,
          fileId: el.id[0],
        });
      });
      setUploadData([]);
    }
  };

  const handleCancel = () => {
    setEditState(false);
  };

  const handleDialogOpen = () => {
    setDialogVisible(true);
  };

  const handleClose = () => {
    setDialogVisible(false);
  };

  const handleDelete = () => {
    if (deleteLoading) return;
    deleteNotice('');
    setDialogVisible(false);
  };

  const onUploadClick = (type: string) => setUploadType(type);

  const pushObj = (obj: any) => {
    setUploadData([...uploadData, obj]);
    setFileData([...fileData, obj]);
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
    if (data?.ok) {
      setTitle(data?.notice?.title);
      setChecked(data?.notice?.isPrimary);
      setContent(data?.notice?.content);
      setFileData(data?.notice?.files);
    }
  }, [data]);

  useEffect(() => {
    if (editData?.ok) {
      setEditState(false);
      mutate();
    }
  }, [editData, mutate]);

  useEffect(() => {
    if (deleteData?.ok) {
      router.push('/news/notice');
    }
  }, [deleteData, mutate]);

  useEffect(() => {
    if (loginData?.ok) {
      setIsLogin(loginData?.ok);
    }
  }, [loginData]);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">공지사항</div>

      {!editState ? (
        <>
          <div className="w-full pt-8">
            <div className="flex w-full flex-row items-center">
              <div className="w-[50px] items-center">
                <label className="flex">제목</label>
              </div>
              <div className="w-full">
                <label className="text-lg font-bold">{data?.notice?.title}</label>
              </div>
              {isLogin && !editState ? (
                <div className="flex flex-row">
                  <>
                    <div className="flex">
                      <Button onClick={handleEdit} className="text-black-300 mr-2 w-[73px]">
                        <EditOutlined className="mr-1" />
                        수정
                      </Button>
                    </div>
                    <div className="flex">
                      <Button onClick={handleDialogOpen} className="text-black-300 mr-2 w-[73px]">
                        <DeleteOutlineOutlined className="mr-1" />
                        삭제
                      </Button>
                    </div>
                  </>
                </div>
              ) : null}
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
                  {data?.notice?.updatedAt.toString().split('T')[0] +
                    ' ' +
                    data?.notice?.updatedAt.toString().split('T')[1].slice(0, 5)}
                </label>
              </div>
            </div>
          </div>
          <div className="no-toolbar h-fit min-h-[500px] pt-8">
            <Editor
              id="readEditor"
              value={data?.notice?.content}
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
                  });
                },
              }}
            />
          </div>
          {fileData?.length > 0 ? (
            <div className="my-4 flex w-full flex-row">
              <div className="flex min-w-[70px]">첨부파일 : </div>
              <div className="flex max-h-20 w-full flex-col overflow-y-auto">
                {fileData?.map((file) => (
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
        </>
      ) : (
        <>
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
                {isLogin && editState ? (
                  <>
                    <div className="flex">
                      <Button onClick={handleSave} className="text-black-300 mx-2 w-[73px]">
                        <DoneOutlined className="mr-1" />
                        저장
                      </Button>
                    </div>
                    <div className="flex">
                      <Button onClick={handleCancel} className="text-black-300 mr-2 w-[73px]">
                        <CancelOutlined className="mr-1" />
                        취소
                      </Button>
                    </div>
                  </>
                ) : null}
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
        </>
      )}

      <div className="flex justify-between">
        <div className="float-right ml-auto flex pt-2">
          <Button onClick={goBack} className="text-black-300 mr-2">
            <MenuOutlined className="mr-1" />
            목록
          </Button>
        </div>
      </div>
      <Dialog
        open={dialogVisible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'공지사항 삭제'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            게시글을 삭제 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleDelete} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NoticeDetail;

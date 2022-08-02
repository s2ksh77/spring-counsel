import { NextPage, NextPageContext } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
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
import { Review } from '@prisma/client';

interface ReviewResponse {
  ok: boolean;
  review: Review;
}

const ReviewDetail: NextPage<{ isLogin: boolean }> = ({ isLogin }) => {
  const router = useRouter();
  const [editor, setEditor] = useState(null);
  const [editState, setEditState] = useState(false);
  let [title, setTitle] = useState<any | null>('');
  let [content, setContent] = useState<any | null>('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const { data, mutate } = useSWR<ReviewResponse>(
    router.query.id ? `/api/review/${router.query?.id}` : null
  );

  const [editReview, { data: editData, loading }] = useMutation(
    `/api/review/${router.query.id}/edit`
  );

  const [deleteReview, { data: deleteData, loading: deleteLoading }] = useMutation(
    `/api/review/${router.query.id}/delete`
  );

  const goBack = () => {
    router.push('/news/review');
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

  const handleSave = () => {
    if (loading) return;
    if (title === '') title = data?.review?.title;
    if (content === '') content = data?.review?.content;
    editReview({
      title,
      content,
    });
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
    deleteReview('');
    setDialogVisible(false);
  };

  useEffect(() => {
    if (data?.ok) {
      setTitle(data?.review?.title);
      setContent(data?.review?.content);
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
      router.push('/news/review');
    }
  }, [deleteData, mutate]);

  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">상담후기</div>

      {!editState ? (
        <>
          <div className="w-full pt-8">
            <div className="flex w-full flex-row items-center">
              <div className="w-[50px] items-center">
                <label>제목</label>
              </div>
              <div className="w-full">
                <label className="text-lg font-bold">{data?.review?.title}</label>
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
                  {data?.review?.updatedAt.toString().split('T')[0] +
                    ' ' +
                    data?.review?.updatedAt.toString().split('T')[1].slice(0, 5)}
                </label>
              </div>
            </div>
          </div>
          <div className="no-toolbar h-full pt-8">
            <Editor
              value={data?.review?.content}
              apiKey="8p9h7icidtp8v7ebuiyjo96ymstju4oy95g1xi68gdhvejph"
              init={{
                height: '100%',
                plugins:
                  'autolink lists link image charmap preview anchor searchreplace visualblocks  fullscreen  insertdatetime media table help wordcount',
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
        </>
      ) : (
        <>
          <div className="w-full pt-8">
            <div className="flex w-full flex-row items-center">
              <div className="w-[50px] items-center">
                <label>제목</label>
              </div>
              <div className="w-full">
                <input
                  value={title}
                  onChange={handleChange}
                  type="text"
                  className="w-full appearance-none rounded-md  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a9ce8e] focus:outline-none focus:ring-[#a9ce8e]"
                />
              </div>
            </div>
          </div>
          <div className="h-full pt-8">
            <Editor
              value={content}
              apiKey="8p9h7icidtp8v7ebuiyjo96ymstju4oy95g1xi68gdhvejph"
              init={{
                height: '100%',
                plugins:
                  'autolink lists link image charmap preview anchor searchreplace visualblocks  fullscreen  insertdatetime media table help wordcount',
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
                },
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        {isLogin ? (
          <div className="flex flex-row">
            {!editState ? (
              <>
                <div className="flex pt-2">
                  <Button onClick={handleEdit} className="mr-2 text-black">
                    <EditOutlined className="mr-1" />
                    수정
                  </Button>
                </div>
                <div className="flex pt-2">
                  <Button onClick={handleDialogOpen} className="mr-2 text-black">
                    <DeleteOutlineOutlined className="mr-1" />
                    삭제
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex pt-2">
                  <Button onClick={handleSave} className="mr-2 text-black">
                    <DoneOutlined className="mr-1" />
                    저장
                  </Button>
                </div>
                <div className="flex pt-2">
                  <Button onClick={handleCancel} className="mr-2 text-black">
                    <CancelOutlined className="mr-1" />
                    취소
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : null}
        <div className="float-right ml-auto flex pt-2">
          <Button onClick={goBack} className="mr-2 text-black">
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
        <DialogTitle id="alert-dialog-title">{'상담후기 삭제'}</DialogTitle>
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

export const getServerSideProps = withSsrSession(async function ({ req }: NextPageContext) {
  return {
    props: {
      isLogin: req?.session?.user?.id ? true : false,
    },
  };
});

export default ReviewDetail;
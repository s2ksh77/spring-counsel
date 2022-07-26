import { NextPage } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { Button, Checkbox, MenuItem, Select } from '@mui/material';
import {
  MenuOutlined,
  EditOutlined,
  DeleteOutlineOutlined,
  DoneOutlined,
  CancelOutlined,
  PendingActions,
  AccessTime,
  CheckCircleOutline,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import useSWR from 'swr';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';
import useLogin from '@libs/client/useLogin';
import { withSsrSession } from '@libs/server/withSession';
import { Reservation } from '@prisma/client';
import { phoneFomatter } from 'utils/common';

interface ReservationResponse {
  ok: boolean;
  reservation: Reservation;
}

const ReservationDetail: NextPage<{ isLogin: boolean }> = ({ isLogin }) => {
  const router = useRouter();
  const [editor, setEditor] = useState(null);
  const [editState, setEditState] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const [checked, setChecked] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [item, setItem] = useState('');

  const { data, mutate } = useSWR<ReservationResponse>(
    router.query.id ? `/api/proposal/${router.query?.id}` : null
  );

  const [editProposal, { data: editData, loading }] = useMutation(
    `/api/proposal/${router.query.id}/edit`
  );

  const [deleteNotice, { data: deleteData, loading: deleteLoading }] = useMutation(
    `/api/notice/${router.query.id}/delete`
  );

  const goBack = () => {
    router.push('/proposal/list');
  };

  const handleUpdate = () => {
    if (loading) return;
    if (data?.reservation?.status === item) return;
    editProposal({
      status: item,
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
    deleteNotice();
    setDialogVisible(false);
  };

  useEffect(() => {
    if (data?.ok) {
      if (data?.reservation?.status === 'pending') setItem('ready');
      else if (data?.reservation?.status === 'ready') setItem('pending');
      else setItem('pending');
    }
  }, [data]);

  const getStatus = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span>
            <PendingActions className="mr-1 text-red-500" />
            접수 중
          </span>
        );
      case 'ready':
        return (
          <span>
            <AccessTime className="mr-1 text-orange-500" />
            대기
          </span>
        );
      case 'done':
        return (
          <span>
            <CheckCircleOutline className="mr-1 text-green-500" />
            예약완료
          </span>
        );
      default:
        return;
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setItem(value);
  };

  const getSelectBox = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Select value={item} onChange={handleChange}>
            <MenuItem value="ready">대기</MenuItem>
            <MenuItem value="done">예약완료</MenuItem>
          </Select>
        );
      case 'ready':
        return (
          <Select value={item} onChange={handleChange}>
            <MenuItem value="pending">접수 중</MenuItem>
            <MenuItem value="done">예약완료</MenuItem>
          </Select>
        );
      case 'done':
        return (
          <Select value={item} onChange={handleChange}>
            <MenuItem value="pending">접수 중</MenuItem>
            <MenuItem value="ready">대기</MenuItem>
          </Select>
        );
    }
  };

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

  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">신청 내역</div>
      <>
        <div className="float-right mt-4 ml-auto flex items-center">
          <div className="mr-2 border-[1px] p-4">
            <label className="mr-2">{getStatus(data?.reservation?.status)}</label>
          </div>
          {getSelectBox(data?.reservation?.status)}
          <Button onClick={handleUpdate} className="mr-2 text-black">
            변경
          </Button>
        </div>
        <div className="flex w-full flex-row pt-8">
          <div className="flex flex-row items-center">
            <div className="w-[100px] items-center">
              <label>신청자</label>
            </div>
            <label className="w-[100px] text-lg font-bold">{data?.reservation?.name}</label>
          </div>
          <div className="flex flex-row items-center">
            <div className="w-[100px] items-center">
              <label>신청 날짜</label>
            </div>
            <label className="w-[150px] text-lg font-bold">
              {data?.reservation?.createdAt.split('T')[0]?.replaceAll('-', '.')}
            </label>
          </div>

          <div className="flex w-full flex-row items-center">
            <div className="w-[150px] items-center">
              <label>연락처</label>
            </div>
            <div className="w-full">
              <label className="text-lg font-bold">
                {phoneFomatter('0' + data?.reservation?.phone)}
              </label>
            </div>
          </div>
        </div>
        <div className="no-toolbar h-full pt-8">
          <Editor
            value={data?.reservation?.content}
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
                editor.on('init', () => {
                  // setEditor(editor);
                  editor?.mode?.set('readonly');
                });
              },
            }}
          />
        </div>
      </>

      <div className="flex justify-between">
        <div className="float-right ml-auto flex pt-2">
          <Button onClick={handleDialogOpen} className="mr-2 text-black">
            <DeleteOutlineOutlined className="mr-1" />
            삭제
          </Button>
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

export const getServerSideProps = withSsrSession(async function ({ req }: NextPageContext) {
  return {
    props: {
      isLogin: req?.session?.user?.id ? true : false,
    },
  };
});

export default ReservationDetail;
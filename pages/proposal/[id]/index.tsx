import { NextPage, NextPageContext } from 'next';
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
import { withSsrSession } from '@libs/server/withSession';
import { Reservation, ReservationFile } from '@prisma/client';
import { phoneFomatter } from 'utils/common';
import AWS from 'aws-sdk';

interface ReservationResponseWithFile extends Reservation {
  files: ReservationFile[];
}
interface ReservationResponse {
  ok: boolean;
  reservation: ReservationResponseWithFile;
}

const ReservationDetail: NextPage = () => {
  const router = useRouter();
  const [editor, setEditor] = useState(null);
  const [editState, setEditState] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const [checked, setChecked] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [item, setItem] = useState('');
  const [fileData, setFileData] = useState<any[]>([]);

  const { data, mutate } = useSWR<ReservationResponse>(
    router.query.id ? `/api/proposal/${router.query?.id}` : null
  );

  const [editProposal, { data: editData, loading }] = useMutation(
    `/api/proposal/${router.query.id}/edit`
  );

  const [deleteNotice, { data: deleteData, loading: deleteLoading }] = useMutation(
    `/api/proposal/${router.query.id}/delete`
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
    deleteNotice('');
    setDialogVisible(false);
    router.push('/proposal/list');
  };

  useEffect(() => {
    if (data?.ok) {
      if (data?.reservation?.status === 'pending') setItem('ready');
      else if (data?.reservation?.status === 'ready') setItem('pending');
      else setItem('pending');
      setFileData(data?.reservation?.files);
    }
  }, [data]);

  const getStatus = (status: any) => {
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

  const handleChange = (event: any) => {
    const { value } = event.target;
    setItem(value);
  };

  const getSelectBox = (status: any) => {
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
    if (editData?.ok) {
      setEditState(false);
      mutate();
      goBack();
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
          <Button onClick={handleUpdate} className="text-black-300 mr-2">
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
              {data?.reservation?.createdAt.toString().split('T')[0]?.replaceAll('-', '.')}
            </label>
          </div>

          <div className="flex w-full flex-row items-center">
            <div className="w-[150px] items-center">
              <label>연락처</label>
            </div>
            <div className="w-full">
              <label className="text-lg font-bold">
                {phoneFomatter('0' + data?.reservation?.phone, '')}
              </label>
            </div>
          </div>
        </div>
        <div className="no-toolbar h-fit min-h-[500px] pt-8">
          <Editor
            value={data?.reservation?.content}
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
              {data?.reservation?.files?.map((file) => (
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

      <div className="flex justify-between">
        <div className="float-right ml-auto flex pt-2">
          <Button onClick={handleDialogOpen} className="text-black-300 mr-2">
            <DeleteOutlineOutlined className="mr-1" />
            삭제
          </Button>
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
        className="w-50"
      >
        <DialogTitle id="alert-dialog-title">{'상담신청 삭제'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            해당 상담 신청 내역을 삭제 하시겠습니까?
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

export default ReservationDetail;

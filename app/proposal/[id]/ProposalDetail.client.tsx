'use client';
import { NextPage } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import { MenuOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import useMutation from '@libs/client/useMutation';
import useSWR from 'swr';
import { phoneFomatter } from 'utils/common';
import AWS from 'aws-sdk';
import { statusIcons } from '../list/ProposalList.client';
import Dialog from '@components/Content/Dialog';
import { Reservation, ReservationFile } from '@prisma/client';

const statusOptions = {
  pending: [
    { value: 'ready', label: '대기' },
    { value: 'done', label: '예약완료' },
  ],
  ready: [
    { value: 'pending', label: '접수 중' },
    { value: 'done', label: '예약완료' },
  ],
  done: [
    { value: 'pending', label: '접수 중' },
    { value: 'ready', label: '대기' },
  ],
};
interface ProposalDetailClientProps {
  id: string;
  data: Reservation & { files: ReservationFile[] };
}

const ProposalDetail = ({ data, id }: ProposalDetailClientProps) => {
  const router = useRouter();
  const [editor, setEditor] = useState(null);
  const [editState, setEditState] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const [checked, setChecked] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [item, setItem] = useState('');
  const [fileData, setFileData] = useState<any[]>([]);

  const { mutate } = useSWR(id ? `/api/proposal/${id}` : null);

  const [editProposal, { data: editData, loading }] = useMutation(
    `/api/proposal/${id}/edit`,
    'PUT',
  );

  const goBack = () => {
    router.push('/proposal/list');
  };

  const handleUpdate = () => {
    if (loading) return;
    if (data?.status === item) return;
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

  useEffect(() => {
    if (data?.status === 'pending') setItem('ready');
    else if (data?.status === 'ready') setItem('pending');
    else setItem('pending');
    setFileData(data?.files);
  }, [data]);

  const getStatus = (status: string) => {
    const statusData = statusIcons[status];
    return statusData ? (
      <span>
        {statusData.icon}
        {statusData.label}
      </span>
    ) : null;
  };

  const handleChange = (event: any) => {
    const { value } = event.target;
    setItem(value);
  };

  const getSelectBox = (status: string) => {
    return (
      <Select value={item} onChange={handleChange}>
        {statusOptions[status]?.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    );
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

  return (
    <div className="flex h-full w-full flex-col p-8 pt-4">
      <div className="border-b-2 pb-8 text-3xl font-bold">신청 내역</div>
      <>
        <div className="float-right ml-auto mt-4 flex items-center">
          <div className="mr-2 border-[1px] p-4">
            <label className="mr-2">{getStatus(data?.status)}</label>
          </div>
          {getSelectBox(data?.status)}
          <Button
            onClick={handleUpdate}
            style={{ color: 'black' }}
            className="mr-2"
          >
            변경
          </Button>
        </div>
        <div className="flex w-full flex-row pt-8">
          <div className="flex flex-row items-center">
            <div className="w-[100px] items-center">
              <label>신청자</label>
            </div>
            <label className="w-[100px] text-lg font-bold">{data?.name}</label>
          </div>
          <div className="flex flex-row items-center">
            <div className="w-[100px] items-center">
              <label>신청 날짜</label>
            </div>
            <label className="w-[150px] text-lg font-bold">
              {data?.createdAt.toString().split('T')[0]?.replaceAll('-', '.')}
            </label>
          </div>

          <div className="flex w-full flex-row items-center">
            <div className="w-[150px] items-center">
              <label>연락처</label>
            </div>
            <div className="w-full">
              <label className="text-lg font-bold">
                {phoneFomatter('0' + data?.phone, '')}
              </label>
            </div>
          </div>
        </div>
        <div className="no-toolbar h-fit min-h-[500px] pt-8">
          <Editor
            value={data?.content}
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
                  setTimeout(() => {
                    editor?.getBody().querySelector('.mce-shim')?.remove();
                  }, 500);
                });
              },
            }}
          />
        </div>
        {fileData?.length > 0 ? (
          <div className="my-4 flex w-full flex-row">
            <div className="flex min-w-[70px]">첨부파일 : </div>
            <div className="flex max-h-20 w-full flex-col overflow-y-auto">
              {data?.files?.map(file => (
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
          <Button
            onClick={handleDialogOpen}
            style={{ color: 'black' }}
            className="mr-2"
          >
            <DeleteOutlineOutlined className="mr-1" />
            삭제
          </Button>
          <Button onClick={goBack} style={{ color: 'black' }} className="mr-2">
            <MenuOutlined className="mr-1" />
            목록
          </Button>
        </div>
      </div>
      <Dialog
        open={dialogVisible}
        type={'proposal'}
        onClose={handleClose}
        id={id}
      />
    </div>
  );
};

export default ProposalDetail;

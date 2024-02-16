'use client';
import { NextPage } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import useMutation from '@libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { Reservation } from '@prisma/client';
import Uploader from '@components/Uploader';

interface ResvFormData {
  name: string;
  email?: string;
  phone: number;
}

interface ResvResponse {
  ok: boolean;
  reservation: Reservation;
}

interface FileResponse {
  ok: boolean;
}

const ReservationForm: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ResvFormData>();
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');
  const [createReservation, { data, loading }] = useMutation<ResvResponse>('/api/proposal');
  const [uploadType, setUploadType] = useState('');
  const editorRef = useRef<HTMLInputElement | null | any>(null);
  const [createUpload] = useMutation<FileResponse>('/api/upload');

  const handleEditorChange = (content: any) => {
    setContent(content);
  };

  const goBack = () => {
    router.push('/proposal');
  };

  const onValid = (form: ResvFormData) => {
    if (loading) return;
    if (phone === '') {
      alert('핸드폰 번호를 입력 해주세요.');
      return;
    }
    if (content === '') {
      alert('상담내용을 입력 해주세요.');
      return;
    }
    form.phone = +phone.replace(/\-/g, '');
    createReservation({
      ...form,
      content,
    });
  };

  const handleChange = (e: any) => {
    const regex = /^[0-9\b -]{0,13}$/;
    let { value } = e.target;
    if (regex.test(value)) {
      setPhone(value);
    }
  };

  const onUploadClick = (type: string) => setUploadType(type);

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
          form: 'reservation',
          id,
          fileId,
        });
      });
    }
  };

  useEffect(() => {
    if (data?.ok) {
      uploadFileMeta(data?.reservation?.id);
      alert('상담 신청이 접수 되었습니다.');
      router.push('/proposal');
    }
  }, [data]);

  useEffect(() => {
    setPhone(
      phone
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, '')
    );
  }, [phone]);

  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">상담신청</div>

      <>
        <div className="w-full pt-8">
          <div className="float-right mb-4 ml-auto flex">
            <label className="mr-[5px] text-red-500">* </label>
            <label> : 필수항목 입니다.</label>
          </div>
          <form>
            <div className="mb-[15px] flex w-full flex-row items-center">
              <div className="w-[150px] items-center">
                <label>이름</label>
                <label className="text-red-500">*</label>
              </div>
              <div className="w-full">
                <input
                  {...register('name', { required: true })}
                  type="text"
                  className="regist-form border-gray-300 "
                />
              </div>
            </div>
            <div className="mb-[15px] flex w-full flex-row items-center">
              <div className="w-[150px] items-center">
                <label>이메일 주소</label>
              </div>
              <div className="w-full">
                <input
                  {...register('email')}
                  type="email"
                  className="regist-form border-gray-300 "
                />
              </div>
            </div>
            <div className="flex w-full flex-row items-center">
              <div className="w-[150px] items-center">
                <label>핸드폰</label>
                <label className="text-red-500">*</label>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  onChange={handleChange}
                  value={phone}
                  className="regist-form border-gray-300 "
                  placeholder="010부터 입력해주세요."
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div className="h-fit min-h-[500px] pt-8">
          <Editor
            ref={editorRef}
            apiKey="8p9h7icidtp8v7ebuiyjo96ymstju4oy95g1xi68gdhvejph"
            init={{
              height: '100%',
              min_height: 500,
              plugins:
                'autolink lists link image charmap preview anchor searchreplace visualblocks  fullscreen  insertdatetime media table help wordcount',
              toolbar:
                'undo redo | formatselect | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | insertImage | hr table codesample insertdatetime',
              statusbar: false,
              menubar: false,
              placeholder: '상담받고 싶은 내용을 적어주세요.',
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
          <Uploader type={uploadType} setType={setUploadType} editor={editorRef?.current} />
        </div>
      </>
      <div>
        <div className="float-right ml-auto flex pt-2">
          <Button onClick={handleSubmit(onValid)} style={{ color: 'black' }}>
            <EditOutlined className="mr-1" />
            신청
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;

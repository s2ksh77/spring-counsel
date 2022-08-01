import { NextPage } from 'next';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import { MenuOutlined, EditOutlined, CancelOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { Reservation } from '@prisma/client';

interface NoticeProps {
  title: string;
  content: string;
  isPrimay: boolean;
}

interface ResvFormData {
  name: string;
  email?: string;
  phone: number;
}

interface ResvResponse {
  ok: boolean;
  reservation: Reservation;
}

const ReservationForm: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ResvFormData>();
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');
  const [createReservation, { data, loading }] = useMutation<ResvResponse>('/api/proposal');

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

  useEffect(() => {
    if (data?.ok) {
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
          <div className="float-right ml-auto mb-4 flex">
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
                  className="w-full appearance-none rounded-md  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a9ce8e] focus:outline-none focus:ring-[#a9ce8e]"
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
                  className="w-full appearance-none rounded-md  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a9ce8e] focus:outline-none focus:ring-[#a9ce8e]"
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
                  className="w-full appearance-none rounded-md  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a9ce8e] focus:outline-none focus:ring-[#a9ce8e]"
                  placeholder="010부터 입력해주세요."
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div className="h-full pt-8">
          <Editor
            apiKey="8p9h7icidtp8v7ebuiyjo96ymstju4oy95g1xi68gdhvejph"
            init={{
              height: '100%',
              plugins:
                'autolink lists link image charmap preview anchor searchreplace visualblocks  fullscreen  insertdatetime media table help wordcount',
              toolbar:
                'undo redo | formatselect | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | link | hr table codesample insertdatetime',
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
              },
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </>
      <div>
        <div className="float-right ml-auto flex pt-2">
          <Button onClick={handleSubmit(onValid)} className="text-black">
            <EditOutlined className="mr-1" />
            신청
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;

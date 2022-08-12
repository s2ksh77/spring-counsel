/* eslint-disable jsx-a11y/click-events-have-key-events */
import useMutation from '@libs/client/useMutation';
import { useS3Upload } from 'next-s3-upload';
import React, { SetStateAction, useEffect, useRef } from 'react';

interface UploaderProp {
  type: string;
  setType: React.Dispatch<SetStateAction<string>>;
  editor: any;
  pushObj?: any;
}

const Uploader: React.FC<UploaderProp> = ({ type, setType, editor, pushObj }) => {
  const uploadRef = useRef<any>(null);
  const { uploadToS3 } = useS3Upload();

  const getType = () => {
    return type === 'image' ? 'image/*, video/*' : 'file';
  };

  const handleClick = () => {
    if (type && uploadRef && uploadRef?.current) uploadRef?.current?.click();
    setType('');
  };

  const handleChange = (e: any) => {
    const { files } = e.target;

    const totalSize = 20000000000; // 20GB
    const uploadSize = [...files].reduce((accumulator, current) => accumulator + current.size, 0);

    if (uploadSize > totalSize) {
      alert('파일 첨부는 한 번에 최대 20GB까지 가능합니다.');
      return;
    }

    Promise.all(
      [...files]?.map(async (file) => {
        const { url, key, bucket } = await uploadToS3(file);
        const { fileExtension } = getFileInfo(file);
        const imageType = isImage(fileExtension);

        const id = key.match(/(?<=next-s3-uploads\/)[a-zA-Z0-9_.-]*/i);

        if (imageType) {
          return editor?.editor?.execCommand(
            'mceInsertContent',
            false,
            '<img id="' +
              id +
              '" src="' +
              url +
              '" data-name="' +
              file.name +
              '"crossorigin="' +
              '*' +
              '"/>'
          );
        } else {
          pushObj({
            id,
            name: file.name,
          });
        }
      })
    );
  };

  const isImage = (ext: string) => {
    let ImageExt = ['jpg', 'gif', 'jpeg', 'jfif', 'tiff', 'bmp', 'bpg', 'png'];
    return ImageExt.includes(ext.toLowerCase());
  };

  const getFileInfo = (file: any) => {
    const lastDotIdx = file.name.lastIndexOf('.');
    return {
      fileName: lastDotIdx < 0 ? file.name : file.name.slice(0, lastDotIdx),
      fileExtension: lastDotIdx < 0 ? '' : file.name.slice(lastDotIdx + 1).toLowerCase(),
      fileSize: fileSizeStr(file.size),
    };
  };

  const fileSizeStr = (size: any) => {
    const prefix = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let idx = 0;
    const sizeToNumber = Number(size);
    let fileSize = !Number.isNaN(sizeToNumber) ? sizeToNumber : 0;
    while (fileSize >= 1024 && idx < prefix.length - 1) {
      fileSize /= 1024.0;
      idx += 1;
    }

    return `${fileSize ? fileSize.toFixed(1) : fileSize}${idx ? `${prefix[idx]}B` : 'Bytes'}`;
  };

  useEffect(() => {
    handleClick();
  }, [type]);

  return (
    <label style={{ display: 'none' }} ref={uploadRef} onClick={handleClick} htmlFor="input-file">
      <input accept={getType()} multiple type="file" id="input-file" onChange={handleChange} />
    </label>
  );
};

export default Uploader;

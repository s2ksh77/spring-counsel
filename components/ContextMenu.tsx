import { MenuOutlined } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { cls } from 'utils/common';

const ContextMenu: NextPage = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const open = Boolean(anchorEl);

  const menuItem = [
    {
      label: '센터 소개',
      children: null,
      onClick: () => {
        router.push('/introduce');
        handleClose();
      },
    },
    {
      label: '상담 및 심리검사 서비스',
      children: null,
      onClick: () => {
        router.push('/counsel/private');
        handleClose();
      },
    },
    {
      label: '교육서비스',
      children: null,
      onClick: () => {
        router.push('/education/counselor');
        handleClose();
      },
    },
    {
      label: '상담문의 및 신청',
      children: null,
      onClick: () => {
        router.push('/proposal');
        handleClose();
      },
    },
    {
      label: '센터 소식',
      children: null,
      onClick: () => {
        router.push('/news/notice');
        handleClose();
      },
    },
  ];

  const handleContextMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="mt-4 hidden items-center justify-end sm:flex md:flex md:h-full">
        <IconButton
          onClick={handleContextMenu}
          className="h-[30px] w-[30px] text-black md:h-[50px] md:w-[50px]"
          color="primary"
        >
          <MenuOutlined className="text-black md:h-[36px] md:w-[36px]" />
        </IconButton>
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItem?.map((item, idx) => {
          return (
            <MenuItem key={idx} onClick={item.onClick}>
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ContextMenu;

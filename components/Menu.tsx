import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getMenu } from 'utils/common';

const Menu: NextPage = ({ key }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('key', key);
    console.log(getMenu(key));
  }, [key]);

  return (
    <ul>
      {data?.map((menu) => (
        <li key={menu.key}>{menu.value}</li>
      ))}
    </ul>
  );
};

export default Menu;

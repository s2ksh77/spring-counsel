import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMenu } from 'utils/common';

const Menu: NextPage = ({ menu, title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (menu) setData(getMenu(menu));
  }, [menu]);

  return (
    <div className="mt-14 flex w-[350px] min-w-[350px] flex-col px-8">
      <div className="h-28 border-[1px] p-[24px]">
        <h4 className="text-xl font-bold">{title}</h4>
      </div>
      <ul className="flex max-h-[300px] w-[100%] flex-col  text-gray-800">
        {data?.map((arr) => (
          <Link key={arr.key} href={`/${menu}${arr.value}`}>
            <li className="block h-[60px] items-center justify-center border-[1px] py-[12px] px-[24px] hover:cursor-pointer hover:bg-[#a9ce8e] hover:text-white">
              <a>{arr.name}</a>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Menu;

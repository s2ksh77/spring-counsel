import { NextPage } from 'next';
import Link from 'next/link';
import { SetStateAction, useEffect, useState } from 'react';
import { getMenu } from 'utils/common';

interface DataType {
  title: string;
  value: ValueType[];
}

interface ValueType {
  key: string;
  name: string;
  value: string;
}

interface DataState {
  data: DataType;
  setData: React.Dispatch<SetStateAction<DataType>>;
}

const Menu: NextPage<{ menu: string }> = ({ menu }) => {
  const [data, setData] = useState<
    { title: string; value: ValueType[] } | { title: ''; value: [] }
  >({ title: '', value: [] });

  useEffect(() => {
    if (menu) {
      const result = getMenu(menu) || { title: '', value: [] };
      setData(result);
    }
  }, [menu]);

  return (
    <div className="mt-14 flex w-[350px] min-w-[350px] flex-col px-8">
      <div className="h-28 border-[1px] p-[24px]">
        <h4 className="text-xl font-bold">{data?.title}</h4>
      </div>
      <ul className="flex max-h-[300px] w-[100%] flex-col text-gray-800">
        {data?.value?.map((arr) => (
          <Link key={arr?.key} href={`/${menu}${arr.value}`}>
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

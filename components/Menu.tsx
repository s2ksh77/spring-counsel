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
    <div className="flex">
      <div className="mb-4 hidden w-full flex-col px-8 sm:flex md:flex">
        <ul className="flex max-h-[300px] w-[100%] flex-row gap-4 text-gray-800">
          {data?.value?.map(arr => (
            <Link
              key={arr?.key}
              href={`/${menu}${arr.value}`}
              className="w-[100%] border-[1px] p-4 text-center"
            >
              <li>{arr.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;

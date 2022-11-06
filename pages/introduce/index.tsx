import { NextPage } from 'next';
import centerIntroduce from '../../assets/center_introduce.png';

const Introduce: NextPage = () => {
  return (
    <div className="flex h-full overflow-y-auto">
      <img src={centerIntroduce.src} width="100%" />
    </div>
  );
};

export default Introduce;

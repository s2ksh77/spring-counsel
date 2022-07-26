interface DataType {
  title: string;
  value: ValueType[];
}

interface ValueType {
  key: string;
  name: string;
  value: string;
}

export const getMenu = (key: string) => {
  switch (key) {
    case 'introduce':
      return {
        title: '센터 소개',
        value: [
          { key: 'center', name: '센터 소개', value: '' },
          { key: 'member', name: '센터 구성원 소개', value: '/member' },
          { key: 'location', name: '찾아 오시는 길', value: '/location' },
        ],
      };
      break;
    case 'counsel':
      return {
        title: '상담 및 심리검사 서비스',
        value: [
          { key: 'private', name: '개인상담', value: '/private' },
          { key: 'family', name: '커플·부부상담', value: '/family' },
          { key: 'group', name: '집단상담', value: '/group' },
          { key: 'test', name: '심리검사', value: '/counseltest' },
        ],
      };
      break;
    case 'education':
      return {
        title: '교육 서비스',
        value: [
          { key: 'counselor', name: '상담자 교육', value: '/counselor' },
          { key: 'analysis', name: '교육분석', value: '/analysis' },
        ],
      };
      break;
    case 'proposal':
      return {
        title: '상담문의 및 신청',
        value: [
          { key: 'introduce', name: '상담신청 안내', value: '' },
          { key: 'proposal', name: '상담신청', value: '/reservationForm' },
        ],
      };
      break;
    case 'news':
      return {
        title: '센터 소식',
        value: [
          { key: 'notice', name: '공지사항', value: '/notice' },
          { key: 'review', name: '상담후기', value: '/review' },
        ],
      };
      break;
  }
};

export function phoneFomatter(num: any, type: any) {
  var formatNum = '';

  if (num.length == 11) {
    formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (num.length == 8) {
    formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
  } else {
    if (num.indexOf('02') == 0) {
      if (type == 0) {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
      } else {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
      }
    } else {
      if (type == 0) {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
      } else {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
    }
  }

  return formatNum;
}

export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

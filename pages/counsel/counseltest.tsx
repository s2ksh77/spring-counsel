import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NextPage } from 'next';

const CounselTest: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">심리검사</div>
      <span>
        <div className="mb-20 mt-8">
          <div className="mb-8">
            <span className="text-xl font-bold">정서</span>
          </div>
          <TableContainer className="min-h-[85%]">
            <Table stickyHeader className="">
              <TableHead className="sticky">
                <TableRow>
                  <TableCell className="w-24 text-center">검사 종류</TableCell>
                  <TableCell className="W-48 text-center">내용</TableCell>
                  <TableCell className="w-12 text-center">소요시간</TableCell>
                  <TableCell className="w-12 text-center">비용</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="">
                <TableRow className="hover:cursor-pointer hover:bg-[#eeeeee]">
                  <TableCell className="h-[70px] w-24 text-center">
                    다면적 인성검사 (MMPI-2)
                  </TableCell>
                  <TableCell className="h-[70px]  w-48 text-center">
                    우울, 의욕저하, 불안, 죄책감, 자살충동 등 여러가지 정서적 스트레스 상태를 파악
                  </TableCell>
                  <TableCell className="h-[70px] w-12 text-center">90분</TableCell>
                  <TableCell className="h-[70px] w-12" />
                </TableRow>
                <TableRow className="hover:cursor-pointer hover:bg-[#eeeeee]">
                  <TableCell className="h-[70px] w-24 text-center">SCT 문장완성검사</TableCell>
                  <TableCell className="h-[70px] w-48 text-center">
                    자신뿐 아니라 타인, 가족, 세계에 대한 가치관 탐색
                  </TableCell>
                  <TableCell className="h-[70px] w-12 text-center">20분</TableCell>
                  <TableCell className="h-[70px] w-12" />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="mb-20">
          <div className="mb-8">
            <span className="text-xl font-bold">성격</span>
          </div>
          <TableContainer className="min-h-[85%]">
            <Table stickyHeader className="">
              <TableHead className="sticky">
                <TableRow>
                  <TableCell className="w-24 text-center">검사 종류</TableCell>
                  <TableCell className="W-48 text-center">내용</TableCell>
                  <TableCell className="w-12 text-center">소요시간</TableCell>
                  <TableCell className="w-12 text-center">비용</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="">
                <TableRow className="hover:cursor-pointer hover:bg-[#eeeeee]">
                  <TableCell className="h-[70px] w-24 text-center">MBTI 성격유형검사</TableCell>
                  <TableCell className="h-[70px]  w-48 text-center">
                    자신의 타고난 또는 익숙한 심리적 경향성을 살펴보고 자신과 타인에 대한 이해를
                    도움
                  </TableCell>
                  <TableCell className="h-[70px] w-12 text-center">30분</TableCell>
                  <TableCell className="h-[70px] w-12" />
                </TableRow>
                <TableRow className="hover:cursor-pointer hover:bg-[#eeeeee]">
                  <TableCell className="h-[70px] w-24 text-center">TCI 기질 및 성격검사</TableCell>
                  <TableCell className="h-[70px] w-48 text-center">
                    개인의 사고방식, 감정양식, 행동패턴, 대인관계 양상, 선호 경향 등을 폭 넓고
                    정교하게 이해를 도움
                  </TableCell>
                  <TableCell className="h-[70px] w-12 text-center">30분</TableCell>
                  <TableCell className="h-[70px] w-12" />
                </TableRow>
                <TableRow className="hover:cursor-pointer hover:bg-[#eeeeee]">
                  <TableCell className="h-[70px] w-24 text-center">대인관계 문제검사</TableCell>
                  <TableCell className="h-[70px] w-48 text-center">
                    일상에서 경험하는 여러 가지 대인관계 문제를 종합적으로 평가
                  </TableCell>
                  <TableCell className="h-[70px] w-12 text-center">30분</TableCell>
                  <TableCell className="h-[70px] w-12" />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div>
          <div className="mb-8">
            <span className="text-xl font-bold">진로</span>
          </div>
          <TableContainer className="min-h-[85%]">
            <Table stickyHeader className="">
              <TableHead className="sticky">
                <TableRow>
                  <TableCell className="w-24 text-center">검사 종류</TableCell>
                  <TableCell className="W-48 text-center">내용</TableCell>
                  <TableCell className="w-12 text-center">소요시간</TableCell>
                  <TableCell className="w-12 text-center">비용</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="">
                <TableRow className="hover:cursor-pointer hover:bg-[#eeeeee]">
                  <TableCell className="h-[70px] w-24 text-center">Holland 진로탐색검사</TableCell>
                  <TableCell className="h-[70px] w-48 text-center">
                    진로성숙도, 진로 흥미, 성격 등을 객관적으로 평가
                  </TableCell>
                  <TableCell className="h-[70px] w-12 text-center">30분</TableCell>
                  <TableCell className="h-[70px] w-12" />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </span>
    </div>
  );
};

export default CounselTest;

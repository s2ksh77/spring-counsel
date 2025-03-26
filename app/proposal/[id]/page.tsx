import { fetchAPI } from '@libs/client/fetcher';
import ProposalDetailClient from './ProposalDetail.client';
import { Reservation, ReservationFile } from '@prisma/client';

async function getProposalDetail(id: string) {
  const proposal = await fetchAPI<Reservation & { files: ReservationFile[] }>(
    `/api/proposal/${id}`,
  );
  return proposal;
}

const ProposalDetail = async ({ params }: { params: { id: string } }) => {
  const data = await getProposalDetail(params.id);

  return <ProposalDetailClient id={params.id} data={data} />;
};

export default ProposalDetail;

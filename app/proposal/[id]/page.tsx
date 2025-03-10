import { fetchAPI } from '@libs/client/fetcher';
import ProposalDetailClient from './ProposalDetail.client';

async function getProposalDetail(id: string) {
  const proposal = await fetchAPI(`/api/proposal/${id}`);
  return proposal;
}

const ProposalDetail = async ({ params }: { params: { id: string } }) => {
  const data = await getProposalDetail(params.id);

  return <ProposalDetailClient id={params.id} data={data} />;
};

export default ProposalDetail;

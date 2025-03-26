export const dynamic = 'force-dynamic';
import { fetchAPI } from '@libs/client/fetcher';
import ProposalListClient from './ProposalList.client';
import { Reservation } from '@prisma/client';

async function getProposalList() {
  const proposalList = await fetchAPI<Reservation[]>(`/api/proposal`);
  return proposalList;
}

const ProposalList = async () => {
  const data = await getProposalList();

  return <ProposalListClient data={data} />;
};

export default ProposalList;

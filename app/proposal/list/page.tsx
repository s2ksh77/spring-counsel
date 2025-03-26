import { fetchAPI } from '@libs/client/fetcher';
import ProposalListClient from './ProposalList.client';

async function getProposalList(id: string) {
  const proposalList = await fetchAPI(`/api/proposal`);
  return proposalList;
}

const ProposalList = async () => {
  const data = await getProposalList();

  return <ProposalListClient data={data} />;
};

export default ProposalList;

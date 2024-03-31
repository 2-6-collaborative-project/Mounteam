'use client';

import { useQuery } from '@tanstack/react-query';
import TeamList from '@/src/components/explores/TeamList';
import getMountainData from '@/src/components/explores/api/getMountainData';

export default function MountainTeamListPage({
  params,
}: {
  params: { exploreId: number };
}) {
  const exploreId = params.exploreId;
  const { data: mountainList } = useQuery({
    queryKey: ['mountainList1'],
    queryFn: () => getMountainData(),
  });

  return <TeamList exploreId={exploreId} list={mountainList} />;
}

'use client';

import MountainDetail from '@/src/components/explores/MountainDetail';
import getMountainData from '@/src/components/explores/api/getMountainData';
import { useQuery } from '@tanstack/react-query';

export default function MountainDetailPage({
  params,
}: {
  params: { exploreId: number };
}) {
  const exploreId = params.exploreId;
  const { data: mountainList } = useQuery({
    queryKey: ['mountainList1'],
    queryFn: () => getMountainData(),
  });

  return <MountainDetail exploreId={exploreId} list={mountainList} />;
}

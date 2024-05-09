import { useParams, useSearchParams } from 'next/navigation';

interface UseFeedParamsProps {
  feedType: string | null;
  feedId: number;
}

export default function useFeedParams(): UseFeedParamsProps {
  const routerParams = useParams();
  const searchParams = useSearchParams();

  const feedId = Array.isArray(routerParams.feedId)
    ? Number(routerParams.feedId[0])
    : Number(routerParams.feedId);

  const feedType = searchParams.get('feedType');

  return { feedId, feedType };
}

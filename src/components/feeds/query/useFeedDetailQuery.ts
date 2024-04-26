import { useQuery } from '@tanstack/react-query';
import { getFeedSelect } from '@/src/components/feeds/api/FeedData';

export const useFeedDetailQuery = (feedType: string | null, feedId: number) =>
  useQuery({
    queryKey: ['feed', 'detail', feedType, feedId],
    queryFn: () => getFeedSelect(feedType, feedId),
    enabled: !!feedType && !!feedId,
  });

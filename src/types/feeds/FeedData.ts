import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default interface FeedData {
  author: {
    authorId: number;
    level: number | null;
    nickname: string;
    profileImageUrl: string[] | null;
  };
  comments: string[] | [];
  commentCnt: number;
  createdAt: string;
  createByMe: boolean;
  feedId: number;
  isLiked: boolean;
  likesCount: number;
  mainText: string;
  tags: string[];
  imageUrls: `https://${string}`[];
  isSaved: boolean | undefined;
}

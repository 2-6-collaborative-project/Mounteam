import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// export default interface FeedData {
//   author: {
//     authorId: number;
//     level: number | null;
//     nickname: string;
//     profileImageUrl: string[] | null;
//   };
//   comments: string[] | [];
//   commentCnt: number;
//   createdAt: string;
//   createByMe: boolean;
//   feedId: number;
//   isLiked: boolean;
//   likesCount: number;
//   mainText: string;
//   tags: string[];
//   imageUrls: `https://${string}`[];
//   isSaved: boolean | undefined;
// }

export interface Author {
  profileImageUrl: string | null;
  nickname: string;
  authorId: number;
  level: number;
  authorGender: string | null;
  authorAgeRange: string;
  areaInterest: string;
}

export default interface FeedData {
  author: Author;
  reviewId: number;
  tags: string[];
  mainText: string;
  createdAt: string;
  imageUrls: `https://${string}`[];
  departureDay: string | null;
  mountain: string;
  createByMe: boolean;
  likeCnt: number;
  commentCnt: number;
  liked: boolean;
  isSaved?: boolean;
}

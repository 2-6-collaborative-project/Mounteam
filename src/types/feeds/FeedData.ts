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
  createdByMe: boolean;
  feedId: number;
  isLiked: boolean;
  likesCount: number;
  mainText: string;
  tags: string[];
  imageUrl: string[];
  isSaved: boolean | undefined;
}

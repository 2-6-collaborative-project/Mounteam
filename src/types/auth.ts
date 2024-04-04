export interface LoggedInUser {
  gender: 'male' | 'female' | 'all';
  ageRange:
    | 'teenager'
    | 'twenties'
    | 'thirties'
    | 'fourties'
    | 'fifties'
    | 'sixties';
  areaInterest: string;
  badges: [];
  introduction: string;
  nickname: string;
  profileImage: string;
  userLevel: number;
}

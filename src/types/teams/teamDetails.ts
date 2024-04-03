export default interface TeamDetails {
  teamId: number;
  mountain: string;
  // isCourseSelectNow: boolean | null;
  // course: string;
  title: string;
  content: string;
  departureDay: string;
  gender: 'male' | 'female' | 'all';
  ageRange: (
    | 'teenager'
    | 'twenties'
    | 'thirties'
    | 'fourties'
    | 'fifties'
    | 'sixties'
  )[];
  chatLink: string;
  chatPassword: string;
  author: {
    authorId: number;
    nickname: string;
    profileImageUrl: string | null;
    level: string | null;
  };
}

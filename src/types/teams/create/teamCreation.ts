export default interface TeamCreationForm {
  exploreId: string;
  // isCourseSelectNow: boolean | null;
  // course: string;
  title: string;
  description: string;
  departureDay: string;
  genderRange: 'male' | 'female' | 'all' | '';
  ageRange: (
    | 'teenager'
    | 'twenties'
    | 'thirties'
    | 'fourties'
    | 'fifties'
    | 'sixties'
    | ''
  )[];
  kakaoLink: string;
  kakaoPassword: string;
}

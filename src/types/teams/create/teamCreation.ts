export default interface TeamCreationForm {
  exploreId: string;
  isCourseSelected: boolean | null;
  course: string;
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
  kakaoPasword: string;
}

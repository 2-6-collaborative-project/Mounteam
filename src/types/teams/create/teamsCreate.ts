export default interface TeamCreationForm {
  exploreId: string;
  isCourseSelected: boolean;
  course: string;
  title: string;
  description: string;
  departureDay: string;
  ageRange: 'male' | 'female' | '';
  genderRange:
    | 'teenager'
    | 'twenties'
    | 'thirties'
    | 'fourties'
    | 'fifties'
    | 'sixties'
    | '';
  kakaoLink: string;
  kakaoPasword: string;
}

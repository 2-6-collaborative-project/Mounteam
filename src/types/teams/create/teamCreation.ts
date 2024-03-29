export default interface TeamCreationForm {
  mountain: string;
  // isCourseSelectNow: boolean | null;
  // course: string;
  title: string;
  content: string;
  departureDay: string;
  gender: 'male' | 'female' | 'all' | '';
  ageRange: (
    | 'teenager'
    | 'twenties'
    | 'thirties'
    | 'fourties'
    | 'fifties'
    | 'sixties'
    | ''
  )[];
  chatLink: string;
  chatPassword: string;
}

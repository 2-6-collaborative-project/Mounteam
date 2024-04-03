import TeamCreationForm from '@/src/types/teams/create/teamCreation';

export default function teamCreationFormValidation(formData: TeamCreationForm) {
  for (const [key, value] of Object.entries(formData)) {
    if (
      value === '' ||
      value.length === 0 ||
      value === undefined ||
      value === null
    ) {
      return false;
    }

    if (key === 'title' && value.length < 5) {
      return false;
    }
    if (key === 'description' && value.length < 10) {
      return false;
    }
  }

  return true;
}

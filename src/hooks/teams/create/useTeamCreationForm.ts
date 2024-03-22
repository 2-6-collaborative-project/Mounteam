import { useCallback, useState } from 'react';
import TeamCreationForm from '@/src/types/teams/create/teamsCreate';

export default function useTeamCreationForm() {
  const [teamCreationFormData, setTeamCreationFormData] =
    useState<TeamCreationForm>({
      exploreId: '',
      isCourseSelected: null,
      course: '',
      title: '',
      description: '',
      departureDay: '',
      ageRange: '',
      genderRange: '',
      kakaoLink: '',
      kakaoPasword: '',
    });

  const handleTeamCreationForm = useCallback(
    (key: keyof TeamCreationForm, value: string | boolean) => {
      setTeamCreationFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return { teamCreationFormData, handleTeamCreationForm };
}
import { useCallback, useState } from 'react';
import TeamCreationForm from '@/src/types/teams/create/teamCreation';

export default function useTeamCreationForm() {
  const [teamCreationFormData, setTeamCreationFormData] =
    useState<TeamCreationForm>({
      exploreId: '',
      // isCourseSelectNow: null,
      // course: '',
      title: '',
      description: '',
      departureDay: '',
      ageRange: [],
      genderRange: '',
      kakaoLink: '',
      kakaoPassword: '',
    });

  const handleTeamCreationForm = useCallback(
    (key: keyof TeamCreationForm, value: string | string[] | boolean) => {
      setTeamCreationFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return { teamCreationFormData, handleTeamCreationForm };
}

import { useCallback, useState } from 'react';
import TeamCreationForm from '@/src/types/teams/create/teamCreation';

export default function useTeamCreationForm() {
  const [teamCreationFormData, setTeamCreationFormData] =
    useState<TeamCreationForm>({
      mountain: '',
      // isCourseSelectNow: null,
      // course: '',
      title: '',
      content: '',
      departureDay: '',
      ageRange: [],
      gender: '',
      chatLink: '',
      chatPassword: '',
    });

  const handleTeamCreationForm = useCallback(
    (key: keyof TeamCreationForm, value: string | string[] | boolean) => {
      setTeamCreationFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return { teamCreationFormData, handleTeamCreationForm };
}

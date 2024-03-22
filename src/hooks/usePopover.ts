import { useState } from 'react';

// 팝오버 토글 상태를 관리하는 커스텀 훅
export const usePopoverToggle = (
  initialState: boolean,
): [boolean, () => void, () => void, () => void] => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(initialState);

  // 팝오버를 열기 위한 함수
  const openPopover = () => {
    setIsPopoverOpen(true);
  };

  // 팝오버를 닫기 위한 함수
  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  // 팝오버를 토글하는 함수
  const togglePopover = () => {
    setIsPopoverOpen((prevState) => !prevState);
  };

  return [isPopoverOpen, openPopover, closePopover, togglePopover];
};

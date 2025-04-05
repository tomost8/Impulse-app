import React from 'react';
import InfoPopup from './InfoPopup';

interface Info1Props {
  visible: boolean;
  onClose: () => void;
}

const Info1: React.FC<Info1Props> = ({ visible, onClose }) => {
  return (
    <InfoPopup
      visible={visible}
      onClose={onClose}
      title="Scheduling Reminder"
      message="A daily reminder from Impulse to fill out your goals for the day to stay on track. The message changes everyday!"
    />
  );
};

export default Info1;

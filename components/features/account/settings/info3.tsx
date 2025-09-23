import React from 'react';
import InfoPopup from './InfoPopup';

interface Info3Props {
  visible: boolean;
  onClose: () => void;
}

const Info3 = ({ visible, onClose }: Info3Props) => {
  return (
    <InfoPopup
      visible={visible}
      onClose={onClose}
      title="Goal Reminder"
      message="This notification reminds you to complete your daily goal. You can customize when it will be sent."
    />
  );
};

export default Info3;

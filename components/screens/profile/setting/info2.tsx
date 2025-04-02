import React from 'react';
import InfoPopup from './InfoPopup';

interface Info2Props {
  visible: boolean;
  onClose: () => void;
}

const Info2 = ({ visible, onClose }: Info2Props) => {
  return (
    <InfoPopup
      visible={visible}
      onClose={onClose}
      title="Midday Motivation"
      message="This notification serves as a reminder to complete your daily scheduled goals. The message changes everyday!"
    />
  );
};

export default Info2;

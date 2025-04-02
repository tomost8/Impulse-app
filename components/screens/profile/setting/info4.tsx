import React from 'react';
import InfoPopup from './InfoPopup';

interface Info4Props {
  visible: boolean;
  onClose: () => void;
}

const Info4 = ({ visible, onClose }: Info4Props) => {
  return (
    <InfoPopup
      visible={visible}
      onClose={onClose}
      title="Nudge Message"
      message="This is your custom notification to send to your friends as extra motivation."
    />
  );
};

export default Info4;




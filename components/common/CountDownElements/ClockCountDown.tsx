import React from 'react';
import Countdown from 'react-countdown';

export interface ClockCountDownProps {
  timmer: any;
  expElement?: any;
}

const ClockCountDown: React.FC<ClockCountDownProps> = ({ expElement, timmer = Date.now() + 5000 }) => {
  const renderer = (p: any) => {
    const { hours, minutes, seconds, completed } = p;
    if (completed) {
      // Render a complete state
      return expElement || null;
    }
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  return <Countdown date={timmer} renderer={renderer} />;
};

export default ClockCountDown;

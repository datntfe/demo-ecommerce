import Countdown from 'react-countdown';
import React from 'react';

/** Finish display */
const Completionist = () => <span>Ready!</span>;

/** Customer render method for react-countdown */
const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  const newDays = days.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const newHours = hours.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const newMinutes = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const newSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  if (completed) {
    // Render a completed state
    return <Completionist />;
  }
  // Render a countdown
  return (
    <span className="time">
      {newDays} <p className="time-text"> days </p> {newHours} : {newMinutes} :{' '}
      {newSeconds}
    </span>
  );
};

// let TimeLeft = new Date(new Date('2022-06-27 17:30:00') - new Date());
const milestone = 1672567200000;
export const ComingSoon = () => (
  <div className="wrap-coming-soon">
    <section className="mainContainer ">
      <p className="title">Shopdi Launching</p>
      <div>
        <Countdown date={milestone} renderer={renderer} />
      </div>
      <h2>June 27, 2022 - 5:30 PM</h2>
    </section>
  </div>
);
